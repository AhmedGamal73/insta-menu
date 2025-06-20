import { Gift, MessageCircleMore, Pizza, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTenantContext } from "@/context/tenant-context";
import { Cart } from "./menu/cart/Cart";
import { LanguageSelector } from "./ui/language-selector";

const Navbar = () => {
  const [page, setPage] = useState("");
  const router = useRouter();
  const { currentTenant } = useTenantContext();
  const currentPage = router.pathname.split("/");
  const singlePage = currentPage[currentPage.length - 1];

  useEffect(() => {
    setPage(singlePage);
  }, [page]);

  // Get theme colors from tenant or use defaults
  const theme = {
    primary: currentTenant?.theme?.primary || "#000000",
    secondary: currentTenant?.theme?.secondary || "#666666",
    background: currentTenant?.theme?.background || "#ffffff",
    accent: currentTenant?.theme?.accent || "#f3f4f6",
  };

  const getItemStyle = (pageName: string) => {
    const isActive = page === pageName;
    return {
      backgroundColor: isActive ? theme.accent : "transparent",
      color: isActive ? theme.primary : theme.secondary,
    };
  };

  return (
    <div>
      <div className="w-full pb-1 px-3 flex insert-x-0 bottom-2 fixed items-center justify-center">
        <div
          className="w-full flex justify-between items-center gap-4 py-2 px-3 shadow-3xl rounded-[20px]"
          style={{
            backgroundColor: theme.background,
            boxShadow: `0 4px 6px -1px ${theme.primary}20`,
          }}
        >
          <Link
            href={"/"}
            className="flex flex-col items-center gap-1 p-2 px-3 rounded-xl"
            style={getItemStyle("")}
          >
            <Pizza className="w-[22px] h-[22px]" />
            <span className="text-xs font-rubikBold">الرئيسية</span>
          </Link>

          <Cart />

          <Link
            href="/menu/account"
            className="flex flex-col items-center gap-1 p-2 px-3 rounded-xl"
            style={getItemStyle("account")}
          >
            <UserRound className="w-[22px] h-[22px]" />
            <span className="text-xs">حسابي</span>
          </Link>

          <LanguageSelector />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
