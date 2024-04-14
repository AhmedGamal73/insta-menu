import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import { useGetFeaturedRestaurants } from "@/hooks/use-restaurant";
import LoadingScreen from "../ui/loadingScreen";

const RestaurantsSlider = () => {
  const { data: restaurants, isLoading } = useGetFeaturedRestaurants();

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex justify-between items-center pe-2 ps-4">
        <h5>المطاعم</h5>

        <Link
          href="/restaurants"
          className="text-xs flex gap-1 justify-center items-center"
        >
          رؤية الجميع
          <ArrowUpLeft className="w-4 h-4 pt-1" />
        </Link>
      </div>
      <ul className="restaurants w-full flex flex-row  gap-6 overflow-x-scroll ps-2 scrollbar-hide rounded-t-lg mt-[-10]">
        {isLoading ? (
          <LoadingScreen />
        ) : restaurants ? (
          restaurants.map((restaurant, index) => (
            <li
              key={index}
              className="restaurant flex flex-col gap-2  min-w-[250px]"
            >
              <div
                style={{
                  backgroundImage: `url(${restaurant.bgImg})`,
                }}
                className=" bg-cover h-[200px] rounded-2xl relative"
              >
                <div className=" absolute flex justify-center items-center bottom-[-5px] left-[-10px] w-[80px] h-[80px] rounded-e-[18px] rounded-s-[30px] bg-white">
                  <Link
                    className="flex p-4 rounded-[23px] bg-primary text-white"
                    href={`/menu/${restaurant.slug}`}
                  >
                    <ArrowUpLeft />
                  </Link>
                </div>
              </div>
              <div className="px-1 flex justify-between items-center gap-2">
                <h6>مطعم {restaurant.title}</h6>
                <div className="flex gap-1">
                  {restaurant.tags && restaurant.tags.length > 0
                    ? restaurant.tags.map((tag, index) => (
                        <span key={index} className="text-text">
                          {tag}
                        </span>
                      ))
                    : ""}
                </div>
              </div>
            </li>
          ))
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default RestaurantsSlider;
