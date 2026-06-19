import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore';
import authService from '../services/auth.service';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated, user, fetchUserProfile } = useAuthStore();

  // Query hook to fetch and keep user profile in sync
  const useProfile = () => {
    return useQuery({
      queryKey: ['userProfile'],
      queryFn: async () => {
        const response = await authService.getProfile();
        return response.data.user;
      },
      enabled: isAuthenticated,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Mutation hook to update user profile details & avatar
  const useUpdateProfileMutation = () => {
    return useMutation({
      mutationFn: async (formData: FormData) => {
        const response = await authService.updateProfile(formData);
        return response.data.user;
      },
      onSuccess: (updatedUser) => {
        // Sync profile to Zustand store
        useAuthStore.setState({ user: updatedUser });
        localStorage.setItem('cm_user', JSON.stringify(updatedUser));
        
        // Invalidate profile query in cache
        queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      },
    });
  };

  return {
    user,
    isAuthenticated,
    useProfile,
    useUpdateProfileMutation,
    fetchUserProfile,
  };
};

export default useAuth;
