import React from "react";
import WebPageTemplate from "../components/WebPageTemplate";
import ProductList from "../components/ProductList";

const OrderHistory: React.FC = () => {
  const orderProducts = [
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
    <div className="">
      <main className="p-6 xl:container xl:mx-auto">
        {/* xl 이하일 때 보이는 내용 */}
        <div className="block xl:hidden">
          <div className="min-h-scree">
            <main className="bg-white">
              <h2 className="text-gray-800 text-xl mb-1">주문 내역</h2>
              <p className="text-gray-400 text-xs mb-6">
                최근 주문한 상품 순으로 상품 주문 내역을 볼 수 있어요
              </p>
              <ProductList title="" desc={""} products={orderProducts} />
              <table className="w-full text-center">
                <thead></thead>
                <tbody></tbody>
              </table>
            </main>
          </div>
        </div>

        {/* xl 이상일 때 보이는 내용 */}
        <div className="hidden xl:flex">
          <WebPageTemplate
            title="Do Money 내역"
            subtitle="최근 수령한 Do Money 순으로 내역을 볼 수 있어요"
          >
            <p className="text-gray-400 flex items-center justify-center">
              최근 Do Money 내역이 없습니다
            </p>
          </WebPageTemplate>
        </div>
      </main>
    </div>
  );
};

export default OrderHistory;
