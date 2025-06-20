"use client";

import { useState } from "react";

import Layout from "../../../@/components/dashboard/layout";
import variables from "@/config/variables";
import Orders from "@/components/dashboard/orders/Orders";
import Table from "@/components/dashboard/tables/Tables";
import { CreateTable } from "@/components/dashboard/tables/CreateTable";
import { CreateSection } from "@/components/dashboard/sections/CreateSection";
import Sections from "@/components/dashboard/restaurant/Sections";
import { Card } from "@/components/ui/card";

function TablesPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabs = variables.dashboardTabs.tables;

  return (
    <Layout title="الطاولات" desc="هنا يمكنك مشاهدة جميع الطلبات والتحكم بها">
      <div className="w-full flex flex-col justify-between items-center border-b-2">
        <div className="flex justify-between items-center gap-2 px-6 mb-4 border-b w-full">
          <div>
            {tabs.map((tab) => {
              return (
                <button
                  key={tab.id}
                  className={`rounded-none border-0 py-3 text-text font-light px-4 text-sm${
                    activeTab === tab.id ? " border-b-4 border-primary" : ""
                  } transition-all duration-200 ease-in-out`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
          {tabs[activeTab]?.component === "tables" ? (
            <>
              <CreateTable />
            </>
          ) : (
            ""
          )}
        </div>
        <div className="w-full flex px-6 gap-8">
          {tabs[activeTab]?.component === "tables" ? <Table /> : ""}
        </div>
      </div>
    </Layout>
  );
}

export default TablesPage;
