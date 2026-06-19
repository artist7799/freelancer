import apiClient from '../api/axios';

export const courseService = {
  async getAllCourses(params: any = {}) {
    const response = await apiClient.get('/courses', { params });
    return response.data;
  },

  async getCourse(id: string) {
    const response = await apiClient.get(`/courses/${id}`);
    return response.data;
  },
};

export default courseService;
