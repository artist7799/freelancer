import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import collegeService from '../services/college.service';

export const useColleges = () => {
  const queryClient = useQueryClient();

  const useCollegesQuery = (params: any = {}) => {
    return useQuery({
      queryKey: ['colleges', params],
      queryFn: async () => {
        const response = await collegeService.getAllColleges(params);
        return response; // Return the server response body directly: { status, data: { colleges: [] }, total, ... }
      },
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  const useCollegeQuery = (idOrSlug: string) => {
    return useQuery({
      queryKey: ['college', idOrSlug],
      queryFn: async () => {
        const response = await collegeService.getCollege(idOrSlug);
        return response.data.college;
      },
      enabled: !!idOrSlug,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useCreateCollegeMutation = () => {
    return useMutation({
      mutationFn: collegeService.createCollege,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['colleges'] });
      },
    });
  };

  const useUpdateCollegeMutation = () => {
    return useMutation({
      mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
        collegeService.updateCollege(id, formData),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['colleges'] });
        queryClient.invalidateQueries({ queryKey: ['college', variables.id] });
      },
    });
  };

  const useDeleteCollegeMutation = () => {
    return useMutation({
      mutationFn: collegeService.deleteCollege,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['colleges'] });
      },
    });
  };

  return {
    useCollegesQuery,
    useCollegeQuery,
    useCreateCollegeMutation,
    useUpdateCollegeMutation,
    useDeleteCollegeMutation,
  };
};

export default useColleges;
