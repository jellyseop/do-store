import { useCallback, useEffect, useState } from "react";
import PageHeader from "../components/mobile/PageHeader";
import { useLocation, useNavigate } from "react-router-dom";
import RankingList from "../components/RankingList";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import { useRecoilValue } from "recoil";
import { rankingIdState } from "../atmos";
import { IRanking } from "../lib/Ranking-service";

//fetch ranking data before rendering
const Ranking: React.FC = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  const rankingId = useRecoilValue(rankingIdState);
  //if rankingId is not provided, redirect to home page

  const { rankings } = useRecoilValue(rankingIdState);

  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<IRanking[]>(rankings.slice(0, 3));

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
          최근 업데이트 <span>{rankingId.id}</span>
        </div>
      </div>

      {data ? (
        <>
          <div className="xl:max-w-5xl xl:mx-auto w-full">
            <RankingList isSummary={false} />
            <div className="w-full px-6  xl:px-0">
              <Pagination
                handlePageChange={handlePageChange}
                totalPages={Math.ceil(rankings.length / 3)}
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
