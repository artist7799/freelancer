import apiClient from '../api/axios';

export const examService = {
  async getAllExams(params: any = {}) {
    const response = await apiClient.get('/exams', { params });
    return response.data;
  },

  async getExam(idOrSlug: string) {
    const response = await apiClient.get(`/exams/${idOrSlug}`);
    return response.data;
  },
};

export default examService;
