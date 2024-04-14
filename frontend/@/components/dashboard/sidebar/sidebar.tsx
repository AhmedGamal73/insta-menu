import variables from "@/config/variables";
import Link from "next/link";
import { useState } from "react";
import { ChevronLast } from "lucide-react";

export function Sidebar() {
  const [active, setActive] = useState<number>(0);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState<boolean>(false);

  const handleToggle = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <div
      className={`flex relative flex-col items-start justify-start gap-2 w-1/6 bg-gray-200 min-h-svh transition-all duration-500 ${
        isSidebarMinimized ? "w-14 px-2" : "w-44"
      } gap-2 px-2`}
    >
      <div className={`w-full flex flex-col`}>
        <ul className="w-full flex flex-col gap-4">
          {variables.dashboardMenuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = active == item.id;
            return (
              <li
                key={index}
                className={`w-full py-2 px-2 transition hover:bg-white hover:text-primary rounded ${
                  active === item.id ? "bg-white text-primary" : "text-primary"
                }`}
              >
                {isSidebarMinimized ? (
                  <Link
                    href={item.href}
                    onClick={() => setActive(item.id)}
                    className={`w-full flex justify-center items-center gap-1`}
                  >
                    <Icon
                      className={`${
                        active === item.id
                          ? "w-4 h-4 text-primar"
                          : "w-4 h-4 text-primary"
                      }`}
                    />
                  </Link>
                ) : (
                  <Link
                    onClick={() => setActive(item.id)}
                    href={item.href}
                    className={`w-full flex items-center gap-2 px-2
                    ${active === item.id ? "bg-white text-primary" : ""}`}
                  >
                    <Icon
                      className={` ${
                        active === item.id
                          ? "w-4 text-primary text-white"
                          : "w-4 text-primary"
                      }`}
                    />
                    <span className={`text-[15px] text-primary`}>
                      {item.name}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <button
        className="rounded-full border absolute top-8 left-[-15px] border-gray-300 bg-white p-1 shadow-lg"
        onClick={handleToggle}
      >
        {
          <ChevronLast
            className={`w-3 h-3 transition duration-300${
              isSidebarMinimized ? "transform rotate-180" : ""
            }`}
          />
        }
      </button>
    </div>
  );
}

export default Sidebar;
