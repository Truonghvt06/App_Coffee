// CartContext.js

import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const addItemToCart = (item, quantity, size) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (i) => i.id === item.id && i.size === size
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      }
      return [...prevItems, { ...item, quantity, size }];
    });
  };

  const removeItemFromCart = (id, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id || item.size !== size)
    );
  };

  const addOrderToHistory = (order) => {
    setOrderHistory((prevHistory) => [...prevHistory, order]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orderHistory,
        addToCart,
        addItemToCart,
        removeItemFromCart,
        addOrderToHistory,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
