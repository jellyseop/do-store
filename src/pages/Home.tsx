import React from "react";
import RankingList from "../components/RankingList";
import ProductList from "../components/ProductList";
import ProfileSummary from "../components/ProfileSummary";
import { MRanksSummary, OFFLINE_PRODUCTS, ONLINE_PRODUCTS } from "../mock";

const Home: React.FC = () => {
  return (
    <>
      <div className="xl:hidden">
        <ProfileSummary showLink={true} />
      </div>
      <div className="bg-gray-100">
        <RankingList isSummary={true} ranks={MRanksSummary} />
        <ProductList
          title="온라인 상품"
          desc={"주문하면 학원으로 배송되는 상품"}
          products={ONLINE_PRODUCTS}
        />
        <ProductList
          title="오프라인 상품"
          desc={"학원에서 바로 수령하는 상품"}
          products={OFFLINE_PRODUCTS}
        />
      </div>
    </>
  );
};

export default Home;
