"use client";

import React, { useEffect } from "react";
import { MapPin, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BranchItem from "@/components/main/BranchItem";
import { useTenantContext } from "@/context/tenant-context";
import { useRouter } from "next/router";
import { useTenant } from "@/hooks/use-tenant";
import { useGetBranchesBySlug } from "@/hooks/use-branch";
import { GetServerSideProps } from "next";

interface BranchesProps {
  initialSlug: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params || {};

  if (!slug) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialSlug: slug,
    },
  };
};

const Branches: React.FC<BranchesProps> = ({ initialSlug }) => {
  const router = useRouter();
  const { data: tenant, isLoading: tenantLoading } = useTenant(initialSlug);
  const { data: branches, isLoading: branchesLoading } =
    useGetBranchesBySlug(initialSlug);
  const { setCurrentTenant, currentTenant } = useTenantContext();

  // Set tenant data when it's loaded
  useEffect(() => {
    if (tenant && !currentTenant) {
      setCurrentTenant(tenant);
      console.log("Tenant loaded:", tenant);
    }
  }, [tenant, setCurrentTenant, currentTenant]);

  const theme = {
    primary: tenant?.theme?.primary || "#ff6b6b",
    secondary: tenant?.theme?.secondary || "#666666",
    background: tenant?.theme?.background || "#ffffff",
  };

  if (tenantLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Tenant not found for slug: {initialSlug}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" className="text-gray-600">
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="text-2xl font-bold" style={{ color: theme.primary }}>
            {tenant.name}
          </div>

          <Button
            size="icon"
            className="text-white rounded-full"
            style={{ backgroundColor: theme.primary }}
          >
            <MapPin className="h-5 w-5" />
          </Button>
        </div>

        {/* Map placeholder */}
        <div className="h-32 bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-300"></div>
          <div className="absolute top-4 left-4">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: theme.primary }}
            ></div>
          </div>
        </div>
      </div>

      {/* Branches List */}
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm">
        {branches?.map((branch, index) => (
          <BranchItem
            key={branch._id}
            branch={branch}
            isLast={index === (branches?.length || 0) - 1}
          />
        ))}
        {(!branches || branches.length === 0) && (
          <div className="p-4 text-center text-gray-500">No branches found</div>
        )}
      </div>
    </div>
  );
};

export default Branches;
