import { ArrowUpLeft, Clock, Heart } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

import { useGetOfferProducts } from "@/hooks/use-product";
import LoadingScreen from "../ui/loadingScreen";
import { useEffect, useState } from "react";
import { useGetCustomer } from "@/hooks/use-customer";

const OffersSlider = () => {
  const [liked, setLiked] = useState(false);

  const customerToken = Cookies.get("customerToken");
  const decodedToken = jwt.decode(customerToken);
  const customerId = decodedToken?.userId;

  const { data: products, isLoading } = useGetOfferProducts();
  const { data: customer, isLoading: customerIsLoading } =
    useGetCustomer(customerId);

  useEffect(() => {}, []);
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex justify-between items-center pe-2 ps-4">
        <h5>العروض</h5>

        <Link
          href="/products"
          className="text-xs flex gap-1 justify-center items-center"
        >
          رؤية الجميع
          <ArrowUpLeft className="w-4 h-4 pt-1" />
        </Link>
      </div>
      <ul className="products w-full flex flex-row  gap-6 overflow-x-scroll ps-2 scrollbar-hide rounded-t-lg mt-[-10] pb-32">
        {isLoading ? (
          <LoadingScreen />
        ) : products ? (
          products.map((product, index) => (
            <li
              key={index}
              className="product flex flex-col bg-center gap-2 min-w-[300px] shadow-md p-2 pb-4 rounded-2xl"
            >
              <div
                style={{
                  backgroundImage: `url(${product.imgURL})`,
                }}
                className=" bg-cover h-[200px] rounded-2xl relative"
              >
                <div className="w-full bg-black/30 h-[200px] rounded-2xl">
                  <button
                    onClick={() => {
                      setLiked(!liked);
                    }}
                    className="w-full p-2 flex justify-between items-center"
                  >
                    {!liked ? (
                      <Heart className="bg-white text-black w-8 h-8 rounded-full p-2" />
                    ) : (
                      <Heart className="bg-white text-red-500 w-8 h-8 rounded-full p-2" />
                    )}
                  </button>
                </div>
              </div>
              <div className="px-2 flex flex-col justify-start items-start gap-3 rounded-b-2xl">
                <div className="w-full flex justify-between items-center gap-2">
                  <h6 className="w-1/2">عرض {product.name}</h6>
                  <span className="w-1/2 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    10-20 دقيقة
                  </span>
                </div>
                <div className="flex gap-2">
                  {product.tags && product.tags.length > 0
                    ? product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="w-full text-text after:content['-']"
                        >
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

export default OffersSlider;
