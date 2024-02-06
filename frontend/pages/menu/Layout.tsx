import Navbar from "@/components/menu/Navbar";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <div dir="rtl" className="h-full">
      <div className="">
        {/* <Navbar /> */}
        {children}
        <Toaster />
      </div>
    </div>
  );
}

export default Layout;
