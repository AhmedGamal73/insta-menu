import { ChevronLeft, Menu } from "lucide-react";
import { useRouter } from "next/router";

const Header = ({ title }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <div className="w-full insert-x-0 fixed top-2 px-2 z-10">
      <div className="w-full flex justify-between py-3 px-3 rounded-lg isolate bg-white/90 shadow-sm">
        <button>
          <Menu />
        </button>
        <h6>{title}</h6>
        <button onClick={goBack}>
          <ChevronLeft />
        </button>
      </div>
    </div>
  );
};

export default Header;
