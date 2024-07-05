import React from "react";

interface Transaction {
  id: number;
  type: string;
  date: string;
  teacher: string;
  amount: number;
}

interface DoMoneyListProps {
  transactions: Transaction[];
}

const DoMoneyList: React.FC<DoMoneyListProps> = ({ transactions }) => {
  return (
    <table className="w-full text-center">
      <thead>
        <tr className="text-gray-800 text-sm border-b border-gray-300">
          <th className="py-2 font-normal">구분</th>
          <th className="py-2 font-normal">일시</th>
          <th className="py-2 font-normal">선생님</th>
          <th className="py-2 font-normal">금액</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr
            key={transaction.id}
            className="border-b border-gray-300 h-12 text-sm text-gray-800"
          >
            <td className="py-2">{transaction.type}</td>
            <td className="py-2">{transaction.date}</td>
            <td className="py-2">{transaction.teacher}</td>
            <div className="py-2">
              <td className="flex items-center justify-center pt-1.5">
                {transaction.amount}
                <img
                  src="/images/do-money.svg"
                  alt="do-money"
                  className="w-4 ml-1"
                />
              </td>
            </div>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DoMoneyList;
