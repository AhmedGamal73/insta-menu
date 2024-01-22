import React, { useState } from "react";
import Layout from "../layout";
import variables from "@/config/variables";
import Tables from "@/components/dashboard/restaurant/Tables";
import Sections from "@/components/dashboard/restaurant/Sections";
import Waiters from "@/components/dashboard/restaurant/Waiters";
import { CreateSection } from "@/components/dashboard/restaurant/CreateSection";
import { CreateTable } from "@/components/dashboard/restaurant/CreateTable";

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabs = variables.dashboardTabs.restaurant;

  return (
    <Layout title={tabs[activeTab]?.name} desc={tabs[activeTab]?.desc}>
      <div className="w-full flex justify-between items-center px-5 border-b-2">
        <div className="flex gap-2 w-1/2">
          {tabs.map((tab) => {
            return (
              <button
                key={tab.id}
                className={`rounded-none border-0 py-4 text-text  font-light px-4 text-sm${
                  activeTab === tab.id ? " border-b-4 border-primary" : ""
                } transition-all duration-200 ease-in-out`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            );
          })}
        </div>
        {tabs[activeTab]?.component === "sections" ? (
          <CreateSection />
        ) : tabs[activeTab]?.component === "tables" ? (
          <CreateTable />
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col gap-4 p-5">
        {tabs[activeTab]?.component === "tables" ? (
          <Tables />
        ) : tabs[activeTab]?.component === "sections" ? (
          <Sections />
        ) : tabs[activeTab]?.component === "users" ? (
          <Waiters />
        ) : (
          " لا يوجد محتوي "
        )}
      </div>
    </Layout>
  );
}
