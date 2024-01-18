import React, { useState, useEffect } from "react";
import Layout from "../layout";
import variables from "@/config/variables";
import Tables from "@/components/dashboard/restaurant/Tables";
import Sections from "@/components/dashboard/restaurant/Sections";
import Waiters from "@/components/dashboard/restaurant/Waiters";
import { Button } from "@/components/ui/button";

export const FetchUsersContext = React.createContext<
  (() => Promise<void>) | undefined
>(undefined);

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tab = variables.dashboardTabs.restaurant;

  useEffect(() => {
    console.log(activeTab);
  });
  return (
    <Layout title={tab[activeTab]?.name} desc={tab[activeTab]?.desc}>
      <div className="w-full flex justify-between items-center px-5 border-b-2">
        <div className="flex gap-2 w-1/2">
          {variables.dashboardTabs.restaurant.map((tab) => {
            return (
              <button
                key={tab.id}
                className={
                  "rounded-none py-2 text-text font-light px-4 text-lg" +
                  `${
                    activeTab === tab.id
                      ? "border-b-1 border-red-500 text-red-500"
                      : ""
                  }`
                }
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-5">
        {tab[activeTab]?.component === "tables" ? (
          <Tables />
        ) : tab[activeTab]?.component === "sections" ? (
          <Sections />
        ) : tab[activeTab]?.component === "users" ? (
          <Waiters />
        ) : (
          " لا يوجد محتوي "
        )}
      </div>
    </Layout>
  );
}
