import React from "react";
import RankingList from "../components/RankingList";
import ProductList from "../components/ProductList";
import ProfileSummary from "../components/ProfileSummary";

const Home: React.FC = () => {
  const onlineProducts = [
    { id: 1, name: "감자", price: 2300, imageUrl: "/images/choco.jpeg" },
    {
      id: 2,
      name: "콩나물",
      price: 2000,
      imageUrl: "/images/case.jpeg",
    },
    {
      id: 3,
      name: "콩나물",
      price: 2000,
      imageUrl: "/images/toy.jpeg",
    },
    { id: 4, name: "감자", price: 2300, imageUrl: "/images/candy.jpeg" },
  ];

  const offlineProducts = [
    { id: 1, name: "감자", price: 2300, imageUrl: "/images/choco.jpeg" },
    {
      id: 2,
      name: "콩나물",
      price: 2000,
      imageUrl: "/images/case.jpeg",
    },
    {
      id: 3,
      name: "콩나물",
      price: 2000,
      imageUrl: "/images/toy.jpeg",
    },
    { id: 4, name: "감자", price: 2300, imageUrl: "/images/candy.jpeg" },
  ];

  return (
    <>
      <div className="xl:hidden">
        <ProfileSummary />
      </div>
      <div className="bg-gray-100">
        <RankingList />
        <ProductList
          title="온라인 상품"
          desc={"주문하면 학원으로 배송되는 상품"}
          products={onlineProducts}
        />
        <ProductList
          title="오프라인 상품"
          desc={"학원에서 바로 수령하는 상품"}
          products={offlineProducts}
        />
      </div>
    </>
  );
};

export default Home;
