import { useEffect, useState } from "react";
import Modal from "../Modal";
import ProductPage from "./[ProductPage]";
import variables from "@/config/variables";

const ProductCard = ({ product, index, totalProductLength }) => {
  const [price, setPrice] = useState(product?.price || 0);
  const [salePrice, setSalePrice] = useState(product?.salePrice || 0);

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (product?.variable && product?.variations?.options?.length > 0) {
      const firstOption = product.variations.options[0];
      setPrice(firstOption?.price || 0);
      setSalePrice(firstOption?.salePrice || 0);
    } else {
      setPrice(product?.price || 0);
      setSalePrice(product?.salePrice || 0);
    }
  }, [product]);

  if (!product) {
    return null;
  }

  const renderPricing = () => {
    if (product.variable && product.variations?.options?.length > 0) {
      const firstOption = product.variations.options[0];
      if (firstOption.salePrice > 0) {
        return (
          <div className="flex items-center gap-1">
            <span className="text-xs font-rubikBold pe-2">
              {firstOption.name}
            </span>
            <div>
              <div className="flex justify-between">
                <span className="line-through text-text">
                  {firstOption.price}
                </span>
                <span className="text-xs">{variables.curancy.egp}</span>
              </div>
              <div className="flex justify-between">
                <h6>{firstOption.salePrice}</h6>
                <span className="text-xs">{variables.curancy.egp}</span>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-1">
          <span className="text-xs font-rubikBold pe-2">
            {firstOption.name}
          </span>
          <div className="flex justify-between text-[12px]">
            <h6>{firstOption.price}</h6>
            <span>{variables.curancy.egp}</span>
          </div>
        </div>
      );
    }

    // For non-variable products
    if (salePrice > 0) {
      return (
        <div>
          <div className="flex items-center gap-1">
            <span className="line-through">{price}</span>
            <span className="text-xs">{variables.curancy.egp}</span>
          </div>
          <div className="flex items-center gap-1">
            <h6>{salePrice}</h6>
            <span className="text-xs">{variables.curancy.egp}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1">
        <h6>{price}</h6>
        <span className="text-xs">{variables.curancy.egp}</span>
      </div>
    );
  };

  return (
    <div
      key={index}
      onClick={() => setModalOpen(true)}
      className={`pb-4 flex justify-between items-center px-4 ${
        index < totalProductLength - 1
          ? "border-dashed border-b border-gray-200"
          : ""
      } `}
    >
      <img
        src={product.imgURL}
        alt={product.name}
        className="pe-3 object-cover w-[90px] h-[90px] rounded-lg"
      />
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex flex-col gap-2 text-start">
          <h5 className="text-secondary">{product.name}</h5>
          <p className="text-sm text-gray-600">{product.description}</p>
        </div>
        {renderPricing()}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ProductPage onClose={() => setModalOpen(false)} product={product} />
      </Modal>
    </div>
  );
};

export default ProductCard;
