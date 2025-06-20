"use client";

import { useState } from "react";

import Layout from "../../../@/components/dashboard/layout";
import variables from "@/config/variables";
import Orders from "@/components/dashboard/orders/Orders";
import Table from "@/components/dashboard/tables/Tables";

function TablesPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabs = variables.dashboardTabs.restaurant;

  return (
    <Layout title="المطاعم" desc="هنا يمكنك مشاهدة جميع الطلبات والتحكم بها">
      <div className="w-full flex flex-col justify-between items-center border-b-2">
        <div className="flex gap-2 px-6 mb-4 border-b w-full">
          {tabs.map((tab) => {
            return (
              <button
                key={tab.id}
                className={`rounded-none border-0 py-2 text-text  font-light px-4 text-sm${
                  activeTab === tab.id ? " border-b-4 border-primary" : ""
                } transition-all duration-200 ease-in-out`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            );
          })}
        </div>
        <div className="w-full px-6">
          {tabs[activeTab]?.component === "restaurants" ? <Table /> : "ييي"}
        </div>
      </div>
    </Layout>
  );
}

export default TablesPage;
