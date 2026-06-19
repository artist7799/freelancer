import apiClient from '../api/axios';

export const compareService = {
  async getComparedColleges() {
    const response = await apiClient.get('/compare');
    return response.data;
  },

  async addToCompare(collegeId: string) {
    const response = await apiClient.post('/compare', { collegeId });
    return response.data;
  },

  async removeFromCompare(collegeId: string) {
    const response = await apiClient.delete(`/compare/${collegeId}`);
    return response.data;
  },
};

export default compareService;
