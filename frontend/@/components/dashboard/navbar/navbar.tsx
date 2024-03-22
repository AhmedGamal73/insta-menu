import { BellPlus, HelpCircle } from "lucide-react";
import MyAvatar from "@/components/dashboard/navbar/MyAvatar";
import CreateButton from "@/components/dashboard/navbar/CreateButton";

interface navbarProps {
  className: string;
  title: string;
  desc: string;
}

function Navbar({ className, title, desc }: navbarProps) {
  return (
    <div className={`${className} flex justify-between`}>
      <div className="w-1/2">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div className="w-1/2 text-end flex justify-end items-center gap-6">
        <HelpCircle className="w-4 h-4" />
        <BellPlus className="w-4 h-4" />
        <MyAvatar />
        <CreateButton />
      </div>
    </div>
  );
}

export default Navbar;
