import apiClient from '../api/axios';

export const collegeService = {
  async getAllColleges(params: any = {}) {
    const response = await apiClient.get('/colleges', { params });
    return response.data;
  },

  async getCollege(idOrSlug: string) {
    const response = await apiClient.get(`/colleges/${idOrSlug}`);
    return response.data;
  },

  async createCollege(formData: FormData) {
    const response = await apiClient.post('/colleges', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updateCollege(id: string, formData: FormData) {
    const response = await apiClient.patch(`/colleges/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteCollege(id: string) {
    const response = await apiClient.delete(`/colleges/${id}`);
    return response.data;
  },
};

export default collegeService;
