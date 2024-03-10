import { Category } from "@/hooks/use-category";

const Slider = ({ data, selectedItem, setSelectedItem }) => {
  return (
    <div className="w-full sticky top-0 py-2 bg-white shadow-sm">
      <ul className="ps-4 w-full flex gap-2 overflow-x-scroll scrollbar-hide">
        <button>
          <li
            className={`w-full py-2 border-b border-b-white hover:border-b-red-500  flex justify-between items-center px-2 whitespace-nowrap`}
          >
            الكل
          </li>
        </button>
        {data && data.length > 0
          ? data.map((category: Category, i: number) => (
              <button
                key={i}
                className={`${
                  category.name === selectedItem
                    ? " font-bold pt-1 text-xs rounded-lg bg-primary text-white transition ease-in-out border-b-2 border-warning"
                    : "color-text text-text bg-bgc rounded-lg px-2 text-xs"
                }`}
                onClick={() => setSelectedItem(category.name)}
              >
                <li
                  className={`w-full py-2 border-bborder-b-white hover:border-b-red-500  flex justify-between items-center px-2 whitespace-nowrap`}
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
