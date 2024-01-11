interface navbarProps {
  className: string;
}

function Navbar({ className }: navbarProps) {
  return (
    <div className={className}>
      <h1>Navbar</h1>
    </div>
  );
}

export default Navbar;
