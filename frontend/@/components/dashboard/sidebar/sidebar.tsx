interface sidebarProps {
  className: string;
}

const munuItems = [];

function Sidbar({ className }: sidebarProps) {
  return (
    <div className={className}>
      <h1>Sidebar</h1>
    </div>
  );
}

export default Sidbar;
