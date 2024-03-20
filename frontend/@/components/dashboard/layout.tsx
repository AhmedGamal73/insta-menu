import Navbar from "@/components/dashboard/navbar/navbar";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  desc: string;
}

function Layout({ children, title, desc }: LayoutProps) {
  return (
    <div
      className="flex min-h-screen justify-center items-center min-h-screen bg-gray-200"
      dir="rtl"
    >
      <Sidebar className="flex flex-col items-start gap-2 w-1/6 bg-gray-200 h-screen" />
      <div className="flex flex-col flex-1 bg-white rounded-r-xl">
        <Navbar title={title} desc={desc} className="w-1/1 border-b-2 p-5" />
        <div className="flex-1">{children}</div>
      </div>
      <Toaster />
    </div>
  );
}

export default Layout;
