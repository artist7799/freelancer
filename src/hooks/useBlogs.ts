import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blog.service';

export const useBlogs = () => {
  const useBlogsQuery = (params: any = {}) => {
    return useQuery({
      queryKey: ['blogs', params],
      queryFn: async () => {
        const response = await blogService.getAllBlogs(params);
        return response.data.blogs;
      },
      staleTime: 5 * 60 * 1000,
    });
  };

  const useBlogQuery = (idOrSlug: string) => {
    return useQuery({
      queryKey: ['blog', idOrSlug],
      queryFn: async () => {
        const response = await blogService.getBlog(idOrSlug);
        return response.data.blog;
      },
      enabled: !!idOrSlug,
      staleTime: 10 * 60 * 1000,
    });
  };

  return {
    useBlogsQuery,
    useBlogQuery,
  };
};

export default useBlogs;
