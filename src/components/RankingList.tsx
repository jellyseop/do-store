import React from "react";
import SectionHeader from "./SectionHeader";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { rankingState } from "../atmos";
import { RankingChild } from "../lib/RankingChild";

const RankingList: React.FC = () => {
  const ranks = useRecoilValue(rankingState);

  const renderRankingChildren = (start: number, end: number) => (
    <>
      {ranks.slice(start, end).map((ranker) => (
        <RankingChild
          key={ranker.rank}
          rank={ranker.rank}
          name={ranker.nameEn}
          balance={ranker.balance}
        />
      ))}
    </>
  );

  const reverseRenderRankingChildren = () => {
    const start = Math.max(0, ranks.length - 3); // 시작 인덱스를 계산
    const end = ranks.length; // 끝 인덱스는 배열의 길이

    return (
      <>
        {ranks.slice(start, end).map((ranker) => (
          <RankingChild
            key={ranker.rank}
            rank={ranker.rank}
            name={ranker.nameEn}
            balance={ranker.balance}
          />
        ))}
      </>
    );
  };

  return (
    <section className="mb-4 xl:mb-0 p-6 xl:py-12 xl:px-0 bg-white xl:bg-transparent ">
      {/*홈 요약*/}

      <>
        {/*모바일 헤더*/}
        <div className="xl:hidden">
          <SectionHeader title="Do money 랭킹" linkTo="ranking" />
        </div>
        {/*웹 헤더*/}
        <div className="hidden xl:block w-full max-w-5xl mx-auto mb-6">
          <h2 className=" text-2xl text-center text-gray-800 tracking-wide">
            Do money 랭킹
          </h2>
          <div className="text-sm text-gray-400 text-end">
            <Link to={"/ranking"}>전체보기{" >"}</Link>
          </div>
        </div>
        {/*모바일 요약 랭킹*/}
        <ul className="mt-2 xl:hidden">{renderRankingChildren(0, 3)}</ul>
        {/*웹 요약 랭킹*/}
        <ul className="hidden xl:flex w-full gap-x-12 max-w-5xl mx-auto bg-white shadow-md p-8 pb-10">
          <div className="flex-1">{renderRankingChildren(0, 3)}</div>
          <div className="flex-1">{reverseRenderRankingChildren()}</div>
        </ul>
      </>
    </section>
  );
};

export default RankingList;
