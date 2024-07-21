import React from "react";
import ProductPage from "./ProductPage";
import useProductData from "../hooks/useProductData";

const OnlineProducts: React.FC = () => {
  const {
    data,
    totalCounts,
    totalPages,
    productOrder,
    handlePageChange,
    handleProductOrderChange,
  } = useProductData(1);

  return (
    <ProductPage
      title="전체 온라인 상품"
      data={data}
      totalCounts={totalCounts}
      totalPages={totalPages}
      productOrder={productOrder}
      handlePageChange={handlePageChange}
      handleProductOrderChange={handleProductOrderChange}
    />
  );
};

export default OnlineProducts;
