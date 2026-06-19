import { create } from 'zustand';
import { useGlobalStore } from './useGlobalStore';
import { useAuthStore } from './useAuthStore';
import { savedCollegeService } from '../services/savedCollege.service';

interface SavedCollegesState {
  savedIds: string[];
  fetchSavedColleges: () => Promise<void>;
  saveCollege: (id: string) => Promise<void>;
  unsaveCollege: (id: string) => Promise<void>;
  isSaved: (id: string) => boolean;
}

export const useSavedCollegesStore = create<SavedCollegesState>((set, get) => {
  return {
    savedIds: [],

    fetchSavedColleges: async () => {
      const isAuthenticated = useAuthStore.getState().isAuthenticated;
      if (!isAuthenticated) return;

      try {
        const response = await savedCollegeService.getSavedColleges();
        const savedColleges = response.data.colleges || [];
        const ids = savedColleges.map((col: any) => col.id);
        set({ savedIds: ids });
      } catch (error) {
        console.error('Failed to fetch saved colleges:', error);
      }
    },

    saveCollege: async (id) => {
      const { savedIds } = get();
      const addToast = useGlobalStore.getState().addToast;
      const isAuthenticated = useAuthStore.getState().isAuthenticated;

      if (!isAuthenticated) {
        addToast('Please login to save colleges to your shortlist.', 'warning');
        return;
      }

      if (savedIds.includes(id)) return;

      // Optimistic update
      const nextSaved = [...savedIds, id];
      set({ savedIds: nextSaved });

      try {
        await savedCollegeService.saveCollege(id);
        addToast('College added to your saved list!', 'success');
      } catch (error) {
        console.error('Failed to save college:', error);
        // Rollback
        set({ savedIds: savedIds });
        addToast('Failed to save college to shortlist.', 'error');
      }
    },

    unsaveCollege: async (id) => {
      const { savedIds } = get();
      const addToast = useGlobalStore.getState().addToast;
      const isAuthenticated = useAuthStore.getState().isAuthenticated;

      if (!isAuthenticated) return;

      // Optimistic update
      const nextSaved = savedIds.filter((sid) => sid !== id);
      set({ savedIds: nextSaved });

      try {
        await savedCollegeService.unsaveCollege(id);
        addToast('College removed from your saved list.', 'info');
      } catch (error) {
        console.error('Failed to unsave college:', error);
        // Rollback
        set({ savedIds: savedIds });
        addToast('Failed to remove college from shortlist.', 'error');
      }
    },

    isSaved: (id) => {
      return get().savedIds.includes(id);
    },
  };
});
