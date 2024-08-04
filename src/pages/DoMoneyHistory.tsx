import React, { useCallback, useEffect, useState } from "react";
import MyPageLayout from "../components/MyPageLayout";
import DoMoneyList from "../components/DoMoneyList";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import { useRecoilValue } from "recoil";
import { balanceState, recordsState } from "../atmos";
import { IRecord } from "../lib/UserFunction";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const DoMoneyHistory: React.FC = () => {
  const navigate = useNavigate();
  const query = useQuery();

  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<IRecord[] | null>(null);
  const records = useRecoilValue(recordsState);
  const balance = useRecoilValue(balanceState);

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
      const start = 7 * (page - 1);
      const fetchedData = records.slice(start, start + 7);
      setData(fetchedData);
    };
    loadData();
  }, [page, records]);

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
        <DoMoneyList transactions={data} />
        <div className="w-full flex justify-center mt-6">
          <Pagination
            totalPages={Math.ceil(records.length / 7)}
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
          <div className="min-h-scree">
            <div className="bg-white">
              <h2 className="text-gray-800 text-xl mb-1">Do money 내역</h2>
              <p className="text-gray-400 text-xs mb-6">
                최근 수령한 Do Money 순으로 내역을 볼 수 있어요
              </p>
              <h3 className="flex flex-row text-gray-800 text-base mb-6">
                보유 Do money : {balance}
                <img
                  src="/images/do-money.svg"
                  alt="do-money"
                  className="w-4 ml-1"
                />
              </h3>
              <section className="xl:mb-0 bg-white">{renderContent()}</section>
            </div>
          </div>
        </div>

        {/* xl 이상일 때 보이는 내용 */}
        <div className="hidden xl:flex">
          <MyPageLayout
            title="Do Money 내역"
            subtitle="최근 수령한 Do Money 순으로 내역을 볼 수 있어요"
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

export default DoMoneyHistory;
