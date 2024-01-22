interface tabs {
  id: number;
  name: string;
  desc: string;
  component: string;
  path: string;
}

interface IVariables {
  curancy: string;
  dashboardTabs: {
    restaurant: tabs[];
    products: tabs[];
  };
}

const variables: IVariables = {
  curancy: "ج.م",
  dashboardTabs: {
    restaurant: [
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
      {
        id: 2,
        name: "النادل",
        desc: "النادل الممتاز هو الروح الحية لتجربة تناول الطعام في أي مطعم. إليك وصف للنادل الممتاز",
        component: "waiter",
        path: "/waiters",
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
  },
};

export default variables;
