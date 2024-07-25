import { useCallback, useEffect, useState } from "react";
import PageHeader from "../components/mobile/PageHeader";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import { useRecoilValue } from "recoil";
import { rankingIdState, studentDataState } from "../atmos";
import { RankingChild } from "../lib/RankingChild";

//fetch ranking data before rendering
const Ranking: React.FC = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  const rankingId = useRecoilValue(rankingIdState);
  const { rankings } = useRecoilValue(rankingIdState);

  const studentData = useRecoilValue(studentDataState);
  const [myRank, setMyRank] = useState<number | null>(null);

  //if rankingId is not provided, redirect to home page

  if (!rankingId || !rankingId.id) {
    return <Navigate to="/" replace />;
  }

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (!studentData) {
      return;
    }

    const match = rankings.find((ranker) => {
      return (
        ranker.nameKo === studentData.nameKo &&
        ranker.nameEn === studentData.nameEn
      );
    });

    if (match) {
      setMyRank(match.rank);
    }
  }, [studentData, rankings]);

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

  const itemsPerPage = 7;
  const totalPages = Math.ceil(rankings.length / itemsPerPage);

  const renderRankingChildren = (start: number, end: number) => (
    <>
      {rankings.slice(start, end).map((ranker) => (
        <RankingChild
          key={ranker.rank}
          rank={ranker.rank}
          name={ranker.nameEn}
          balance={ranker.balance}
        />
      ))}
    </>
  );

  return (
    <>
      {/*페이지 헤더 */}
      <PageHeader title="Do money 랭킹" />

      <div className="w-full xl:max-w-5xl xl:mx-auto flex justify-between items-center px-6 xl:px-0 text-gray-400">
        <div>
          {myRank !== null ? (
            <>
              나의 랭킹:&nbsp;
              <span>{myRank}</span>등
            </>
          ) : (
            <span></span>
          )}
        </div>
        <div className="text-sm">
          최근 업데이트 <span>{rankingId.id}</span>
        </div>
      </div>

      {rankings ? (
        <>
          <div className="xl:max-w-5xl xl:mx-auto w-full">
            <ul className=" mt-2">
              {renderRankingChildren(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
              )}
            </ul>
            <div className="w-full px-6 mt-6  xl:px-0">
              <Pagination
                handlePageChange={handlePageChange}
                totalPages={totalPages}
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
