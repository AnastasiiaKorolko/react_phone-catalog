
import React, { createContext, useContext, useState, useEffect } from 'react';

import { Product } from '../../types/Product';

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  image: string;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCard = localStorage.getItem('cart');
    if (storedCard) {
      setCart(JSON.parse(storedCard));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) return prevCart;
      return [...prevCart, { id: product.id, product, quantity: 1, image: product.image || '', price: product.price, } as CartItem,];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item => (item.id === id ? { ...item, quantity} : item))

    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalQuantity = cart.reduce((sum, item) => item.quantity + sum, 0 );
  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0 )
  console.log('totalAmount', totalAmount)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalQuantity, totalAmount}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
