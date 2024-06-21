import React from "react";
import RankingList from "../components/RankingList";
import ProductList from "../components/ProductList";
import ProfileSummary from "../components/ProfileSummary";

const Home: React.FC = () => {
  const onlineProducts = [
    { id: 1, name: "감자", price: 2300, imageUrl: "/images/potato-image.png" },
    {
      id: 2,
      name: "콩나물",
      price: 2000,
      imageUrl: "/images/product2-image.png",
    },
    {
      id: 3,
      name: "콩나물",
      price: 2000,
      imageUrl: "/images/potato-image.png",
    },
  ];

  const offlineProducts = [
    { id: 1, name: "감자", price: 2300, imageUrl: "/images/potato-image.png" },
    {
      id: 2,
      name: "콩나물",
      price: 2000,
      imageUrl: "/images/product2-image.png",
    },
    {
      id: 3,
      name: "콩나물",
      price: 2000,
      imageUrl: "/images/potato-image.png",
    },
  ];

  return (
    <>
      <ProfileSummary />
      <div className="bg-gray-100">
        <RankingList />
        <ProductList title="온라인 상품" products={onlineProducts} />
        <ProductList title="오프라인 상품" products={offlineProducts} />
      </div>
    </>
  );
};

export default Home;
