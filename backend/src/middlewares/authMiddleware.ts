import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { verifyAccessToken } from '../utils/token';
import { User } from '../models/User';
import { catchAsync } from '../utils/catchAsync';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const protect = catchAsync(async (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  let token: string | undefined;

  // 1. Extract Bearer Token from Authorization Header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in. Please log in to get access.', 401));
  }

  // 2. Verify Token validity
  try {
    const decoded = verifyAccessToken(token);

    // 3. Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    // 4. Attach user to request scope
    req.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError('Invalid token or signature. Please log in again.', 401));
  }
});

export const restrictTo = (...roles: ('student' | 'admin')[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action.', 403));
    }
    next();
  };
};
