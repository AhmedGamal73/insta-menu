import Navbar from "@/components/dashboard/navbar/navbar";
import Sidbar from "@/components/dashboard/sidebar/sidebar";
import { Toaster } from "@/components/ui/toaster";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex" dir="rtl">
      <Sidbar className="flex w-1/5 bg-gray-200 h-screen" />
      <div className="flex flex-col flex-1">
        <Navbar className="w-1/1 bg-blue-200 py-4" />
        <div className="flex-1 p-5">
          {children}
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default Layout;
