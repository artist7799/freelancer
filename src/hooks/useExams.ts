import { useQuery } from '@tanstack/react-query';
import examService from '../services/exam.service';

export const useExams = () => {
  const useExamsQuery = (params: any = {}) => {
    return useQuery({
      queryKey: ['exams', params],
      queryFn: async () => {
        const response = await examService.getAllExams(params);
        return response.data.exams;
      },
      staleTime: 5 * 60 * 1000,
    });
  };

  const useExamQuery = (idOrSlug: string) => {
    return useQuery({
      queryKey: ['exam', idOrSlug],
      queryFn: async () => {
        const response = await examService.getExam(idOrSlug);
        return response.data.exam;
      },
      enabled: !!idOrSlug,
      staleTime: 10 * 60 * 1000,
    });
  };

  return {
    useExamsQuery,
    useExamQuery,
  };
};

export default useExams;
