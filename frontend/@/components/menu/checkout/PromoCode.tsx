const PromoCode = () => {
  return (
    <div dir="rtl" className="w-full">
      <div
        dir="rtl"
        className="w-full flex bg-white rounded-s-[10px] rounded-e-[10px]"
      >
        <button className="1/4 py-2 px-4 rounded-s-[10px] bg-secondary text-white">
          تطبيق
        </button>
        <input
          placeholder="ادخل القسيمة هنا"
          className="w-3/4 flex justify-center items-center text-center rounded-e-[10px]"
        />
      </div>
    </div>
  );
};

export default PromoCode;
