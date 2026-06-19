import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Handle Mongoose Duplicate Key Error (e.g. email already exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate value for field: ${field}. Please use another value.`;
    err = new AppError(message, 400);
  }

  // Handle Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    const message = `Validation Failed: ${errors.join('. ')}`;
    err = new AppError(message, 400);
  }

  // Handle Mongoose Cast Errors (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    const message = `Invalid format for field: ${err.path} (${err.value}).`;
    err = new AppError(message, 400);
  }

  // Handle JWT Validation Errors
  if (err.name === 'JsonWebTokenError') {
    err = new AppError('Invalid token. Please log in again.', 401);
  }
  if (err.name === 'TokenExpiredError') {
    err = new AppError('Token has expired. Please log in again.', 401);
  }

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else {
    // Production Mode: Do not leak stack trace
    res.status(err.statusCode).json({
      status: err.status,
      message: err.isOperational ? err.message : 'Something went wrong on our end.',
    });
  }
};
