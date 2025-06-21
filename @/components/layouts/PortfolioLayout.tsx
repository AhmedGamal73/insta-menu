import React from "react";
import { LandingHeader, MenuHeader } from "@/components/headers";

interface BranchLayoutProps {
  children: React.ReactNode;
}

const BranchLayout: React.FC<BranchLayoutProps> = ({ children }) => {
  return (
    <div dir="rtl">
      <LandingHeader />
      <main className="pt-16">{children}</main>
    </div>
  );
};

export default BranchLayout;
