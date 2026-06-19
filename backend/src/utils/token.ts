import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'mock_default_super_secret_access_key_12345';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'mock_default_super_secret_refresh_key_12345';
const ACCESS_EXPIRY = (process.env.JWT_ACCESS_EXPIRY || '15m') as any;
const REFRESH_EXPIRY = (process.env.JWT_REFRESH_EXPIRY || '7d') as any;

export interface TokenPayload {
  id: string;
  role: 'student' | 'admin';
}

export const generateAccessToken = (userId: string, role: 'student' | 'admin'): string => {
  return jwt.sign({ id: userId, role }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRY });
};

export const generateRefreshToken = (userId: string, role: 'student' | 'admin'): string => {
  return jwt.sign({ id: userId, role }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
};
