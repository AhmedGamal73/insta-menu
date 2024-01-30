import { Product } from "@/hooks/use-product";
import { Minus, Plus, X } from "lucide-react";
import variables from "@/config/variables";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface productsProps {
  product: Product;
  onClose: () => void;
}

const ProductPage: React.FC<productsProps> = ({ product, onClose }) => {
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
  const [selectedSize, setSelectedSize] = useState(product.variations[0]);
  const [itemNumber, setItemNumber] = useState(1);

  const handleSize = (index: number) => {
    const newSize = product.variations[index];
    setSelectedSize(newSize);
    setPrice(newSize.price);
    setTotalPrice(newSize.price * itemNumber);
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

  useEffect(() => {
    console.log("selectedSize", selectedSize);
  }, [selectedSize]);

  return (
    <div className="flex flex-col gap-8 justify-between relative">
      <div className="flex justify-between">
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
        <h1>{product.name}</h1>
        <h1 className="text-warning">{price}</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img src="/img/products/turkish-coffe.webp" className="w-2/3" />
        <div className="flex flex-col justify-center items-center w-full px-2">
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <div className="flex pt-4 justify-center w-full gap-4 flex-wrap">
              {product.variations.map((size, index) => (
                <Button
                  onClick={() => handleSize(index)}
                  variant={
                    selectedSize !== undefined &&
                    selectedSize.name === size.name
                      ? "secondary"
                      : "outline"
                  }
                >
                  {size.name}
                </Button>
              ))}
            </div>
            <div className="w-full items-center pt-8 flex justify-between px-2">
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
            <p className="ml-2 pt-8 text-start w-full">{product.description}</p>
          </div>
        </div>
      </div>
      <Button
        className="w-4/5 fixed insert-x-0 bottom-4 left-auto right-auto"
        variant="secondary"
      >
        اضف للسلة
      </Button>
    </div>
  );
};

export default ProductPage;
