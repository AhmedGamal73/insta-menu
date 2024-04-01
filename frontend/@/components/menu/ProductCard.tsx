import { useEffect, useState } from "react";
import Modal from "../Modal";
import ProductPage from "./[ProductPage]";
import variables from "@/config/variables";
import Link from "next/link";

const ProductCard = ({ product, index, totalProductLength }) => {
  const [price, setPrice] = useState(product.price);
  const [salePrice, setSalePrice] = useState(product.salePrice);

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (
      product.variable &&
      product.variations.options &&
      product.variations.options.length > 0
    ) {
      setPrice(product.variations.options[0].price);
      setPrice(product.variations.options[0].price);
      product.variations.options[0].price,
        product.variations.options[0].salePrice;
    } else {
      setPrice(product.price);
      setSalePrice(product.salePrice);
    }
  });
  return (
    <button
      key={index}
      onClick={() => setModalOpen(true)}
      className={`pb-4 flex justify-between items-center  px-4 ${
        index < totalProductLength - 1
          ? "border-dashed border-b border-gray-200"
          : ""
      } `}
    >
      <img src={product.imgURL} className="pe-3 object-cover w-[90px]" />
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex flex-col gap-2 text-start">
          <h5 className="text-secondary">{product.name}</h5>
          <p>{product.description}</p>
        </div>
        {product.variable &&
        product.variations.options &&
        product.variations.options[0].salePrice > 0 ? (
          <div className="flex items-center gap-1">
            <span className="text-xs font-rubikBold pe-2">
              {product.variations.options[0].name}
            </span>
            <div>
              <div className="flex justify-between">
                <span className="line-through text-text">
                  {product.variations.options[0].price}
                </span>
                <span className="text-xs">{variables.curancy.egp}</span>
              </div>
              <div className="flex justify-between">
                <h6>{product.variations.options[0].salePrice}</h6>
                <span className="text-xs">{variables.curancy.egp}</span>
              </div>
            </div>
          </div>
        ) : product.variable &&
          product.variations.options &&
          product.variations.options[0].salePrice === 0 ? (
          <div className="flex items-center gap-1">
            <span className="text-xs font-rubikBold pe-2">
              {product.variations.options[0].name}
            </span>
            <div className="flex justify-between text-[12px]">
              <h6>{product.variations.options[0].price}</h6>
              <span>{variables.curancy.egp}</span>
            </div>
          </div>
        ) : product.price && product.salePrice > 0 ? (
          <div>
            <div className="flex items-center gap-1">
              <span className="line-through">{product.price}</span>
              <span className="text-xs">{variables.curancy.egp}</span>
            </div>
            <div className="flex items-center gap-1">
              <h6>{product.salePrice}</h6>
              <span className="text-xs">{variables.curancy.egp}</span>
            </div>
          </div>
        ) : product.price && product.salePrice === 0 ? (
          <div className="flex items-center gap-1">
            <h6 className="line-through text-text">{product.price}</h6>
            <span className="text-xs">{variables.curancy.egp}</span>
          </div>
        ) : null}
      </div>
      <div>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <ProductPage onClose={() => setModalOpen(false)} product={product} />
        </Modal>
      </div>
    </button>
  );
};

export default ProductCard;
