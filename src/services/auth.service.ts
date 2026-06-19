import apiClient from '../api/axios';

export const authService = {
  async register(data: any) {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  async verifyOtp(email: string, otp: string) {
    const response = await apiClient.post('/auth/verify-otp', { email, otp });
    return response.data;
  },

  async resendOtp(email: string) {
    const response = await apiClient.post('/auth/resend-otp', { email });
    return response.data;
  },

  async login(credentials: any) {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  async logout() {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  async forgotPassword(email: string) {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  async resetPassword(data: any) {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  },

  async getProfile() {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  async updateProfile(formData: FormData) {
    const response = await apiClient.patch('/auth/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default authService;
