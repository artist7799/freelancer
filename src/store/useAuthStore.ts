import { create } from 'zustand';
import { useGlobalStore } from './useGlobalStore';

interface User {
  name: string;
  email: string;
  phone: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isVerifyingOtp: boolean;
  tempRegData: { name: string; email: string; phone: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string) => void;
  verifyOtp: (otp: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isVerifyingOtp: false,
  tempRegData: null,
  login: async (email, password) => {
    const addToast = useGlobalStore.getState().addToast;
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simple mock check
    if (email && password.length >= 6) {
      const mockUser = {
        name: 'Demo Student',
        email: email,
        phone: '+91 98765 43210',
      };
      set({ user: mockUser, isAuthenticated: true });
      addToast(`Welcome back, ${mockUser.name}!`, 'success');
      return true;
    } else {
      addToast('Invalid email or password (min 6 characters)', 'error');
      return false;
    }
  },
  register: (name, email, phone) => {
    const addToast = useGlobalStore.getState().addToast;
    set({
      isVerifyingOtp: true,
      tempRegData: { name, email, phone },
    });
    addToast('OTP sent to your registered mobile and email!', 'info');
  },
  verifyOtp: (otp) => {
    const { tempRegData } = useAuthStore.getState();
    const addToast = useGlobalStore.getState().addToast;

    if (otp === '123456' || otp === '1234') { // Mock OTP check
      if (tempRegData) {
        set({
          user: tempRegData,
          isAuthenticated: true,
          isVerifyingOtp: false,
          tempRegData: null,
        });
        addToast('Verification successful! Welcome to the platform.', 'success');
        return true;
      }
    }
    addToast('Incorrect OTP. Try entering 123456.', 'error');
    return false;
  },
  logout: () => {
    const addToast = useGlobalStore.getState().addToast;
    set({ user: null, isAuthenticated: false });
    addToast('Logged out successfully.', 'info');
  },
}));
