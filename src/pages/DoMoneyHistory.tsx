import React from "react";
import WebPageTemplate from "../components/WebPageTemplate";

const transactions = [
  { id: 1, type: "+", date: "2024.04.14", teacher: "steve", amount: 100 },
  { id: 2, type: "-", date: "2024.04.14", teacher: "steve", amount: 100 },
  { id: 3, type: "+", date: "2024.04.14", teacher: "steve", amount: 100 },
  { id: 4, type: "+", date: "2024.04.14", teacher: "steve", amount: 100 },
  { id: 5, type: "+", date: "2024.04.14", teacher: "steve", amount: 100 },
];

const DoMoneyHistory: React.FC = () => {
  return (
    <div className="">
      <main className="p-6 xl:container xl:mx-auto">
        {/* xl 이하일 때 보이는 내용 */}
        <div className="block xl:hidden">
          <div className="min-h-scree">
            <main className="bg-white">
              <h2 className="text-gray-800 text-xl mb-1">Do money 내역</h2>
              <p className="text-gray-400 text-xs mb-6">
                최근 수령한 Do Money 순으로 내역을 볼 수 있어요
              </p>
              <h3 className="text-gray-800 text-base mb-6">
                현재 내가 보유한 Do money : 1,009
              </h3>
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
            </main>
          </div>
        </div>

        {/* xl 이상일 때 보이는 내용 */}
        <div className="hidden xl:flex">
          <WebPageTemplate
            title="Do Money 내역"
            subtitle="최근 수령한 Do Money 순으로 내역을 볼 수 있어요"
          >
            <p className="text-gray-400 flex items-center justify-center">
              최근 Do Money 내역이 없습니다
            </p>
          </WebPageTemplate>
        </div>
      </main>
    </div>
  );
};

export default DoMoneyHistory;
