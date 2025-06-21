export type Item = {
  _id: string;
  name: string;
  clickId: string;
  restaurantId: string[];
  price: number;
  salePrice: number;
  description: string;
  variable: boolean;
  imgURL: string;
  calories: number;
  rating: number;
  active: boolean;
  featured: boolean;
  isOffered: boolean;
  createdAt: string;
  __v: number;

  variations: {
    options: any[]; // You can replace `any` with a specific type if options have a defined structure
  };

  addonCategory: {
    id: string;
    name: string;
  };

  category: {
    _id: string;
    name: string;
  };

  ingredients: any[]; // Replace `any` with actual ingredient structure if defined
  addons: any[]; // Replace `any` if your addons array has a defined structure
};

export interface Addon {
  _id?: string;
  name: string;
  price: number;
  addonCategoryId: string;
}

export interface AddonCategory {
  name: string;
}
