import { Restaurant } from "@/hooks/use-restaurant";
import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

const RestaurantCard = ({ restaurant, key, halfWidth = false }) => {
  return (
    <li
      key={key}
      className={`restaurant flex flex-col gap-2 ${
        halfWidth ? "min-w-1/2" : "min-w-[250px]"
      }`}
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
            <ArrowUpLeft className="w-5 h-5 text-white" />
          </Link>
        </div>
      </div>
      <div className="px-1 flex justify-between items-center gap-3">
        <h6 className="w-1/2">مطعم {restaurant.title}</h6>
        <div className="w-1/2 flex gap-1">
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
  );
};

export default RestaurantCard;
