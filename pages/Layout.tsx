import { MenuHeader } from "@/components/headers";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

function Layout({ children, title }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    // Add your off-canvas menu logic here
    console.log("Menu clicked - implement off-canvas");
  };

  return (
    <div dir="rtl" className="min-h-screen">
      <MenuHeader title={title} onMenuClick={handleMenuClick} />
      <main className="pt-16 pb-16">{children}</main>
      <Navbar />
      <Toaster />
    </div>
  );
}

export default Layout;
