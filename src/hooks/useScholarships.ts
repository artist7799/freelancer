import { useQuery } from '@tanstack/react-query';
import scholarshipService from '../services/scholarship.service';

export const useScholarships = () => {
  const useScholarshipsQuery = (params: any = {}) => {
    return useQuery({
      queryKey: ['scholarships', params],
      queryFn: async () => {
        const response = await scholarshipService.getAllScholarships(params);
        return response.data.scholarships;
      },
      staleTime: 5 * 60 * 1000,
    });
  };

  const useScholarshipQuery = (idOrSlug: string) => {
    return useQuery({
      queryKey: ['scholarship', idOrSlug],
      queryFn: async () => {
        const response = await scholarshipService.getScholarship(idOrSlug);
        return response.data.scholarship;
      },
      enabled: !!idOrSlug,
      staleTime: 10 * 60 * 1000,
    });
  };

  return {
    useScholarshipsQuery,
    useScholarshipQuery,
  };
};

export default useScholarships;
