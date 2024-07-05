import React from "react";
import { formatMoney } from "../util";
import SectionHeader from "./SectionHeader";
import { IRankElem } from "../mock";
import { Link } from "react-router-dom";

const badges = ["top-green", "top-pink", "top-yellow", "dude"];
const medals = ["gold", "silver", "bronze"];

interface IRankingChildProps {
  rank: number;
  name: string;
  balance: number;
}

const RankingChild: React.FC<IRankingChildProps> = ({
  rank,
  name,
  balance,
}) => {
  const badgeIdx = balance < 0 ? 3 : rank < 4 ? rank - 1 : 2;
  return (
    <li className="flex justify-between items-center py-4 border-b last:border-none last:pb-0 border-gray-200">
      <div className="flex items-center">
        <span className="font-light ml-3">{rank}</span>

        <img
          src={`/images/badges/${badges[badgeIdx]}.svg`}
          alt="badge"
          className="w-8 aspect-square ml-7 mr-3"
        />

        <div className="flex flex-col items-start">
          <span className="text-lg tracking-wide text-gray-800">{name}</span>
          <div className="flex">
            <img
              src="/images/coin-icon.svg"
              alt="coin"
              className="w-4 aspect-square mr-0.5"
            />
            <span className="text-xs text-gray-400">
              {formatMoney(balance)}
            </span>
          </div>
        </div>
      </div>
      {rank < 4 && (
        <img
          src={`/images/medals/${medals[rank - 1]}.svg`}
          alt="badge"
          className="w-8 aspect-square ml-7 mr-3"
        />
      )}
    </li>
  );
};

interface IRank extends IRankElem {}

interface IRankingList {
  isSummary: boolean;
  ranks: IRank[];
}

const RankingList: React.FC<IRankingList> = ({ isSummary, ranks }) => {
  return (
    <section className="mb-4 xl:mb-0 p-6 xl:py-12 xl:px-0 bg-white xl:bg-transparent ">
      {/*홈 요약*/}
      {isSummary ? (
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
          <ul className="mt-2 xl:hidden">
            {ranks.slice(0, 3).map((ranker) => (
              <RankingChild
                key={ranker.id}
                rank={ranker.rank}
                name={ranker.name}
                balance={ranker.balance}
              />
            ))}
          </ul>
          {/*웹 요약 랭킹*/}
          <ul className="hidden xl:flex w-full gap-x-12 max-w-5xl mx-auto bg-white shadow-md p-8 pb-10">
            <div className="flex-1">
              {ranks.slice(0, 3).map((ranker) => (
                <RankingChild
                  key={ranker.id}
                  rank={ranker.rank}
                  name={ranker.name}
                  balance={ranker.balance}
                />
              ))}
            </div>
            <div className="flex-1">
              {ranks.slice(3, 6).map((ranker) => (
                <RankingChild
                  key={ranker.id}
                  rank={ranker.rank}
                  name={ranker.name}
                  balance={ranker.balance}
                />
              ))}
            </div>
          </ul>
        </>
      ) : (
        /*랭킹 페이지 전체 랭킹*/

        <>
          <ul className=" mt-2">
            {ranks.map((ranker) => (
              <RankingChild
                key={ranker.id}
                rank={ranker.rank}
                name={ranker.name}
                balance={ranker.balance}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default RankingList;
