import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  originalPrice?: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      total: 0,

      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }

        // Recalculate totals
        const updatedItems = get().items;
        set({
          itemCount: updatedItems.reduce((acc, i) => acc + i.quantity, 0),
          total: updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
        });
      },

      removeItem: (id) => {
        const items = get().items.filter((i) => i.id !== id);
        set({
          items,
          itemCount: items.reduce((acc, i) => acc + i.quantity, 0),
          total: items.reduce((acc, i) => acc + i.price * i.quantity, 0),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        const items = get().items.map((i) =>
          i.id === id ? { ...i, quantity } : i
        );
        set({
          items,
          itemCount: items.reduce((acc, i) => acc + i.quantity, 0),
          total: items.reduce((acc, i) => acc + i.price * i.quantity, 0),
        });
      },

      clearCart: () => set({ items: [], itemCount: 0, total: 0 }),
    }),
    {
      name: "cart-storage",
    }
  )
);
