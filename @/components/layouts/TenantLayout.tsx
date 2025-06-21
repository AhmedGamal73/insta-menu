import React from "react";
import { MenuHeader } from "@/components/headers";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "../Navbar";

interface BranchLayoutProps {
  children: React.ReactNode;
  title: string;
}

const BranchLayout: React.FC<BranchLayoutProps> = ({ children, title }) => {
  const handleMenuClick = () => {
    // Add off-canvas menu logic here
    console.log("Menu clicked in branch layout");
  };

  return (
    <div dir="rtl">
      <MenuHeader title={title} onMenuClick={handleMenuClick} />
      <main className="pt-16">{children}</main>
      <Toaster />
      <Navbar />
    </div>
  );
};

export default BranchLayout;
