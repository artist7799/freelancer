import { create } from 'zustand';
import { useGlobalStore } from './useGlobalStore';
import { useAuthStore } from './useAuthStore';
import { compareService } from '../services/compare.service';

interface CompareState {
  compareIds: string[];
  fetchComparedColleges: () => Promise<void>;
  addToCompare: (id: string) => Promise<void>;
  removeFromCompare: (id: string) => Promise<void>;
  clearCompare: () => Promise<void>;
  isComparing: (id: string) => boolean;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  compareIds: [],

  fetchComparedColleges: async () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;

    try {
      const response = await compareService.getComparedColleges();
      const collegesList = response.data.colleges || [];
      const ids = collegesList.map((col: any) => col.id);
      set({ compareIds: ids });
    } catch (error) {
      console.error('Failed to fetch compared colleges:', error);
    }
  },

  addToCompare: async (id) => {
    const { compareIds } = get();
    const addToast = useGlobalStore.getState().addToast;
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (!isAuthenticated) {
      addToast('Please login to compare colleges.', 'warning');
      return;
    }

    if (compareIds.includes(id)) {
      addToast('College already in comparison list', 'warning');
      return;
    }

    if (compareIds.length >= 3) {
      addToast('You can compare a maximum of 3 colleges at a time', 'warning');
      return;
    }

    // Optimistic update
    set({ compareIds: [...compareIds, id] });

    try {
      await compareService.addToCompare(id);
      addToast('College added to comparison list', 'success');
    } catch (error: any) {
      console.error('Failed to add to compare:', error);
      // Rollback
      set({ compareIds });
      const msg = error.response?.data?.message || 'Failed to add to comparison basket';
      addToast(msg, 'error');
    }
  },

  removeFromCompare: async (id) => {
    const { compareIds } = get();
    const addToast = useGlobalStore.getState().addToast;
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (!isAuthenticated) return;

    // Optimistic update
    set({ compareIds: compareIds.filter((cid) => cid !== id) });

    try {
      await compareService.removeFromCompare(id);
      addToast('College removed from comparison list', 'info');
    } catch (error) {
      console.error('Failed to remove from compare:', error);
      // Rollback
      set({ compareIds });
      addToast('Failed to remove from comparison basket', 'error');
    }
  },

  clearCompare: async () => {
    const { compareIds } = get();
    const addToast = useGlobalStore.getState().addToast;
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (!isAuthenticated) return;

    set({ compareIds: [] });

    try {
      // Loop over and remove all from basket
      for (const id of compareIds) {
        await compareService.removeFromCompare(id);
      }
      addToast('Comparison list cleared', 'info');
    } catch (error) {
      console.error('Failed to clear compare:', error);
      addToast('Failed to clear comparison list.', 'error');
    }
  },

  isComparing: (id) => {
    return get().compareIds.includes(id);
  },
}));
