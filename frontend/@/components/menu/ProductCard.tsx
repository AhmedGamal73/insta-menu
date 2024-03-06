import { useState } from "react";
import Modal from "../Modal";
import ProductPage from "./ProductPage";
import variables from "@/config/variables";

const ProductCard = ({ product, index }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <button
      key={index}
      onClick={() => setModalOpen(true)}
      className="pb-4 flex justify-between items-center border-b border-gray-200 px-4"
    >
      <img src={product.imgURL} className="pe-3 object-cover w-[90px]" alt="" />
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex flex-col gap-2 text-start">
          <h5 className="text-secondary">{product.name}</h5>
          <p>{product.description}</p>
        </div>
        {product.variable && product.sizes && product.sizes.length > 0 ? (
          <div className="flex items-center gap-1">
            <h6>{product.sizes[0].price}</h6>
            <span className="text-xs">{variables.curancy}</span>
          </div>
        ) : product.price && product.salePrice ? (
          <div className="flex items-center gap-1">
            <h6>{product.salePrice}</h6>
            <span className=" text-xs">{variables.curancy}</span>
          </div>
        ) : product.price && !product.salePrice ? (
          <div className="flex items-center gap-1">
            <h6>{product.price}</h6>
            <span className="text-xs">{variables.curancy}</span>
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
