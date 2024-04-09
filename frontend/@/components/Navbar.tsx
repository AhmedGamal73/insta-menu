import { Gift, MessageCircleMore, Pizza, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Cart } from "./menu/cart/Cart";

const Navbar = () => {
  const [page, setPage] = useState("");
  const router = useRouter();
  router.pathname;
  const currentPage = router.pathname.split("/");
  const singlePage = currentPage[currentPage.length - 1];

  useEffect(() => {
    setPage(singlePage);
  }, [page]);

  return (
    <div>
      <div className="w-full pb-1 px-3 flex insert-x-0 bottom-2 fixed items-center justify-center">
        <div className="w-full flex justify-between items-center gap-4 py-2 px-3 shadow-3xl shadow-warning/80  bg-white rounded-[20px]">
          <Link
            href={"/"}
            className={`flex flex-col items-center gap-1 ${
              page === "" ? "bg-gray-100 p-2 px-3 rounded-xl" : ""
            } `}
          >
            <Pizza
              className={`w-[22px] h-[22px]
                ${page === "" ? "text-black" : "text-text"}`}
            />
            <span
              className={
                page === "" ? "text-xs font-rubikBold" : "text-xs text-text"
              }
            >
              الرئيسية
            </span>
          </Link>
          <Cart />
          <Link
            href="/menu/account"
            className={`flex flex-col items-center gap-1 ${
              page === "account" ? "bg-gray-100 p-2 px-3 rounded-xl" : ""
            }`}
          >
            <UserRound
              className={`w-[22px] h-[22px]
                ${page === "account" ? "text-black" : "text-text"}`}
            />
            <span
              className={
                page === "account"
                  ? "text-xs font-rubikBold"
                  : "text-xs text-text"
              }
            >
              حسابي
            </span>
          </Link>
          <button className="flex flex-col items-center gap-1 rounded-xl">
            <MessageCircleMore className="w-[22px] h-[22px] text-text" />
            <span className="text-xs text-text">راسلنا</span>
          </button>
          <a className="flex flex-col items-center gap-1 rounded-xl" href="#">
            <Gift className="w-[20px] h-[20px] text-text" />
            <span className="text-xs text-text">العروض</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
