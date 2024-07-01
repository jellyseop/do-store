import React from "react";
import { formatMoney } from "../util";

const badges = ["top-green", "top-pink", "top-yellow"];

const rankers = [
  {
    name: "Antony",
    doMoney: 6011,
  },
  {
    name: "Sarah",
    doMoney: 3290,
  },
  {
    name: "Steve",
    doMoney: 2900,
  },
];

interface IRankingChildProps {
  rank: number;
  name: string;
  doMoney: number;
}

const RankingChild: React.FC<IRankingChildProps> = ({
  rank,
  name,
  doMoney,
}) => {
  return (
    <li className="flex items-center py-4 border-b last:border-none last:pb-0 border-gray-200">
      <span className="font-light ml-3">{rank + 1}</span>
      <img
        src={`/images/badges/${badges[rank]}.svg`}
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
          <span className="text-xs text-gray-400">{formatMoney(doMoney)}</span>
        </div>
      </div>
    </li>
  );
};

const RankingList: React.FC = () => {
  return (
    <section className="mb-4 p-6 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center text-gray-800">
          <h2 className="text-lg">Do money 랭킹</h2>
          {/* TODO: Link로 교체*/}
          <div className="text-xs text-gray-400">전체보기{" >"}</div>
        </div>
        <button className="text-sm px-3 py-1 rounded-full border border-gray-300 flex items-center">
          높은 순
          <img
            src="/images/arrow-down.svg"
            alt="arrow-down"
            className="w-3 aspect-square ml-2"
          />
        </button>
      </div>
      <ul className="mt-2">
        {rankers.map((ranker, index) => (
          <RankingChild
            rank={index}
            name={ranker.name}
            doMoney={ranker.doMoney}
          />
        ))}
      </ul>
    </section>
  );
};

export default RankingList;
