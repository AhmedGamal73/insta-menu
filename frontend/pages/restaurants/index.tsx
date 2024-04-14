import LoadingScreen from "@/components/ui/loadingScreen";
import { Restaurant, useGetRestaurants } from "@/hooks/use-restaurant";
import Layout from "pages/menu/Layout";
import RestaurantCard from "@/components/main/restaurants/RestaurantCard";

const RestaurantsPage = () => {
  const { data: restaurants, isLoading } = useGetRestaurants();
  return (
    <Layout title="المطاعم">
      <div className="flex flex-col gap-10 p-2 pt-20">
        <h1 className="w-full text-center">المطاعم المتوفرة</h1>
        <ul className="w-full flex px-2 gap-4 justify-between items-center">
          {isLoading ? (
            <LoadingScreen />
          ) : restaurants ? (
            restaurants.map((restaurant: Restaurant, index: number) => (
              <RestaurantCard
                halfWidth={true}
                key={index}
                restaurant={restaurant}
              />
            ))
          ) : (
            ""
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default RestaurantsPage;
