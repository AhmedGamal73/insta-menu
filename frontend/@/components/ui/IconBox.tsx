import { Icon } from "@radix-ui/react-select";
import { Blocks } from "lucide-react";
import React, { ReactNode } from "react";

interface IconBoxProps {
  title: string;
  desc: string;
  children: any;
}

const IconBox = ({ title, desc, children }: IconBoxProps) => {
  return (
    <div className="flex justify-between ">
      <div className="flex flex-col ">
        <h6>{title}</h6>
        <p>{desc}</p>
      </div>
      {children}
    </div>
  );
};

export default IconBox;
