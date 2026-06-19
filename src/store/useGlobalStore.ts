import { create } from 'zustand';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

interface GlobalState {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  toasts: Toast[];
  addToast: (message: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useGlobalStore = create<GlobalState>((set) => {
  // Read initial theme - locked to light mode
  const initialTheme = 'light';

  // Apply light theme class to document
  document.documentElement.classList.add('light');

  return {
    theme: initialTheme,
    setTheme: () => {
      document.documentElement.classList.add('light');
      set({ theme: 'light' });
    },
    toggleTheme: () => {
      document.documentElement.classList.add('light');
      set({ theme: 'light' });
    },
    searchModalOpen: false,
    setSearchModalOpen: (searchModalOpen) => set({ searchModalOpen }),
    toasts: [],
    addToast: (message, type) => {
      const id = Math.random().toString(36).substring(2, 9);
      set((state) => ({
        toasts: [...state.toasts, { id, message, type }],
      }));
      // Auto-remove toast after 4 seconds
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, 4000);
    },
    removeToast: (id) =>
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      })),
  };
});
