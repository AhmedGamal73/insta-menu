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

  let defaultPrice = 0;
  if (product.variable && product.variations && product.variations.length > 0) {
    defaultPrice = product.variations[0].price;
  } else if (product.price && product.salePrice) {
    defaultPrice = product.salePrice;
  } else {
    defaultPrice = product.price;
  }
  const [price, setPrice] = useState(defaultPrice);
  const [totalPrice, setTotalPrice] = useState(price);
  // const [selectedVariant, setSelectedVariant] = useState(product.variations[0]);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variations[0] || "empty"
  );
  const [itemNumber, setItemNumber] = useState(1);

  const { addItem } = useContext(CartContext);

  const handleVariant = (index: number) => {
    const newVariant = product.variations[index];
    setSelectedVariant(newVariant);
    setPrice(newVariant.price);
    setTotalPrice(newVariant.price * itemNumber);
  };

  const handlePlus = () => {
    const newItemNumber = itemNumber + 1;
    setItemNumber(newItemNumber);
    setTotalPrice(price * newItemNumber);
  };
  const handleMinus = () => {
    if (itemNumber === 1) return;
    const newItemNumber = itemNumber - 1;
    setItemNumber(newItemNumber);
    setTotalPrice(price * newItemNumber);
  };

  // addon handler
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Add to cart
  const handleAddToCart = () => {
    // if (selectedVariant) {
    const item = {
      itemId: product._id + new Date().getTime(),
      name: product.name,
      priceAtTheTime: price,
      quantity: itemNumber,
      price: totalPrice,
      // variations: selectedVariant.name,
      variations: selectedVariant,
      addons: selectedAddons,
      note: note,
    };

    addItem(item);
    setTimeout(() => {
      toast({
        description: `تم اضافة ${item.name} الى السلة`,
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

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedAddons((selectedAddons) => [...selectedAddons, value]);
    } else {
      setSelectedAddons(selectedAddons.filter((addon) => addon !== value));
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-between relative pb-[4rem]">
      <div className="flex justify-between">
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
        <h1>{product.name}</h1>
        <h1 className="text-warning">{price}</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img src={product.imgURL} className="w-2/3" />
        <div className="flex flex-col justify-center items-center w-full px-2">
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <div className="flex pt-4 justify-center w-full gap-4 flex-wrap">
              {product.variations.map((variant, index) => (
                <Button
                  onClick={() => handleVariant(index)}
                  variant={
                    selectedVariant !== undefined &&
                    // selectedVariant.name === variant.name
                    selectedVariant === variant.name
                      ? "secondary"
                      : "outline"
                  }
                >
                  {variant.name}
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
              <h2 className="text-secondary">
                {totalPrice}{" "}
                <span className="text-xs">{variables.curancy}</span>
              </h2>
            </div>
            <p className="ml-2 pt-8 text-start ali w-full">
              {product.description}
            </p>

            <div className="w-full flex flex-col gap-2 items-start mt-4">
              <h6 className="text-gray-400">
                قم بإختيار {product.addonCategory?.name}
              </h6>
              <ul className="flex gap-4 flex-wrap">
                {addons &&
                  addons.map((addon) => (
                    <label
                      className={
                        selectedAddons?.includes(addon._id)
                          ? "text-primary bg-secondary text-white text-ms rounded-xl border border-secondary p-2"
                          : "text-gray-400 text-ms rounded-xl border p-2"
                      }
                    >
                      <input
                        className="hidden"
                        type="checkbox"
                        key={addon._id}
                        value={addon._id}
                        checked={
                          selectedAddons?.includes(addon._id) ? true : false
                        }
                        onChange={handleCheckboxChange}
                      />
                      <span>{addon.name}</span>
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
