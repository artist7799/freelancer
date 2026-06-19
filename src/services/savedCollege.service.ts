import apiClient from '../api/axios';

export const savedCollegeService = {
  async getSavedColleges() {
    const response = await apiClient.get('/saved');
    return response.data;
  },

  async saveCollege(collegeId: string) {
    const response = await apiClient.post('/saved', { collegeId });
    return response.data;
  },

  async unsaveCollege(collegeId: string) {
    const response = await apiClient.delete(`/saved/${collegeId}`);
    return response.data;
  },
};

export default savedCollegeService;
