import React from "react";
import { IRecord } from "../lib/UserFunction";

interface DoMoneyListProps {
  transactions: IRecord[];
}

const DoMoneyList: React.FC<DoMoneyListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-800 text-lg">최근 Do Money 내역이 없습니다</p>
      </div>
    );
  }

  return (
    <table className="w-full text-center">
      <thead>
        <tr className="text-gray-800 text-sm border-b border-gray-300 ">
          <th className="py-2 font-normal pb-4">구분</th>
          <th className="py-2 font-normal pb-4">일시</th>
          <th className="py-2 font-normal pb-4">선생님</th>
          <th className="py-2 font-normal pb-4">금액</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => {
          const isPositive = transaction.amount >= 0;
          const sign = isPositive ? "+" : "-";
          const absoluteAmount = Math.abs(transaction.amount);

          const formattedDate = new Date(
            transaction.createdAt.seconds * 1000
          ).toLocaleDateString("ko-KR");

          return (
            <tr
              key={transaction.id}
              className="border-b border-gray-300 h-14 text-sm text-gray-800"
            >
              <td className="py-2">{sign}</td>
              <td className="py-2">{formattedDate}</td>
              <td className="py-2">{transaction.createdBy}</td>
              <td className="py-2">
                <div className="flex items-center justify-center pt-2.5">
                  {absoluteAmount}
                  <img
                    src="/images/do-money.svg"
                    alt="do-money"
                    className="w-4 ml-1"
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DoMoneyList;
