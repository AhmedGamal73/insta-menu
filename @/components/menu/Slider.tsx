import { Category } from "@/types/category";

const Slider = ({ data = [], selectedItem, setSelectedItem }) => {
  const allOption = { _id: "all", name: "الجميع" };
  const categories = [allOption, ...data];

  return (
    <div className="w-full sticky top-0 py-2 bg-white shadow-sm z-999">
      <ul className="ps-4 w-full flex gap-2 overflow-x-scroll scrollbar-hide">
        {categories && categories.length > 0
          ? categories.map((category: Category, i: number) => (
              <li
                key={i}
                className={`py-2 px-2 ${
                  category._id === selectedItem
                    ? " font-bold text-xs rounded-lg bg-primary text-white transition ease-in-out border-b-2 border-warning"
                    : "color-text text-text bg-bgc rounded-lg text-xs"
                }`}
                onClick={() => setSelectedItem(category._id)}
              >
                {category.name}
              </li>
            ))
          : "يتم التحميل..."}
      </ul>
    </div>
  );
};

export default Slider;
