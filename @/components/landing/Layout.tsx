// components/Layout.tsx
import React from "react";
import { LandingHeader } from "@/components/headers";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      {/* Add padding-top to account for fixed header */}
      <main className="pt-16">{children}</main>
      <Toaster />
    </div>
  );
};

export default Layout;
