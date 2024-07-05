import React from "react";
import MyPageLayout from "../components/MyPageLayout";
import DoMoneyList from "../components/DoMoneyList";

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
              <DoMoneyList transactions={transactions} />
            </main>
          </div>
        </div>

        {/* xl 이상일 때 보이는 내용 */}
        <div className="hidden xl:flex">
          <MyPageLayout
            title="Do Money 내역"
            subtitle="최근 수령한 Do Money 순으로 내역을 볼 수 있어요"
          >
            <p className="text-gray-400 flex items-center justify-center">
              최근 Do Money 내역이 없습니다
            </p>
          </MyPageLayout>
        </div>
      </main>
    </div>
  );
};

export default DoMoneyHistory;
