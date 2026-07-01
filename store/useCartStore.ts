import { create } from "zustand";

export interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  discountPrice?: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  isCartOpen: boolean;
  toggleCart: (open?: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  isCartOpen: false,

  // Open or close the sliding shopping cart drawer
  toggleCart: (open) =>
    set((state) => ({
      isCartOpen: open !== undefined ? open : !state.isCartOpen,
    })),

  // Add item to cart. If product ID and selected Size match, increase quantity. Else, add as new line.
  addItem: (newItem) =>
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size,
      );

      if (existingIndex > -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += 1;
        return { cart: updatedCart };
      }

      return { cart: [...state.cart, { ...newItem, quantity: 1 }] };
    }),

  // Remove a product line matching ID and Size
  removeItem: (id, size) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.id === id && item.size === size),
      ),
    })),
  // Update item quantity
  updateQuantity: (id, size, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      ),
    })),
  // Clear cart
  clearCart: () => set({ cart: [] }),
  // Calculate total price based on active price (discountPrice or price)
  getCartTotal: () => {
    return get().cart.reduce((total, item) => {
      const activePrice = item.discountPrice ?? item.price;
      return total + activePrice * item.quantity;
    }, 0);
  },
  // Calculate total items inside the shopping cart
  getCartCount: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },
}));
