import React, { useState, lazy, Suspense } from "react";
import variables from "@/config/variables";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "../../../@/components/dashboard/layout";
import TablesPage from "./tables";
import SectionsPage from "./sections";
import WaitersPage from "./waiters";

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<string>("sections");
  const tabs = variables.dashboardTabs.restaurant;
  const router = useRouter();

  const handleClick = (target) => {
    setActiveTab(target);
    router.replace(`/dashboard/${target}`);
  };

  return (
    <Layout title={tabs[activeTab]?.name} desc={tabs[activeTab]?.desc}>
      <div className="w-full flex justify-between items-center px-5 border-b-2">
        <div className="flex gap-2 w-1/2">
          <button
            onClick={() => {
              handleClick("sections");
            }}
          >
            الأفسام
            {/* <Link href="/das`hboard/restaurant/sections"> الأفسام</Link> */}
          </button>
          <button
            onClick={() => {
              handleClick("tables");
            }}
          >
            الطاولة
            {/* <Link href="/sections"> الطاولة</Link> */}
          </button>
          <button
            onClick={() => {
              handleClick("waiters");
            }}
          >
            waiters
            {/* <Link href="/sections"> النادل</Link> */}
          </button>
          {/* {tabs.map((tab) => {
            return (
              <button
                key={tab.id}
                className={`rounded-none border-0 py-4 text-text  font-light px-4 text-sm${
                  activeTab === tab.id ? " border-b-4 border-primary" : ""
                } transition-all duration-200 ease-in-out`}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
              >
                {tab.name}
              </button>
            );
          })} */}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-5">
        {/* <Suspense fallback={<div>Loading...</div>}>
          <Content />
        </Suspense> */}
        {activeTab === "tables" && <TablesPage />}
        {activeTab === "sections" && <SectionsPage />}
        {activeTab === "waiters" && <WaitersPage />}
      </div>
    </Layout>
  );
}
