import axios from "axios";
import {
  Dice1,
  HeadphonesIcon,
  HomeIcon,
  PieChart,
  ScrollText,
  Settings,
  Store,
  User,
  Utensils,
} from "lucide-react";

export const API_URL = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

interface tabs {
  id: number;
  name: string;
  desc: string;
  component: string;
  path: string;
}

interface IDashboardMenuItems {
  id: number;
  name: string;
  href: string;
  icon: any;
  active: boolean;
}

interface IVariables {
  curancy: {
    egp: string;
    sar: string;
  };
  ar: {
    orderStatus: {
      Pending: string;
      Processing: string;
      Delivered: string;
      Cancelled: string;
    };
    orderType: {
      Indoor: string;
      Delivery: string;
      Takeaway: string;
    };
  };
  dashboardTabs: {
    restaurant: tabs[];
    products: tabs[];
    orders: tabs[];
    users: tabs[];
    tables: tabs[];
  };
  dashboardMenuItems: IDashboardMenuItems[];
}

const variables: IVariables = {
  curancy: {
    egp: "ج.م",
    sar: "ر.س",
  },
  ar: {
    orderStatus: {
      Pending: "في الإنتظار",
      Processing: "يتم التحضير",
      Delivered: "تم التوصيل",
      Cancelled: "تم الإلفاء",
    },
    orderType: {
      Indoor: "صالة",
      Delivery: "توصيل",
      Takeaway: "استلام",
    },
  },

  dashboardMenuItems: [
    { id: 0, name: "الرئيسية", href: "/", icon: HomeIcon, active: true },
    {
      id: 1,
      name: "المنتجات",
      href: "/dashboard/products",
      icon: Utensils,
      active: true,
    },
    {
      id: 2,
      name: "الطاولات",
      href: "/dashboard/tables",
      icon: Dice1,
      active: true,
    },
    {
      id: 3,
      name: "الطلبات",
      href: "/dashboard/orders",
      icon: ScrollText,
      active: true,
    },
    {
      id: 4,
      name: "المطاعم",
      href: "/dashboard/restaurant",
      icon: Store,
      active: true,
    },
    {
      id: 5,
      name: "المستخدمين",
      href: "/dashboard/users",
      icon: User,
      active: true,
    },
    {
      id: 6,
      name: "الإعدادات",
      href: "/dashboard/settings",
      icon: Settings,
      active: false,
    },
    {
      id: 7,
      name: "الدعم",
      href: "/dashboard/support",
      icon: HeadphonesIcon,
      active: false,
    },
    {
      id: 8,
      name: "تحليل",
      href: "/dashboard/analytics",
      icon: PieChart,
      active: false,
    },
  ],

  dashboardTabs: {
    restaurant: [
      {
        id: 0,
        name: "المطاعم",
        desc: "قسم الطاولات يمكنك من خلاله إضافة وتعديل وحدف الطاولات وتعديل الطاولات المحجزوة، وإنشاء كيو آر كود للطاولات والمزيد",
        component: "restaurants",
        path: "/restaurants",
      },
    ],

    products: [
      {
        id: 0,
        name: "المنتجات",
        desc: "قسم المنتجات يمكنك من خلاله إضافة وتعديل وحدف المنتجات والمزيد",
        component: "products",
        path: "/products",
      },
      {
        id: 1,
        name: "الأصناف",
        desc: "قسم الأصناف يمكنك من خلاله إضافة وتعديل وحدف الأصناف والمزيد",
        component: "categories",
        path: "/categories",
      },
      {
        id: 2,
        name: "الإضافات",
        desc: "قسم الأصناف يمكنك من خلاله إضافة وتعديل وحدف الأصناف والمزيد",
        component: "addons",
        path: "/addons",
      },
    ],

    orders: [
      {
        id: 0,
        name: "الطلبات",
        desc: "قسم الطلبات يمكنك من خلاله إضافة وتعديل وحدف الطلبات والمزيد",
        component: "orders",
        path: "/orders",
      },
    ],

    users: [
      {
        id: 0,
        name: "الكابتن",
        desc: "قسم المستخدمين يمكنك من خلاله إضافة وتعديل وحدف المستخدمين والمزيد",
        component: "waiters",
        path: "/users/waiters",
      },
      {
        id: 1,
        name: "الكاشير",
        desc: "قسم المستخدمين يمكنك من خلاله إضافة وتعديل وحدف المستخدمين والمزيد",
        component: "cashier",
        path: "/users/cashier",
      },
    ],

    tables: [
      {
        id: 0,
        name: "الطاولات",
        desc: "قسم الطاولات يمكنك من خلاله إضافة وتعديل وحدف الطاولات وتعديل الطاولات المحجزوة، وإنشاء كيو آر كود للطاولات والمزيد",
        component: "tables",
        path: "/tables",
      },
      {
        id: 1,
        name: "الأقسام",
        desc: "نحن فخورون بتقديم تجربة طعام لا تُنسى تمتزج فيها المأكولات الشهية بالضيافة",
        component: "sections",
        path: "/sections",
      },
    ],
  },
};
export default variables;
