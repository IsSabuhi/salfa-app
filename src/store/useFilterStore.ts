import { create } from 'zustand';

type FilterStore = {
  filter: 'all' | 'favorites';
  favorites: number[];
  setFilter: (filter: 'all' | 'favorites') => void;
  toggleFavorite: (id: number) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  filter: 'all',
  favorites: [],
  setFilter: (filter) => set({ filter }),

  toggleFavorite: (id) =>
    set((state) => {
      if (state.favorites.includes(id)) {
        return { favorites: state.favorites.filter((favId) => favId !== id) };
      } else {
        return { favorites: [...state.favorites, id] };
      }
    }),
}));
