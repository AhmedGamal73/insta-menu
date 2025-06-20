export type Tenant = {
  tenant: any;
  _id: string;
  name: string;
  title: string;
  description?: string;
  slug: string;
  logo?: string;
  bgImg?: string;
  currency?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  theme?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
    location?: {
      lat: number;
      lng: number;
    };
  };
  settings?: {
    deliveryEnabled?: boolean;
    pickupEnabled?: boolean;
    dineInEnabled?: boolean;
    reservationEnabled?: boolean;
    orderingEnabled?: boolean;
    paymentMethods?: string[];
    deliveryFee?: number;
    minimumOrder?: number;
    orderingHours?: {
      open: string;
      close: string;
    };
  };
};
