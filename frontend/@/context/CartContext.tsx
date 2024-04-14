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

    const total = subtotal + item.total;
    setSubtotal(total);
    setVat(parseFloat((total * 0.14).toFixed(2)));
    setQuantity(quantity + item.quantity);
  };

  const removeItem = (index: number) => {
    if (index !== -1 && index < cart.length) {
      const item = cart[index];
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
      const total = subtotal - item.total;
      setSubtotal(total);
      setVat(parseFloat((total * 0.14).toFixed(2)));
      setQuantity(quantity - item.quantity);
    }
  };

  const clearCart = () => {
    setCart([]);
    setSubtotal(0);
    setQuantity(0);
  };

  useEffect(() => {
    const savedQuantity = Cookies.get("quantity");
    if (savedQuantity) {
      setQuantity(JSON.parse(savedQuantity));
    }
  }, []);

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart));
    Cookies.set("subtotal", JSON.stringify(subtotal));
    Cookies.set("vat", JSON.stringify(vat));
    Cookies.set("quantity", JSON.stringify(quantity));
    console.log(cart);
  }, [cart, quantity]);

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
