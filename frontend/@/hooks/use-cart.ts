export type CartItems = {
  productId: string;
  quantity: number;
  price: number;
  addons?: string[];
  note: string;
};

export type Cart = {
  _id?: string;
  cartItems: CartItems[];
};
