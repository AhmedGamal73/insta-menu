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
  const { data: addons } = useGetProductAddons(product?._id);

  const [note, setNote] = useState("");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [addonsPrice, setAddonsPrice] = useState(0);
  const [itemNumber, setItemNumber] = useState(1);

  // Safely initialize selectedVariant
  const [selectedVariant, setSelectedVariant] = useState(() => {
    if (product?.variable && product?.variations?.options?.length > 0) {
      return product.variations.options[0];
    }
    return null;
  });

  // Safely initialize price and salePrice
  const [price, setPrice] = useState(() => {
    if (product?.variable && selectedVariant) {
      return selectedVariant.price || 0;
    }
    return product?.price || 0;
  });

  const [salePrice, setSalePrice] = useState(() => {
    if (product?.variable && selectedVariant) {
      return selectedVariant.salePrice || 0;
    }
    return product?.salePrice || 0;
  });

  // Handle Variants Selection
  const handleVariant = (index: number) => {
    if (!product?.variations?.options?.[index]) return;
    const newVariant = product.variations.options[index];
    setSelectedVariant(newVariant);
    setPrice(newVariant?.price || 0);
    setSalePrice(newVariant?.salePrice || 0);
  };

  const handlePlus = () => {
    setItemNumber((prev) => prev + 1);
  };

  const handleMinus = () => {
    if (itemNumber <= 1) return;
    setItemNumber((prev) => prev - 1);
  };

  // Add to cart
  const handleAddToCart = () => {
    if (!product) return;

    const item = {
      product: {
        id: product._id,
        name: product.name,
        imgURL: product.imgURL,
        price: price,
        salePrice: salePrice,
        restaurantId: product.restaurantId || null,
      },
      quantity: itemNumber,
      addons: selectedAddons,
      variations: product.variable ? selectedVariant : [],
      total: (salePrice > 0 ? salePrice : price) * itemNumber + addonsPrice,
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
      setSelectedAddons((prev) => [...prev, addon]);
      setAddonsPrice((prev) => prev + (addon?.price || 0));
    } else {
      setSelectedAddons((prev) =>
        prev.filter((selectedOne) => selectedOne._id !== addon._id)
      );
      setAddonsPrice((prev) => prev - (addon?.price || 0));
    }
  };

  useEffect(() => {
    if (!product?.variable || !selectedVariant) return;

    setPrice(selectedVariant?.price || 0);
    setSalePrice(selectedVariant?.salePrice || 0);
  }, [selectedVariant]);

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 justify-between relative pb-[4rem]">
      <div className="flex justify-between">
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
        <h1>{product.name}</h1>
        <div className="flex gap-2 justify-between items-center">
          <span>{selectedVariant?.name || ""}</span>
          <h1 className="text-warning">{price}</h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img
          src={product.imgURL}
          alt={product.name}
          className="w-full rounded-lg"
        />
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
                      selectedVariant && selectedVariant !== option
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
                  onClick={handlePlus}
                  variant="outline"
                  className="h-8 w-8 p-2"
                >
                  <Plus />
                </Button>
                {itemNumber}
                <Button
                  onClick={handleMinus}
                  variant="outline"
                  className="h-8 w-8 p-2"
                >
                  <Minus />
                </Button>
              </div>
              {salePrice > 0 ? (
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
            <p className="ml-2 pt-8 text-start w-full">{product.description}</p>

            <div className="w-full flex flex-col gap-2 items-start mt-4">
              <h6 className="text-gray-400">قم بإختيار اللإضافات</h6>
              <ul className="flex gap-4 flex-wrap">
                {addons?.map((addon) => (
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
                      checked={selectedAddons?.includes(addon)}
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
        className="w-5/6 fixed left-1/2 transform -translate-x-1/2 bottom-4 rounded-full"
        variant="secondary"
      >
        اضف للسلة
      </Button>
    </div>
  );
};

export default ProductPage;
