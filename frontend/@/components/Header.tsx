import { ChevronLeft, Menu } from "lucide-react";
import Link from "next/link";

const Header = ({ title }) => {
  return (
    <div className="w-full insert-x-0 top-2 fixed px-2">
      <div className="w-full flex justify-between py-3 px-3 rounded-lg isolate bg-white/100 shadow-sm ring-1 ring-black/10">
        <button>
          <Menu />
        </button>
        <h6>{title}</h6>
        <Link href="/menu">
          <ChevronLeft />
        </Link>
      </div>
    </div>
  );
};

export default Header;
