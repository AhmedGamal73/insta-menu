import { Category } from "@/hooks/use-category";

const Slider = ({ data, selectedItem, setSelectedItem }) => {
  return (
    <div className="w-full">
      <ul className="ps-4 w-full flex gap-2 overflow-x-scroll scrollbar-hide">
        {data && data.length > 0
          ? data.map((category: Category, i: number) => (
              <button
                key={i}
                className={`${
                  category.name === selectedItem
                    ? " font-bold text-sm transition delay-100 ease-in border-b-2 border-warning"
                    : "color-text text-text text-sm"
                }`}
                onClick={() => setSelectedItem(category.name)}
              >
                <li
                  className={`w-full pb-2 pt-6 border-bborder-b-white hover:border-b-red-500  flex justify-between items-center px-2 whitespace-nowrap`}
                >
                  {category.name}
                </li>
              </button>
            ))
          : "يتم التحميل..."}
      </ul>
    </div>
  );
};

export default Slider;
