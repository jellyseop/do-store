import { useCallback, useEffect, useState } from "react";
import PageHeader from "../components/mobile/PageHeader";
import { useLocation, useNavigate } from "react-router-dom";
import RankingList from "../components/RankingList";
import { IRankElem, MRanks, accounts } from "../mock";
import Pagination from "../components/Pagination";
import { delay } from "../util";
import LoadingSpinner from "../components/LoadingSpinner";

const fetchData = async (page: number): Promise<IRankElem[]> => {
  await delay(1000);
  const data = MRanks;
  const start = 7 * (page - 1);
  return data.slice(start, start + 7);
};

//fetch ranking data before rendering
const Ranking: React.FC = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<IRankElem[] | null>(null);

  // Initialize state from URL query parameters
  useEffect(() => {
    const initialPage = Number(query.get("page")) || 1;
    setPage(initialPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update URL query parameters
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    navigate({ search: params.toString() }, { replace: true });
  }, [page, navigate]);

  // Fetch data when order or page changes
  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData(page);
      setData(fetchedData);
    };
    loadData();
  }, [page]);

  // Debounced state change handler to avoid excessive fetch calls

  const handlePageChange = useCallback(
    (newPage: number) => setPage(newPage),
    []
  );

  return (
    <>
      {/*페이지 헤더 */}
      <PageHeader title="Do money 랭킹" />

      <div className="w-full xl:max-w-5xl xl:mx-auto flex justify-between items-center px-6 xl:px-0 text-gray-400">
        <div>
          나의 랭킹:&nbsp;
          <span>18</span>등
        </div>
        <div className="text-sm">
          최근 업데이트 <span>2024-04-13</span>
        </div>
      </div>

      {data ? (
        <>
          <div className="xl:max-w-5xl xl:mx-auto w-full">
            <RankingList isSummary={false} ranks={data} />
            <div className="w-full px-6  xl:px-0">
              <Pagination
                handlePageChange={handlePageChange}
                totalPages={Math.ceil(accounts.length / 7)}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center mt-36 xl:mt-44 ">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};

export default Ranking;
