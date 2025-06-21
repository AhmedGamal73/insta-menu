import { DashboardHeader } from "@/components/headers";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  desc?: string;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
}

function Layout({
  children,
  title,
  desc,
  showSearch = false,
  onSearch,
}: LayoutProps) {
  return (
    <div
      className="flex min-h-screen justify-center items-center bg-gray-200"
      dir="rtl"
    >
      <Sidebar />
      <div className="min-h-screen flex flex-col flex-1 bg-white rounded-r-xl">
        <DashboardHeader
          title={title}
          description={desc}
          showSearch={showSearch}
          onSearch={onSearch}
        />
        <main className="flex-1 min-h-screen p-6">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}

export default Layout;
