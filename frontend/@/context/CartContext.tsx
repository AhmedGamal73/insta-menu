import { Item } from "@/components/menu/cart/Cart";
import Cookies from "js-cookie";
import { useContext, createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [vat, setVat] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const addItem = (item: Item) => {
    setCart([...cart, item]);
    const total = subtotal + item.price;
    setSubtotal(total);
    setVat(Math.round(total * 0.14));
    setQuantity(quantity + item.quantity);
  };

  const removeItem = (index: number) => {
    if (index !== -1 && index < cart.length) {
      const item = cart[index];
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
      const total = subtotal - item.price;
      setSubtotal(total);
      setVat(Math.round(total * 0.14));
      setQuantity(quantity - item.quantity);
    }
  };

  const clearCart = () => {
    setCart([]);
    setSubtotal(0);
  };

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart));
    Cookies.set("subtotal", JSON.stringify(subtotal));
    Cookies.set("vat", JSON.stringify(vat));
    Cookies.set("quantity", JSON.stringify(quantity));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal,
        quantity,
        addItem,
        removeItem,
        clearCart,
        setCart,
        setVat,
        setSubtotal,
        setQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
