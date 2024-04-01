const Box = ({ className, children, title, dataClassName }) => {
  return (
    <div className={`${className} rounded-lg border`}>
      <div className="w-full font-rubikBold bg-white rounded-t-lg border-b px-4 py-3">
        <h6>{title}</h6>
      </div>
      <div
        className={`${dataClassName} flex w-full p-4 bg-white rounded-b-lg border-1`}
      >
        {children}
      </div>
    </div>
  );
};

export default Box;
