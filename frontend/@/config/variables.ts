interface IRestaurantTabs {
  id: number;
  name: string;
  desc: string;
  component: string;
}
interface IVariables {
  curancy: string;
  dashboardTabs: {
    restaurant: IRestaurantTabs[];
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
      },
      {
        id: 1,
        name: "الأقسام",
        desc: "نحن فخورون بتقديم تجربة طعام لا تُنسى تمتزج فيها المأكولات الشهية بالضيافة",
        component: "/sections",
      },
      {
        id: 2,
        name: "النادل",
        desc: "النادل الممتاز هو الروح الحية لتجربة تناول الطعام في أي مطعم. إليك وصف للنادل الممتاز",
        component: "/waiter",
      },
    ],
  },
};

export default variables;
