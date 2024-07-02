import React from "react";

const transactions = [
  { id: 1, type: "+", date: "2024.04.14", teacher: "steve", amount: 100 },
  { id: 2, type: "-", date: "2024.04.14", teacher: "steve", amount: 100 },
  { id: 3, type: "+", date: "2024.04.14", teacher: "steve", amount: 100 },
  { id: 4, type: "+", date: "2024.04.14", teacher: "steve", amount: 100 },
  { id: 5, type: "+", date: "2024.04.14", teacher: "steve", amount: 100 },
];

const DoMoneyHistory: React.FC = () => {
  return (
    <div className="min-h-screen">
      <main className="p-6 xl:container xl:mx-auto">
        {/* xl 이하일 때 보이는 내용 */}
        <div className="block xl:hidden">
          <div className="min-h-scree">
            <main className="bg-white">
              <h2 className="text-gray-800 text-xl mb-1">Do money 내역</h2>
              <p className="text-gray-400 text-xs mb-6">
                최근 주문한 상품 순으로 상품 주문 내역을 볼 수 있어요
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
                      className="border-b border-gray-300 h-12 text-xs"
                    >
                      <td className="py-2">{transaction.type}</td>
                      <td className="py-2">{transaction.date}</td>
                      <td className="py-2">{transaction.teacher}</td>
                      <td className="py-2 flex items-center justify-center">
                        {transaction.amount}
                        <img
                          src="/images/do-money.svg"
                          alt="do-money"
                          className="w-3 ml-1"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </main>
          </div>
        </div>

        {/* xl 이상일 때 보이는 내용 */}
        <div className="hidden xl:flex"></div>
      </main>
    </div>
  );
};

export default DoMoneyHistory;
