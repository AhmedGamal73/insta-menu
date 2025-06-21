export interface Branch {
  _id: string;
  title: string;
  slug: string;
  tags: string[];
  bgImg?: string;
  categories?: string[];
  orders?: string[];
  openingHours?: string;
  closingHours?: string;
  phone?: string;
  address:
    | {
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
      }
    | string; // For cases where `address` is just an ID
  location: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  isActive: boolean;
  managerName?: string;
  images: string[];
  createdAt?: string; // ISO date string
  updatedAt?: string;
}
