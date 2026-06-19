import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Aruna-Nand EdTech Services API Documentation',
      version: '1.0.0',
      description: 'Production-ready Express & TypeScript API server for Aruna-Nand EdTech Services - College Admission & Career Guidance Platform.',
      contact: {
        name: 'Aruna-Nand EdTech Services Engineering Team',
        email: 'support@arunanandedtech.org',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT access token to authorize request actions.',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.ts', './src/app.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
