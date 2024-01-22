import Navbar from "@/components/dashboard/navbar/navbar";
import Sidbar from "@/components/dashboard/sidebar/sidebar";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  desc: string;
}
function Layout({ children, title, desc }: LayoutProps) {
  return (
    <div className="flex" dir="rtl">
      <Sidbar className="flex w-1/6 bg-gray-200 h-screen" />
      <div className="flex flex-col flex-1">
        <Navbar title={title} desc={desc} className="w-1/1 border-b-2 p-5" />
        <div className="flex-1">
          {children}
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default Layout;
