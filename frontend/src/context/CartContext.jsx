import React, { createContext, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("dd_cart") || "[]"));

  const sync = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem("dd_cart", JSON.stringify(nextItems));
  };

  const addToCart = (food) => {
    const current = items.find((item) => item._id === food._id);
    const nextItems = current
      ? items.map((item) => (item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item))
      : [...items, { ...food, quantity: 1 }];
    sync(nextItems);
    toast.success(`${food.name} added to cart`);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    sync(items.map((item) => (item._id === id ? { ...item, quantity } : item)));
  };

  const removeItem = (id) => {
    sync(items.filter((item) => item._id !== id));
    toast.success("Item removed");
  };

  const clearCart = () => sync([]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 39;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + taxes;

  const value = useMemo(
    () => ({ items, addToCart, updateQuantity, removeItem, clearCart, subtotal, deliveryFee, taxes, total }),
    [items, subtotal, deliveryFee, taxes, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
