import React from "react";
import { ChevronLeft, Menu } from "lucide-react";
import { useRouter } from "next/router";

interface MenuHeaderProps {
  title: string;
  onMenuClick?: () => void;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ title, onMenuClick }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={`w-full fixed top-4 px-4 z-10 bg-transparent`}>
      <div className="w-full flex justify-between items-center py-3 px-3 rounded-lg bg-white shadow-md">
        {/* Left - Menu/Burger Icon */}
        <button
          onClick={onMenuClick}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Center - Title */}
        <h6 className="text-base font-medium text-center flex-1 mx-4 truncate">
          {title}
        </h6>

        {/* Right - Back/Chevron Icon */}
        <button
          onClick={handleBack}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MenuHeader;
