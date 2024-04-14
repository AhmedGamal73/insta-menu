import { Product } from "@/hooks/use-product";
import { Minus, Plus, X } from "lucide-react";
import variables from "@/config/variables";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CartContext } from "@/context/CartContext";
import { toast } from "../ui/use-toast";
import { useGetProductAddons } from "@/hooks/use-addon";
import { Textarea } from "../ui/textarea";

interface productsProps {
  product: Product;
  onClose: () => void;
}

const ProductPage: React.FC<productsProps> = ({ product, onClose }) => {
  const { data: addons } = useGetProductAddons(product._id);

  const [note, setNote] = useState("");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [addonsPrice, setAddonsPrice] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variable && product.variations.options
      ? product.variations.options[0]
      : null
  );
  const [salePrice, setSalePrice] = useState(
    product.variable && product.variations.options[0].salePrice
      ? selectedVariant.salePrice
      : product.variable && product.salePrice
      ? product.salePrice
      : 0
  );
  const [itemNumber, setItemNumber] = useState(1);
  const [price, setPrice] = useState(
    product.variable ? selectedVariant.price : product.price
  );

  const { addItem } = useContext(CartContext);

  // Handle Variants Selection
  const handleVariant = (index: number) => {
    const newVariant = product.variations.options[index];
    setSelectedVariant(newVariant);
    setPrice(product.variable ? selectedVariant.price : product.price);
  };

  const handlePlus = () => {
    const newItemNumber = itemNumber + 1;
    setItemNumber(newItemNumber);
  };
  const handleMinus = () => {
    if (itemNumber === 1) return;
    const newItemNumber = itemNumber - 1;
    setItemNumber(newItemNumber);
  };

  // Add to cart
  const handleAddToCart = () => {
    const item = {
      product: {
        id: product._id,
        name: product.name,
        imgURL: product.imgURL,
        price: price,
        salePrice: salePrice,
        restaurantId: product.restaurantId ? product.restaurantId : null,
      },
      quantity: itemNumber,
      addons: selectedAddons,
      variations: product.variable ? selectedVariant : [],
      total: salePrice
        ? salePrice * itemNumber + addonsPrice
        : price * itemNumber + addonsPrice,
      note: note,
      priceAtTheTime: salePrice,
    };

    addItem(item);
    setTimeout(() => {
      toast({
        description: `تم اضافة ${item.product.name} الى السلة`,
        style: {
          justifyContent: "center",
          backgroundColor: "var(--secondary)",
          borderColor: "transparent",
          color: "white",
        },
      });
    }, 300);
    onClose();
  };

  const handleCheckboxChange = (e, addon) => {
    if (e.target.checked) {
      setSelectedAddons((selectedAddons) => [...selectedAddons, addon]);
      setAddonsPrice(addonsPrice + addon.price);
    } else {
      setSelectedAddons(
        selectedAddons.filter((selectedOne) => selectedOne._id !== addon._id)
      );
      setAddonsPrice(addonsPrice - addon.price);
    }
  };

  useEffect(() => {
    if (product.variable && selectedVariant) {
      setSalePrice(selectedVariant.salePrice);
      setPrice(selectedVariant.price);
    } else {
      setSalePrice(product.salePrice);
      setPrice(product.price);
    }
  }, [selectedVariant, itemNumber, salePrice]);

  useEffect(() => {
    if (product.variable) {
      setSelectedVariant(product.variations.options[0]);
    }
    if (product.variable && product.variations.options[0].salePrice) {
      setSalePrice(product.variations.options[0].salePrice);
    } else {
      setSalePrice(product.salePrice);
    }
  }, []);

  useEffect(() => {
    console.log(selectedAddons);
  }, [selectedAddons]);
  return (
    <div className="flex flex-col gap-8 justify-between relative pb-[4rem]">
      <div className="flex justify-between">
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
        <h1>{product.name}</h1>
        <div className="flex gap-2 justify-between items-center">
          <span>{selectedVariant ? selectedVariant.name : ""}</span>
          <h1 className="text-warning">{price}</h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img src={product.imgURL} className="w-full rounded-lg" />
        <div className="flex flex-col justify-center items-center w-full px-2">
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <div className="flex pt-4 justify-center w-full gap-4 flex-wrap">
              {product.variable &&
                product.variations?.options?.map((option, index) => (
                  <Button
                    className="text-[12px] rounded-lg w-16 h-8"
                    onClick={() => handleVariant(index)}
                    key={index}
                    variant={
                      selectedVariant !== undefined &&
                      selectedVariant !== option
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {option.name}
                  </Button>
                ))}
            </div>
            <div className="w-full items-center flex justify-between px-2">
              <div className="flex gap-4 items-center">
                <Button
                  onClick={() => handlePlus()}
                  variant="outline"
                  className="h-8 w-8 p-2"
                >
                  <Plus />
                </Button>
                {itemNumber}
                <Button
                  onClick={() => handleMinus()}
                  variant="outline"
                  className=" h-8 w-8 p-2"
                >
                  <Minus />
                </Button>
              </div>
              {salePrice ? (
                <div className="flex justify-between items-center gap-2">
                  <span className="text-gray line-through">
                    {price * itemNumber}{" "}
                    <span className="text-xs">{variables.curancy.egp}</span>
                  </span>
                  <h2 className="text-secondary">
                    {salePrice * itemNumber}{" "}
                    <span className="text-xs">{variables.curancy.egp}</span>
                  </h2>
                </div>
              ) : (
                <h2 className="text-secondary">
                  {price * itemNumber}{" "}
                  <span className="text-xs">{variables.curancy.egp}</span>
                </h2>
              )}
            </div>
            <p className="ml-2 pt-8 text-start ali w-full">
              {product.description}
            </p>

            <div className="w-full flex flex-col gap-2 items-start mt-4">
              <h6 className="text-gray-400">قم بإختيار اللإضافات</h6>
              <ul className="flex gap-4 flex-wrap">
                {addons &&
                  addons.map((addon) => (
                    <label
                      key={addon._id}
                      className={
                        selectedAddons?.includes(addon)
                          ? "text-primary bg-secondary text-white text-ms rounded-xl border border-secondary p-2"
                          : "text-gray-400 text-ms rounded-xl border p-2"
                      }
                    >
                      <input
                        className="hidden"
                        type="checkbox"
                        key={addon._id}
                        value={addon._id}
                        checked={selectedAddons?.includes(addon) ? true : false}
                        onChange={(e) => handleCheckboxChange(e, addon)}
                      />
                      <span className="flex gap-2 items-center">
                        {addon.name}
                        {" +" + addon.price + " " + variables.curancy.egp}
                      </span>
                    </label>
                  ))}
              </ul>
            </div>
            <div className="w-full flex flex-col items-start justify-start mt-4 gap-2">
              <h6 className="text-gray-400 text-start">هل لديك اية ملاحظة ؟</h6>
              <Textarea
                placeholder="اكتب ملاحظتك هنا"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={handleAddToCart}
        className="w-5/6 fixed left-1/2 transform -translate-x-1/2 bottom-4"
        variant="secondary"
      >
        اضف للسلة
      </Button>
    </div>
  );
};

export default ProductPage;
