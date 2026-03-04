import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { Product } from "../data/products";

export type CartItem = Pick<Product, "id" | "name" | "price" | "image"> & { qty: number };

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: "TOGGLE_OPEN"; value?: boolean }
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; id: number }
  | { type: "SET_QTY"; id: number; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState };

const CartCtx = createContext<{
  state: CartState;
  add: (p: Product) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
  open: (v?: boolean) => void;
  subtotal: number;
  count: number;
} | null>(null);

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "TOGGLE_OPEN":
      return { ...state, isOpen: action.value ?? !state.isOpen };
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.product.id);
      const items = existing
        ? state.items.map((i) => (i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i))
        : state.items.concat({
            id: action.product.id,
            name: action.product.name,
            price: action.product.price,
            image: action.product.image,
            qty: 1,
          });
      return { ...state, items, isOpen: true };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "SET_QTY": {
      const qty = Math.max(1, Math.min(99, action.qty));
      return { ...state, items: state.items.map((i) => (i.id === action.id ? { ...i, qty } : i)) };
    }
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

const STORAGE_KEY = "edab_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false });

  // hydrate
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartState;
      if (!parsed || !Array.isArray(parsed.items)) return;
      dispatch({ type: "HYDRATE", state: { items: parsed.items, isOpen: false } });
    } catch {
      // ignore
    }
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items, isOpen: false }));
    } catch {
      // ignore
    }
  }, [state.items]);

  const subtotal = useMemo(() => state.items.reduce((s, i) => s + i.price * i.qty, 0), [state.items]);
  const count = useMemo(() => state.items.reduce((s, i) => s + i.qty, 0), [state.items]);

  const value = useMemo(
    () => ({
      state,
      add: (p: Product) => dispatch({ type: "ADD", product: p }),
      remove: (id: number) => dispatch({ type: "REMOVE", id }),
      setQty: (id: number, qty: number) => dispatch({ type: "SET_QTY", id, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
      open: (v?: boolean) => dispatch({ type: "TOGGLE_OPEN", value: v }),
      subtotal,
      count,
    }),
    [state, subtotal, count]
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}