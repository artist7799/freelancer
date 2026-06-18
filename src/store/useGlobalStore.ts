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
  // Read initial theme from HTML class or localStorage
  const initialTheme = 
    localStorage.getItem('theme') === 'light' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)
      ? 'light'
      : 'dark';

  // Apply theme class to document
  if (initialTheme === 'light') {
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
  }

  return {
    theme: initialTheme,
    setTheme: (theme) => {
      localStorage.setItem('theme', theme);
      if (theme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
      set({ theme });
    },
    toggleTheme: () => {
      set((state) => {
        const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', nextTheme);
        if (nextTheme === 'light') {
          document.documentElement.classList.add('light');
        } else {
          document.documentElement.classList.remove('light');
        }
        return { theme: nextTheme };
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
