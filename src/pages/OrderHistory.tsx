import React, { useCallback, useEffect, useState } from "react";
import MyPageLayout from "../components/MyPageLayout";
import { IOrder, ORDER_PRODUCTS } from "../mock";
import { delay } from "../util";
import Pagination from "../components/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import OrderList from "../components/OrderList";
import LoadingSpinner from "../components/LoadingSpinner";

const fetchData = async (page: number): Promise<IOrder[]> => {
  await delay(1000);
  const data = ORDER_PRODUCTS;
  const start = 5 * (page - 1);
  return data.slice(start, start + 5);
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const query = useQuery();

  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<IOrder[] | null>(null);

  useEffect(() => {
    const initialPage = Number(query.get("page")) || 1;
    setPage(initialPage);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    navigate({ search: params.toString() }, { replace: true });
  }, [page, navigate]);

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData(page);
      setData(fetchedData);
    };
    loadData();
  }, [page]);

  const handlePageChange = useCallback(
    (newPage: number) => setPage(newPage),
    []
  );

  const renderContent = () => {
    if (!data) {
      return (
        <div className="w-full flex justify-center mt-36">
          <LoadingSpinner />
        </div>
      );
    }

    return (
      <>
        <OrderList orders={data} />
        <div className="w-full flex justify-center mt-6">
          <Pagination
            totalPages={Math.ceil(ORDER_PRODUCTS.length / 5)}
            handlePageChange={handlePageChange}
          />
        </div>
      </>
    );
  };

  return (
    <div className="min-h-scree">
      <div className="p-6 xl:container xl:mx-auto">
        {/* xl 이하일 때 보이는 내용 */}
        <div className="block xl:hidden">
          <div className="bg-white">
            <h2 className="text-gray-800 text-xl mb-1">주문 내역</h2>
            <p className="text-gray-400 text-xs mb-6">
              최근 주문한 상품 순으로 상품 주문 내역을 볼 수 있어요
            </p>
            <section className="xl:mb-0 bg-white">{renderContent()}</section>
          </div>
        </div>

        {/* xl 이상일 때 보이는 내용 */}
        <div className="hidden xl:flex">
          <MyPageLayout
            title="주문 내역"
            subtitle="최근 주문한 상품 순으로 상품 주문 내역을 볼 수 있어요"
          >
            <section className="xl:mb-0 bg-white xl:w-full">
              {renderContent()}
            </section>
          </MyPageLayout>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
