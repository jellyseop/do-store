import React from "react";
import SectionHeader from "./SectionHeader";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const Product: React.FC<Product> = ({ id, name, price, imageUrl }) => {
  return (
    <li key={id} className="flex justify-between items-center mb-2">
      <img src={imageUrl} alt={name} className="w-16 h-16" />
      <div className="flex-1 ml-4">
        <span className="block font-bold">{name}</span>
        <span className="text-gray-500">{price.toLocaleString()}</span>
      </div>
      <button className="bg-gray-200 p-2 rounded">장바구니 담기</button>
    </li>
  );
};

interface ProductListProps {
  title: string;
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, products }) => {
  return (
    <section className="pt-4 px-6 mb-4 bg-white">
      <SectionHeader title={title} linkTo="abc" />
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="flex justify-between items-center mb-2"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16"
            />
            <div className="flex-1 ml-4">
              <span className="block font-bold">{product.name}</span>
              <span className="text-gray-500">
                {product.price.toLocaleString()}
              </span>
            </div>
            <button className="bg-gray-200 p-2 rounded">장바구니 담기</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
