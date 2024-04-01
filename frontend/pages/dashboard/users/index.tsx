"use client";

import { useState } from "react";

import Layout from "../../../@/components/dashboard/layout";
import variables from "@/config/variables";
import CreateItem from "@/components/dashboard/products/CreateItem";
import Waiters from "@/components/dashboard/users/waiter/Waiter";
import CreateUser from "@/components/dashboard/users/CreateUser";

function UsersPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabs = variables.dashboardTabs.users;

  return (
    <Layout title="الطلبات" desc="هنا يمكنك مشاهدة جميع الطلبات والتحكم بها">
      <div className="w-full flex flex-col justify-between items-center">
        <div className="w-full flex justify-between gap-2 px-6 mb-4 border-b">
          <div>
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

          {tabs[activeTab]?.component === "waiters" ? <CreateUser /> : ""}
        </div>
      </div>
      <div className="w-full px-6">
        {tabs[activeTab]?.component === "waiters" ? <Waiters /> : ""}
      </div>
    </Layout>
  );
}

export default UsersPage;
