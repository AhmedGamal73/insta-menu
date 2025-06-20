"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BranchItemProps } from "@/types/restaurant";
import { useRouter } from "next/router";
import { useTenantContext } from "@/context/tenant-context";
import { ChevronLeft } from "lucide-react";

const BranchItem: React.FC<BranchItemProps> = ({ branch, isLast }) => {
  const router = useRouter();
  const { currentTenant } = useTenantContext();

  const handleNavToBranchMenu = () => {
    const slug = currentTenant.tenant.slug;
    if (!slug) {
      console.error("Tenant slug is not available");
      return;
    }
    router.push(`/${slug}/menu?branchId=${branch._id}`);
  };

  useEffect(() => {
    console.log(currentTenant.tenant.slug);
  }, []);

  return (
    <div
      onClick={handleNavToBranchMenu}
      className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
        !isLast ? "border-b border-gray-100" : ""
      }`}
    >
      {/* Branch Image */}
      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden ml-4 flex-shrink-0">
        <img
          src={branch.image}
          alt={branch.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement!.classList.add("bg-orange-100");
          }}
        />
      </div>

      {/* Branch Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-lg mb-1">
          {branch.title}
        </h3>
        {branch.address && (
          <p className="text-gray-500 text-sm line-clamp-1">{branch.address}</p>
        )}
      </div>

      {/* Navigation Arrow */}
      <div className="mr-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-gray-600"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default BranchItem;
