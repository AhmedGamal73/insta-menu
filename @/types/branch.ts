export interface Branch {
  _id: string;
  name: string;
  description?: string;
  address?: string;
  location?: {
    lat: number;
    lng: number;
  };
  phone?: string;
  openingHours?: {
    open: string;
    close: string;
  };
  isActive?: boolean;
  tenantId: string;
  image?: string;
}
