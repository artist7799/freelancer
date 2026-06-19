import apiClient from '../api/axios';

export const blogService = {
  async getAllBlogs(params: any = {}) {
    const response = await apiClient.get('/blogs', { params });
    return response.data;
  },

  async getBlog(idOrSlug: string) {
    const response = await apiClient.get(`/blogs/${idOrSlug}`);
    return response.data;
  },
};

export default blogService;
