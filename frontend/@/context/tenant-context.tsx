import React, { createContext, useContext } from "react";
import { Tenant } from "@/types/tenant";

interface TenantContextType {
  currentTenant: Tenant | null;
  setCurrentTenant: (tenant: Tenant | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [currentTenant, setCurrentTenant] = React.useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <TenantContext.Provider
      value={{
        currentTenant,
        setCurrentTenant,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export const useTenantContext = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenantContext must be used within a TenantProvider");
  }
  return context;
};
