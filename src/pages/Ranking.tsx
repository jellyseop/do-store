import { useCallback, useEffect, useState } from "react";
import PageHeader from "../components/mobile/PageHeader";
import { useLocation, useNavigate } from "react-router-dom";
import RankingList from "../components/RankingList";
import { IRankElem, MRanks, accounts } from "../mock";
import Pagination from "../components/Pagination";
import { delay } from "../util";

const fetchData = async (page: number): Promise<IRankElem[]> => {
  await delay(300);
  const data = MRanks;
  const start = 7 * (page - 1);
  return data.slice(start, start + 7);
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

//fetch ranking data before rendering
const Ranking: React.FC = () => {
  const navigate = useNavigate();
  const query = useQuery();

  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<IRankElem[] | null>(null);

  // Initialize state from URL query parameters
  useEffect(() => {
    const initialPage = Number(query.get("page")) || 1;
    setPage(initialPage);
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
      <PageHeader title="Do money 랭킹" />

      <div className="w-full flex justify-between items-center px-6 text-gray-400">
        <div>
          나의 랭킹:&nbsp;
          <span>18</span>등
        </div>
        <div className="text-sm">
          최근 업데이트 <span>2024-04-13</span>
        </div>
      </div>

      {data ? (
        <RankingList isSummary={false} ranks={data} total={accounts.length} />
      ) : (
        <div>Loading...</div>
      )}
      <div className="w-full flex justify-center mt-8">
        <Pagination
          handlePageChange={handlePageChange}
          totalPages={accounts.length / 7 + 1}
        />
      </div>
    </>
  );
};

export default Ranking;
