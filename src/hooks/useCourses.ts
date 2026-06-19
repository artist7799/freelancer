import { useQuery } from '@tanstack/react-query';
import courseService from '../services/course.service';

export const useCourses = () => {
  const useCoursesQuery = (params: any = {}) => {
    return useQuery({
      queryKey: ['courses', params],
      queryFn: async () => {
        const response = await courseService.getAllCourses(params);
        return response.data.courses;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useCourseQuery = (id: string) => {
    return useQuery({
      queryKey: ['course', id],
      queryFn: async () => {
        const response = await courseService.getCourse(id);
        return response.data.course;
      },
      enabled: !!id,
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  return {
    useCoursesQuery,
    useCourseQuery,
  };
};

export default useCourses;
