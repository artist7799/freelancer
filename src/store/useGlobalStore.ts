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
  // Read initial theme from localStorage, default to light
  const savedTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'light';
  const initialTheme = savedTheme;

  // Apply theme class to document
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }

  return {
    theme: initialTheme,
    setTheme: (theme) => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
      localStorage.setItem('theme', theme);
      set({ theme });
    },
    toggleTheme: () => {
      set((state) => {
        const next = state.theme === 'dark' ? 'light' : 'dark';
        if (next === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        }
        localStorage.setItem('theme', next);
        return { theme: next };
      });
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
