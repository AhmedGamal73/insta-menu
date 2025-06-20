const Card2 = ({ className, children }) => {
  return (
    <div
      className={`w-full flex flex-col gap-4 bg-white p-3 rounded-[10px] ${className}`}
    >
      {children}
    </div>
  );
};

export default Card2;
