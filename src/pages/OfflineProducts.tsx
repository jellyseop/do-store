import React from "react";
import ProductPage from "./ProductPage";
import useProductData from "../hooks/useProductData";

const OnlineProducts: React.FC = () => {
  const { data, productOrder, handlePageChange, handleProductOrderChange } =
    useProductData(1);

  return (
    <ProductPage
      title="전체 오프라인 상품"
      data={data}
      productOrder={productOrder}
      handlePageChange={handlePageChange}
      handleProductOrderChange={handleProductOrderChange}
    />
  );
};

export default OnlineProducts;
