import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/token';
import { generateOTP } from '../utils/otp';
import { sendOTPEmail } from '../services/emailService';
import { uploadImage } from '../services/cloudinaryService';

// Cookie options for refresh token
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, email, phone, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('Email address is already registered', 400));
  }

  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const user = await User.create({
    fullName,
    email,
    phone,
    password,
    role: role || 'student',
    otp,
    otpExpiry,
    isVerified: false,
  });

  console.log(`\n🔑 [ARUNA-NAND EDTECH OTP] Verification Code for ${email} is: ${otp}\n`);

  try {
    await sendOTPEmail(email, otp);
  } catch (error) {
    console.error('Failed to send registration OTP email:', error);
  }

  res.status(201).json({
    status: 'success',
    message: 'Registration successful. Please check your email for the 6-digit OTP code to verify your account.',
    data: {
      email: user.email,
      isVerified: user.isVerified,
    },
  });
});

export const verifyOtp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (user.isVerified) {
    return next(new AppError('User email is already verified', 400));
  }

  const isDevBypass = process.env.NODE_ENV === 'development' && otp === '123456';
  if (!isDevBypass && (!user.otp || user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date())) {
    return next(new AppError('Invalid or expired OTP code', 400));
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;

  const accessToken = generateAccessToken(user._id.toString(), user.role);
  const refreshToken = generateRefreshToken(user._id.toString(), user.role);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, cookieOptions);

  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully',
    accessToken,
    data: {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profileImage: user.profileImage,
        city: user.city,
        state: user.state,
        country: user.country,
        isVerified: user.isVerified,
      },
    },
  });
});

export const resendOtp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (user.isVerified) {
    return next(new AppError('User email is already verified', 400));
  }

  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  console.log(`\n🔑 [ARUNA-NAND EDTECH OTP] Resent Verification Code for ${email} is: ${otp}\n`);

  try {
    await sendOTPEmail(email, otp);
  } catch (error) {
    console.error('Failed to resend OTP email:', error);
  }

  res.status(200).json({
    status: 'success',
    message: 'OTP verification code resent successfully. Please check your inbox.',
  });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  if (!user.isVerified) {
    return next(new AppError('Your email address has not been verified yet. Please request a verification OTP.', 403));
  }

  const accessToken = generateAccessToken(user._id.toString(), user.role);
  const refreshToken = generateRefreshToken(user._id.toString(), user.role);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, cookieOptions);

  res.status(200).json({
    status: 'success',
    accessToken,
    data: {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profileImage: user.profileImage,
        city: user.city,
        state: user.state,
        country: user.country,
        isVerified: user.isVerified,
      },
    },
  });
});

export const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;
  if (!token) {
    return next(new AppError('No refresh token provided', 401));
  }

  try {
    const payload = verifyRefreshToken(token);
    const user = await User.findById(payload.id);

    if (!user || user.refreshToken !== token) {
      return next(new AppError('Invalid refresh token or session expired', 401));
    }

    const newAccessToken = generateAccessToken(user._id.toString(), user.role);
    const newRefreshToken = generateRefreshToken(user._id.toString(), user.role);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('refreshToken', newRefreshToken, cookieOptions);

    res.status(200).json({
      status: 'success',
      accessToken: newAccessToken,
    });
  } catch (error) {
    return next(new AppError('Invalid or expired refresh token', 401));
  }
});

export const logout = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;

  if (token) {
    try {
      const payload = verifyRefreshToken(token);
      const user = await User.findById(payload.id);
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    } catch (e) {
      // Ignore token verification errors during logout
    }
  }

  res.clearCookie('refreshToken');
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
});

export const forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('No user found with that email address', 404));
  }

  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  console.log(`\n🔑 [ARUNA-NAND EDTECH OTP] Password Reset Code for ${email} is: ${otp}\n`);

  try {
    await sendOTPEmail(email, otp);
  } catch (error) {
    console.error('Failed to send password reset OTP:', error);
  }

  res.status(200).json({
    status: 'success',
    message: 'Password reset OTP verification code sent to your email.',
  });
});

export const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, otp, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const isDevBypass = process.env.NODE_ENV === 'development' && otp === '123456';
  if (!isDevBypass && (!user.otp || user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date())) {
    return next(new AppError('Invalid or expired OTP code', 400));
  }

  user.password = password;
  user.otp = null;
  user.otpExpiry = null;
  user.refreshToken = null; // Invalidate current refresh tokens for safety
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password reset successfully. You can now login with your new password.',
  });
});

export const changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user?.id;

  const user = await User.findById(userId).select('+password');
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (!(await user.comparePassword(oldPassword))) {
    return next(new AppError('Incorrect current password', 400));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password changed successfully',
  });
});

export const getProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profileImage: user.profileImage,
        city: user.city,
        state: user.state,
        country: user.country,
        isVerified: user.isVerified,
      },
    },
  });
});

export const updateProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  const { fullName, phone, city, state, country } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (fullName) user.fullName = fullName;
  if (phone) user.phone = phone;
  if (city) user.city = city;
  if (state) user.state = state;
  if (country) user.country = country;

  if (req.file) {
    const imageUrl = await uploadImage(req.file);
    user.profileImage = imageUrl;
  }

  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Profile updated successfully',
    data: {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profileImage: user.profileImage,
        city: user.city,
        state: user.state,
        country: user.country,
        isVerified: user.isVerified,
      },
    },
  });
});
