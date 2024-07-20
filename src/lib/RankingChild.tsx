import { formatMoney } from "../util";

const badges = ["top-green", "top-pink", "top-yellow", "dude"];
const medals = ["gold", "silver", "bronze"];

interface IRankingChildProps {
  rank: number;
  name: string;
  balance: number;
}

export const RankingChild: React.FC<IRankingChildProps> = ({
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
