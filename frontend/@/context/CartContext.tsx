import { Item } from "@/components/menu/Cart";
import Cookies from "js-cookie";
import { useContext, createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [vat, setVat] = useState(0);

  const addItem = (item) => {
    setCart([...cart, item]);
    const tot = total + item.price;
    setTotal(tot);
    setVat(tot * 0.14);
  };

  const removeItem = (index: number) => {
    if (index !== -1 && index < cart.length) {
      const item = cart[index];
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
      const tot = total - item.price;
      setTotal(tot);
      setVat(tot * 0.14);
    }
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart));
    Cookies.set("total", JSON.stringify(total));
    Cookies.set("vat", JSON.stringify(vat));
  }, [cart, total]);

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addItem,
        removeItem,
        clearCart,
        setCart,
        setVat,
        setTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
