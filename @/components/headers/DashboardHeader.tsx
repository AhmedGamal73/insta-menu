import React from "react";
import { BellPlus, HelpCircle, Search, Settings } from "lucide-react";
import MyAvatar from "@/components/dashboard/navbar/MyAvatar";
import CreateButton from "@/components/dashboard/navbar/CreateButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  className?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
  className = "",
  showSearch = false,
  searchPlaceholder = "البحث...",
  onSearch,
}) => {
  return (
    <header className={`bg-white border-b px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Left Section - Title and Description */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-muted-foreground text-sm mt-1">{description}</p>
          )}
        </div>

        {/* Center Section - Search (if enabled) */}
        {showSearch && (
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                className="pr-10"
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Right Section - Actions and User */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <BellPlus className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          {/* Help */}
          <Button variant="ghost" size="icon">
            <HelpCircle className="w-5 h-5" />
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>

          {/* Divider */}
          <div className="w-px h-6 bg-border"></div>

          {/* User Avatar */}
          <MyAvatar />

          {/* Create Button */}
          <CreateButton />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
