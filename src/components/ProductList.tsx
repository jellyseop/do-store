import React from "react";
import SectionHeader from "./SectionHeader";
import { formatMoney } from "../util";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}
interface ProductProps {
  idx: number;
  product: Product;
}

const Product: React.FC<ProductProps> = ({
  idx,
  product: { id, name, price, imageUrl },
}) => {
  return (
    <li
      id={id + ""}
      className="flex items-start py-4 border-b last:border-none last:pb-0 border-gray-200"
    >
      <span className="font-light ml-3">{idx + 1}</span>
      <img
        src={imageUrl}
        alt={name}
        className=" w-20 aspect-square ml-7 mr-3"
      />
      <div className="flex flex-1 flex-col justify-between items-start">
        <span className="tracking-wide text-gray-800">{name}</span>
        <div className="flex">
          <img
            src="/images/coin-icon.svg"
            alt="coin"
            className="w-4 aspect-square mr-0.5"
          />
          <span className="text-xs text-gray-400">{formatMoney(price)}</span>
        </div>

        <div className="w-full flex justify-end mt-4">
          <button className="border border-gray-300 px-2 py-1 text-xs text-gray-700">
            + 장바구니 담기
          </button>
        </div>
      </div>
    </li>
  );
};

interface ProductListProps {
  title: string;
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, products }) => {
  return (
    <section className="p-6 mb-4 bg-white">
      <SectionHeader title={title} linkTo="abc" />
      <ul className="mt-2">
        {products.map((product, idx) => (
          <Product idx={idx} product={product} />
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
