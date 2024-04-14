import { useEffect, useState } from "react";
import Modal from "../Modal";
import ProductPage from "./[ProductPage]";
import variables from "@/config/variables";

const ProductCard = ({ product, index, totalProductLength }) => {
  const [price, setPrice] = useState(product.price);
  const [salePrice, setSalePrice] = useState(product.salePrice);

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (product.variable) {
      setPrice(product.variations.options[0].price);
      setSalePrice(product.variations.options[0].salePrice);
    } else {
      setPrice(product.price);
      setSalePrice(product.salePrice);
    }
  }, [product]);
  return (
    <div
      key={index}
      onClick={() => setModalOpen(true)}
      className={`pb-4 flex justify-between items-center  px-4 ${
        index < totalProductLength - 1
          ? "border-dashed border-b border-gray-200"
          : ""
      } `}
    >
      <img
        src={product.imgURL}
        className="pe-3 object-cover w-[90px] rounded-lg"
      />
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex flex-col gap-2 text-start">
          <h5 className="text-secondary">{product.name}</h5>
          <p>{product.description}</p>
        </div>
        {product.variable && salePrice ? (
          <div className="flex items-center gap-1">
            <span className="text-xs font-rubikBold pe-2">
              {product.variations.options[0].name}
            </span>
            <div>
              <div className="flex justify-between">
                <span className="line-through text-text">{price}</span>
                <span className="text-xs">{variables.curancy.egp}</span>
              </div>
              <div className="flex justify-between">
                <h6>{salePrice}</h6>
                <span className="text-xs">{variables.curancy.egp}</span>
              </div>
            </div>
          </div>
        ) : product.variable && salePrice === 0 ? (
          <div className="flex items-center gap-1">
            <span className="text-xs font-rubikBold pe-2">
              {product.variations.options[0].name}
            </span>
            <div className="flex justify-between text-[12px]">
              <h6>{price}</h6>
              <span>{variables.curancy.egp}</span>
            </div>
          </div>
        ) : !product.variable && salePrice > 0 ? (
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
        ) : !product.variable && salePrice === 0 ? (
          <div className="flex items-center gap-1">
            <h6 className="line-through text-text">{price}</h6>
            <span className="text-xs">{variables.curancy.egp}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <ProductPage onClose={() => setModalOpen(false)} product={product} />
        </Modal>
      </div>
    </div>
  );
};

export default ProductCard;
