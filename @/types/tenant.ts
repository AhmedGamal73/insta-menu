export interface Tenant {
  businessName: string;
  email: string;
  phone: string;
  slug: string;
  password: string;
  active: boolean;
  logo?: string;
  businessType?: string;
  taxNumber?: string;
  currency: string;
  timezone: string;
  languages: string[];
  contactPerson: {
    name: string;
    phone: string;
    email: string;
    role: string;
  };
  subscriptionPlan?: string;
  subscriptionStatus?: "active" | "expired" | "trial";
  trialEndsAt?: Date;
  settings?: {
    orderNumberPrefix?: string;
    defaultTax?: number;
    allowOnlineOrders: boolean;
    requireAuth: boolean;
    autoAcceptOrders: boolean;
    notificationEmail?: string;
    smsNotifications: boolean;
    waiterAcceptOrders?: boolean;
    theme?: {
      primaryColor?: string;
      secondaryColor?: string;
      accentColor?: string;
      backgroundColor?: string;
      textColor?: string;
      darkMode?: boolean;
    };
  };
}
