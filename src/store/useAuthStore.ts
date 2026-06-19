import { create } from 'zustand';
import { useGlobalStore } from './useGlobalStore';
import { authService } from '../services/auth.service';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'student' | 'admin';
  profileImage: string;
  city: string;
  state: string;
  country: string;
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isVerifyingOtp: boolean;
  tempRegData: { name: string; email: string; phone: string; password?: string } | null;
  setAccessToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  resendOtp: () => Promise<boolean>;
  logout: () => Promise<void>;
  updateUserProfile: (formData: FormData) => Promise<boolean>;
  fetchUserProfile: () => Promise<void>;
}

// Helper to safely fetch initial storage state
const getStoredAuth = () => {
  try {
    const userStr = localStorage.getItem('cm_user');
    const tokenStr = localStorage.getItem('cm_token');
    return {
      user: userStr ? JSON.parse(userStr) : null,
      accessToken: tokenStr || null,
      isAuthenticated: !!tokenStr,
    };
  } catch {
    return { user: null, accessToken: null, isAuthenticated: false };
  }
};

const initialAuth = getStoredAuth();

export const useAuthStore = create<AuthState>((set, get) => ({
  user: initialAuth.user,
  accessToken: initialAuth.accessToken,
  isAuthenticated: initialAuth.isAuthenticated,
  isVerifyingOtp: false,
  tempRegData: null,

  setAccessToken: (token) => {
    if (token) {
      localStorage.setItem('cm_token', token);
      set({ accessToken: token, isAuthenticated: true });
    } else {
      localStorage.removeItem('cm_token');
      set({ accessToken: null, isAuthenticated: false });
    }
  },

  login: async (email, password) => {
    const addToast = useGlobalStore.getState().addToast;
    try {
      const response = await authService.login({ email, password });
      const user = response.data.user;
      const token = response.accessToken;

      localStorage.setItem('cm_user', JSON.stringify(user));
      localStorage.setItem('cm_token', token);

      set({
        user,
        accessToken: token,
        isAuthenticated: true,
        isVerifyingOtp: false,
        tempRegData: null,
      });

      addToast(`Welcome back, ${user.fullName}!`, 'success');
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Invalid email or password';
      
      // If user is unverified, trigger OTP verify state
      if (error.response && error.response.status === 403) {
        set({
          isVerifyingOtp: true,
          tempRegData: { name: '', email, phone: '' },
        });
        // Trigger resend OTP so user gets a fresh code
        try {
          await authService.resendOtp(email);
          addToast('Your account is not verified. Enter the OTP sent to your email.', 'info');
        } catch (resendErr: any) {
          const resendMsg = resendErr.response?.data?.message || '';
          if (resendMsg.toLowerCase().includes('already verified')) {
            // Account IS verified — wrong password
            set({ isVerifyingOtp: false, tempRegData: null });
            addToast('Incorrect password. Please try again.', 'error');
          } else {
            addToast('Your account is not verified. Please request a new OTP.', 'info');
          }
        }
      } else {
        addToast(msg, 'error');
      }
      return false;
    }
  },

  register: async (name, email, phone, password) => {
    const addToast = useGlobalStore.getState().addToast;
    try {
      await authService.register({
        fullName: name,
        email,
        phone,
        password,
      });

      set({
        isVerifyingOtp: true,
        tempRegData: { name, email, phone, password },
      });

      addToast('OTP sent to your registered email address!', 'success');
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Registration failed';
      addToast(msg, 'error');
      return false;
    }
  },

  verifyOtp: async (otp) => {
    const { tempRegData } = get();
    const addToast = useGlobalStore.getState().addToast;

    if (!tempRegData?.email) {
      addToast('Email context missing. Please register again.', 'error');
      return false;
    }

    try {
      const response = await authService.verifyOtp(tempRegData.email, otp);
      const user = response.data.user;
      const token = response.accessToken;

      localStorage.setItem('cm_user', JSON.stringify(user));
      localStorage.setItem('cm_token', token);

      set({
        user,
        accessToken: token,
        isAuthenticated: true,
        isVerifyingOtp: false,
        tempRegData: null,
      });

      addToast('Email verified successfully! Welcome to Aruna-Nand EdTech Services.', 'success');
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Invalid or expired OTP. Please request a new one.';
      addToast(msg, 'error');
      console.error('[verifyOtp error]', error.response?.data);
      return false;
    }
  },

  resendOtp: async () => {
    const { tempRegData } = get();
    const addToast = useGlobalStore.getState().addToast;

    if (!tempRegData?.email) {
      addToast('Email context missing.', 'error');
      return false;
    }

    try {
      await authService.resendOtp(tempRegData.email);
      addToast('A new OTP verification code has been sent.', 'info');
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to resend OTP';
      addToast(msg, 'error');
      return false;
    }
  },

  logout: async () => {
    const addToast = useGlobalStore.getState().addToast;
    try {
      await authService.logout();
    } catch (e) {
      // Ignore errors on logout
    }

    localStorage.removeItem('cm_user');
    localStorage.removeItem('cm_token');

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isVerifyingOtp: false,
      tempRegData: null,
    });

    addToast('Logged out successfully.', 'info');
  },

  updateUserProfile: async (formData) => {
    const addToast = useGlobalStore.getState().addToast;
    try {
      const response = await authService.updateProfile(formData);
      const user = response.data.user;
      
      localStorage.setItem('cm_user', JSON.stringify(user));
      set({ user });
      addToast('Profile updated successfully!', 'success');
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to update profile';
      addToast(msg, 'error');
      return false;
    }
  },

  fetchUserProfile: async () => {
    try {
      const response = await authService.getProfile();
      const user = response.data.user;
      localStorage.setItem('cm_user', JSON.stringify(user));
      set({ user });
    } catch (error) {
      console.error('Failed to sync profile from server:', error);
    }
  },
}));
