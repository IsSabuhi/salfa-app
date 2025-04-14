import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductType } from '../types/ProductType';

interface ProductStore {
  products: ProductType[];
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<ProductType, 'id'>) => Promise<void>;
  removeProduct: (id: number) => void;
  initialized: boolean;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      initialized: false,

      fetchProducts: async () => {
        if (get().products.length > 0) {
          set({ initialized: true });
          return;
        }

        try {
          const response = await fetch('https://fakestoreapi.com/products');
          const data = await response.json();
          set({ products: data, initialized: true });
        } catch (error) {
          console.error('Error fetching products:', error);
          set({ initialized: true });
        }
      },

      addProduct: async (product) => {
        const newId = Math.max(0, ...get().products.map((p) => p.id)) + 1;
        const newProduct = { ...product, id: newId };

        set((state) => ({
          products: [...state.products, newProduct],
        }));
      },

      removeProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));
      },
    }),
    {
      name: 'product-storage',
      partialize: (state) => ({
        products: state.products,
        initialized: true,
      }),
    }
  )
);
