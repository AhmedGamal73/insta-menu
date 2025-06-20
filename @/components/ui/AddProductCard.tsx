const AddProductCard = ({ children, title, width }) => {
  return (
    <div
      className={`${width} bg-white border-solid border border-grey-100 shadow-#11 rounded-lg p-4`}
    >
      <h5 className="pb-4">{title}</h5>
      {children}
    </div>
  );
};

export default AddProductCard;
