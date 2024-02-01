import { Item } from "@/components/menu/Cart";
import { useContext, createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = (item) => {
    setCart([...cart, item]);
    setTotal(total + item.price);
  };

  const removeItem = (index: number) => {
    if (index !== -1 && index < cart.length) {
      const item = cart[index];
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
      setTotal(total - item.price);
    }
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  useEffect(() => {
    console.log({ cart: cart, total: total });
  }, [cart]);
  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
