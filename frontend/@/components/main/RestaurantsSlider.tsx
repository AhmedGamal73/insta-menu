import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import { useGetFeaturedRestaurants } from "@/hooks/use-restaurant";
import LoadingScreen from "../ui/loadingScreen";
import RestaurantCard from "./restaurants/RestaurantCard";

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
      <ul className="restaurants w-full flex flex-row gap-6 overflow-x-scroll ps-2 scrollbar-hide rounded-t-lg mt-[-10]">
        {isLoading ? (
          <LoadingScreen />
        ) : restaurants ? (
          restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default RestaurantsSlider;
