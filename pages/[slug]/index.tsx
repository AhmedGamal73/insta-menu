import React, { useEffect } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import BranchItem from "@/components/main/BranchItem";
import BranchLayout from "@/components/layouts/TenantLayout";
import { useTenantContext } from "@/context/tenant-context";
import { useGetTenant } from "@/hooks/use-tenant";
import { useGetBranches } from "@/hooks/use-branch";
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
  const { data: tenant, isLoading: tenantLoading } = useGetTenant(initialSlug);
  const { data: branches, isLoading: branchesLoading } = useGetBranches();
  const { setCurrentTenant, currentTenant } = useTenantContext();

  let theme = {
    primary: "",
    secondary: "",
    background: "",
  };
  // Set tenant data when it's loaded
  useEffect(() => {
    if (tenant && !currentTenant) {
      setCurrentTenant(tenant);
      console.log("Tenant loaded:", tenant);
    }

    if (branches) {
      console.log(branches);
    } else {
      console.log("can't find branches");
    }

    if (currentTenant) {
      console.log(currentTenant.businessName);
    } else {
      console.log("tenant not exist");
    }

    if (tenant?.settings) {
      theme = {
        primary: tenant?.settings.theme?.primaryColor,
        secondary: tenant?.settings.theme?.secondaryColor,
        background: tenant?.settings.theme?.backgroundColor,
      };
    } else {
      theme = {
        primary: "#ff6b6b",
        secondary: "#666666",
        background: "#ffffff",
      };
    }
  }, [tenant, setCurrentTenant, currentTenant]);

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
    <BranchLayout title={currentTenant?.businessName}>
      {/* Header Info */}
      <div className="bg-white shadow-sm">
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
    </BranchLayout>
  );
};

export default Branches;
