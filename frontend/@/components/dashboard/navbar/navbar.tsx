interface navbarProps {
  className: string;
  title: string;
  desc: string;
}

function Navbar({ className, title, desc }: navbarProps) {
  return (
    <div className={`${className} flex justify-between`}>
      <div className="w-1/2">
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      <div></div>
    </div>
  );
}

export default Navbar;
