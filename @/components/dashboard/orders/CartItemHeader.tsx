const CartItemHeader = () => {
  return (
    <div className="w-full flex items-center">
      <span className="w-4/12 ps-4">المنتجات</span>
      <span className="w-2/12 flex justify-center items-center">الإضافات</span>
      <span className="w-2/12 flex justify-center items-center">العدد</span>
      <span className="w-2/12 flex justify-center items-center">السعر</span>
      <span className="w-2/12 flex justify-center items-center">الإجمالي</span>
    </div>
  );
};

export default CartItemHeader;
