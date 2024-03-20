import variables from "@/config/variables";
import Link from "next/link";
import { useState } from "react";

export function Sidebar({ className }) {
  const [active, setActive] = useState<number>(0);
  return (
    <div className={`${className} px-4 pt-4 gap-4`}>
      <img src="/logo.png" alt="logo" className="w-[150px] h-[100px]" />
      <div className={`w-full flex flex-col`}>
        <ul className="w-full flex flex-col gap-2">
          {variables.dashboardMenuItems.map((item) => (
            <li
              className={`w-full py-2 px-4 transition hover:bg-white hover:text-primary rounded ${
                active == item.id ? "bg-primary text-white" : ""
              }`}
            >
              <Link
                onClick={() => setActive(0)}
                href={item.href}
                className="w-full flex items-center gap-1 hover:bg-red"
              >
                {/* <Home w-2 h-2 / */}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
