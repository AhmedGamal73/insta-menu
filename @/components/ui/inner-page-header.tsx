import BackButton from "./BackButton";

const InnerPageHeader = ({ children, href }) => {
  return (
    <div className="w-full bg-white flex justify-between px-4 py-2 border border-b rounded-lg shadow-sm">
      <div className="flex gap-2 ">{children}</div>
      <BackButton href={href} />
    </div>
  );
};

export default InnerPageHeader;
