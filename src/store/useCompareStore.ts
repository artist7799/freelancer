import { create } from 'zustand';
import { useGlobalStore } from './useGlobalStore';

interface CompareState {
  compareIds: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isComparing: (id: string) => boolean;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  compareIds: [],
  addToCompare: (id) => {
    const { compareIds } = get();
    const addToast = useGlobalStore.getState().addToast;

    if (compareIds.includes(id)) {
      addToast('College already in comparison list', 'warning');
      return;
    }

    if (compareIds.length >= 3) {
      addToast('You can compare a maximum of 3 colleges at a time', 'warning');
      return;
    }

    set({ compareIds: [...compareIds, id] });
    addToast('College added to comparison list', 'success');
  },
  removeFromCompare: (id) => {
    const { compareIds } = get();
    const addToast = useGlobalStore.getState().addToast;
    set({ compareIds: compareIds.filter((cid) => cid !== id) });
    addToast('College removed from comparison list', 'info');
  },
  clearCompare: () => {
    set({ compareIds: [] });
    useGlobalStore.getState().addToast('Comparison list cleared', 'info');
  },
  isComparing: (id) => {
    return get().compareIds.includes(id);
  },
}));
