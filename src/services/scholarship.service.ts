import apiClient from '../api/axios';

export const scholarshipService = {
  async getAllScholarships(params: any = {}) {
    const response = await apiClient.get('/scholarships', { params });
    return response.data;
  },

  async getScholarship(idOrSlug: string) {
    const response = await apiClient.get(`/scholarships/${idOrSlug}`);
    return response.data;
  },
};

export default scholarshipService;
