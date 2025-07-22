import React, { createContext, useContext, useReducer } from 'react';
// カートに入れるアイテムの型定義的（JSでは自由）
// { id: string, name: string, price: number, quantity: number }

const initialState = { items: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.id !== action.id) };
    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map(i =>
          i.id === action.id
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

const CartContext = createContext({ state: initialState, dispatch: () => null });

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
