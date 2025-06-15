import Layout from "./menu/Layout";
import RestaurantsSlider from "@/components/main/RestaurantsSlider";
import { CategoryProductsList } from "@/components/main/CategoryProductList";
import OffersSlider from "@/components/main/OffersSlider";

export default function App(): any {
  return (
    <Layout title="الرئيسية">
      <div dir="rtl" className=" flex flex-col">
        <div className=" bg-gray-100 pt-16">
          <h1 className="px-2 pt-8 pb-16 text-center">
            اهلاً بكم 👋 في مجمع مطاعم
            <span></span>
          </h1>

          <div className="h-3 rounded-t-lg bg-white w-full shadow-top-heavy "></div>
        </div>
        <div className="relative flex flex-col gap-8">
          <div className="flex justify-center items-center top-[-10px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-full absolute w-32 h-14 right-auto ">
            <img
              className="rounded-full w-24 h-24 border border-primary"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-logo-template-design-8e2682fc9eedd6214710cd4e14c79152_screen.jpg?ts=1587811145"
            />
          </div>
          {/* <CategoryProductsList />
          <RestaurantsSlider />
          <OffersSlider /> */}
        </div>
      </div>
    </Layout>
  );
}
