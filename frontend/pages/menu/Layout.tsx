import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

function Layout({ children, title }: LayoutProps) {
  return (
    <div dir="rtl">
      <div className="">
        <Header title={title} />
        {children}
        <Navbar />
      </div>
    </div>
  );
}

export default Layout;
