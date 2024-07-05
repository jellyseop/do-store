import React from "react";
import SectionHeader from "./SectionHeader";
import { formatMoney } from "../util";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}
export interface ProductProps {
  idx: number;
  product: IProduct;
}

const Product: React.FC<ProductProps> = ({
  idx,
  product: { id, name, price, imageUrl },
}) => {
  return (
    <>
      {/*모바일 아이템*/}
      <li
        id={id + ""}
        className="xl:hidden flex items-start py-4 border-b last:border-none last:pb-0 border-gray-200"
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
      {/*웹 아이템*/}
      <li
        id={id + ""}
        className="hidden w-full xl:flex xl:flex-col items-start hover:border border-gray-200 px-2 py-3"
      >
        <img src={imageUrl} alt={name} className="w-full aspect-square" />
        <button className="w-full flex justify-center items-center border border-gray-300 mt-2  py-1 text-gray-600 hover:bg-yellow-300">
          <img
            src={"/images/add-to-cart.svg"}
            alt={"add-to-cart"}
            className="w-7 aspect-square mr-2"
          />
          담기
        </button>
        <div className="flex flex-col w-full mt-2">
          <span className="tracking-wide text-gray-600 font-light">{name}</span>
          <div className="flex mt-2">
            <img
              src="/images/do-money.svg"
              alt="coin"
              className="w-4 aspect-square mr-0.5"
            />
            <span className="text-xl font-medium text-gray-800">
              &nbsp;{formatMoney(price)}
            </span>
          </div>
        </div>
      </li>
    </>
  );
};

interface ProductListProps {
  title: string;
  desc: string;
  products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ title, desc, products }) => {
  return (
    <section className="p-6 mb-4 xl:mb-0 bg-white">
      <SectionHeader
        title={title}
        desc={desc}
        linkTo={
          title == "온라인 상품" ? "/products/online" : "/products/offline"
        }
      />
      {/*모바일 리스트*/}
      <ul className="xl:hidden mt-2">
        {products.map((product, idx) => (
          <Product key={idx} idx={idx} product={product} />
        ))}
      </ul>
      {/*웹 리스트*/}
      <ul className="hidden xl:grid grid-cols-4 gap-x-4 w-full max-w-5xl mx-auto mt-2 pb-6">
        {products.map((product, idx) => (
          <Product key={idx} idx={idx} product={product} />
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
