import { BellPlus, HelpCircle } from "lucide-react";
import { CreateSection } from "../restaurant/CreateSection";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

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
        <Avatar className="w-8 h-8 rounded-full">
          <AvatarImage
            className="rounded-full"
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Navbar;
