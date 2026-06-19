import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import path from 'path';
import xss from 'xss';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/swagger';

import { AppError } from './utils/appError';
import { globalErrorHandler } from './middlewares/errorMiddleware';

// Route imports
import authRoutes from './routes/authRoutes';
import collegeRoutes from './routes/collegeRoutes';
import courseRoutes from './routes/courseRoutes';
import examRoutes from './routes/examRoutes';
import scholarshipRoutes from './routes/scholarshipRoutes';
import blogRoutes from './routes/blogRoutes';
import applicationRoutes from './routes/applicationRoutes';
import savedCollegeRoutes from './routes/savedCollegeRoutes';
import comparedCollegeRoutes from './routes/comparedCollegeRoutes';
import predictorRoutes from './routes/predictorRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

const app = express();

// 1. Enable Security Headers via Helmet
app.use(helmet());

// 2. Enable CORS with credentials
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5177',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5177',
];
if (process.env.FRONTEND_URL) allowedOrigins.push(process.env.FRONTEND_URL);
if (process.env.CLIENT_URL) allowedOrigins.push(process.env.CLIENT_URL);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 3. Request Logging via Morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// 4. Rate Limiting for IP Protection
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});
app.use('/api', limiter);

// 5. Body Parsers & Cookie Parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// 6. Data Sanitization against NoSQL Query Injection
app.use(mongoSanitize());

// 7. Custom XSS Sanitization Middleware
const sanitizeInput = (data: any): any => {
  if (typeof data === 'string') return xss(data);
  if (Array.isArray(data)) return data.map(sanitizeInput);
  if (typeof data === 'object' && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, val]) => [key, sanitizeInput(val)])
    );
  }
  return data;
};
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (req.body) req.body = sanitizeInput(req.body);
  if (req.query) req.query = sanitizeInput(req.query);
  if (req.params) req.params = sanitizeInput(req.params);
  next();
});

// 8. Serve local uploads fallbacks static directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// 9. API routes
app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/saved', savedCollegeRoutes);
app.use('/api/compare', comparedCollegeRoutes);
app.use('/api/predictor', predictorRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 10. Swagger UI mapping
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 11. Handle undefined API routes
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 12. Mount Global Error handler
app.use(globalErrorHandler);

export default app;
