import apiClient from '../api/axios';

export const applicationService = {
  async submitApplication(collegeId: string, courseId: string) {
    const response = await apiClient.post('/applications', { collegeId, courseId });
    return response.data;
  },

  async getMyApplications() {
    const response = await apiClient.get('/applications/my');
    return response.data;
  },

  async getAllApplications() {
    const response = await apiClient.get('/applications');
    return response.data;
  },

  async updateStatus(id: string, status: string) {
    const response = await apiClient.patch(`/applications/${id}/status`, { status });
    return response.data;
  },

  async getAdminStats() {
    const response = await apiClient.get('/dashboard/admin-stats');
    return response.data;
  },
};

export default applicationService;
