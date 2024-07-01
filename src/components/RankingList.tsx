import React from "react";
import { formatMoney } from "../util";
import SectionHeader from "./SectionHeader";

const badges = ["top-green", "top-pink", "top-yellow", "dude"];
const medals = ["gold", "silver", "bronze"];

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

const dudes = [
  {
    name: "Emily",
    doMoney: -930,
  },
  {
    name: "Jane",
    doMoney: -1020,
  },
  {
    name: "David",
    doMoney: -2400,
  },
];

const total = 120;

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
    <li className="flex justify-between items-center py-4 border-b last:border-none last:pb-0 border-gray-200">
      <div className="flex items-center">
        <span className="font-light ml-3">{rank + 1}</span>
        {rank < 3 ? (
          <img
            src={`/images/badges/${badges[rank]}.svg`}
            alt="badge"
            className="w-8 aspect-square ml-7 mr-3"
          />
        ) : (
          <img
            src={`/images/badges/${badges[3]}.svg`}
            alt="badge"
            className="w-8 aspect-square ml-7 mr-3"
          />
        )}

        <div className="flex flex-col items-start">
          <span className="text-lg tracking-wide text-gray-800">{name}</span>
          <div className="flex">
            <img
              src="/images/coin-icon.svg"
              alt="coin"
              className="w-4 aspect-square mr-0.5"
            />
            <span className="text-xs text-gray-400">
              {formatMoney(doMoney)}
            </span>
          </div>
        </div>
      </div>
      {rank < 3 && (
        <img
          src={`/images/medals/${medals[rank]}.svg`}
          alt="badge"
          className="w-8 aspect-square ml-7 mr-3"
        />
      )}
    </li>
  );
};

const RankingList: React.FC = () => {
  return (
    <section className="mb-4 xl:mb-0 p-6 xl:py-12 bg-white xl:bg-gray-100">
      <div className="xl:hidden">
        <SectionHeader title="Do money 랭킹" linkTo="abc" />
      </div>
      <div className="hidden xl:block w-full max-w-5xl mx-auto mb-6">
        <h2 className=" text-2xl text-center text-gray-800 tracking-widest">
          두머니 랭킹
        </h2>
        <div id={"linkTo"} className="text-sm text-gray-400 text-end">
          전체보기{" >"}
        </div>
      </div>
      <ul className="mt-2 xl:hidden">
        {rankers.map((ranker, index) => (
          <RankingChild
            rank={index}
            name={ranker.name}
            doMoney={ranker.doMoney}
          />
        ))}
      </ul>
      <ul className="hidden xl:flex w-full gap-x-12 max-w-5xl mx-auto bg-white shadow-md p-8 pb-10">
        <div className="flex-1">
          {rankers.map((ranker, index) => (
            <RankingChild
              rank={index}
              name={ranker.name}
              doMoney={ranker.doMoney}
            />
          ))}
        </div>
        <div className="flex-1">
          {dudes.map((ranker, index) => (
            <RankingChild
              rank={total - 3 + index}
              name={ranker.name}
              doMoney={ranker.doMoney}
            />
          ))}
        </div>
      </ul>
    </section>
  );
};

export default RankingList;
