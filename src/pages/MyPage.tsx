import React from "react";
import ProfileSummary from "../components/ProfileSummary";
import MenuList from "../components/MenuList";

const MyPage: React.FC = () => {
  return (
    // <div className="min-h-screen hidden xl:block">
    //   <ProfileSummary/>
    //   <div className="w-full xl:w-3/4 xl:pl-8">
    //     <div className="mt-4">
    //       <h1 className="text-2xl font-bold">마이페이지</h1>
    //       <h2 className="text-xl font-bold">주문 내역</h2>
    //         <p className="text-gray-600">최근 주문한 상품을 손으로 상품 주문 내역을 볼 수 있어요</p>
    //           <div className="border-t mt-4 pt-4">
    //             <p className="text-gray-400">최근 주문 내역이 없습니다</p>
    //           </div>
    //     </div>
    //   </div>
    //   <div className="w-full xl:w-1/4">
    //     <MenuList />
    //   </div>
    // </div>
    <div className="min-h-screen">
      <main className="p-4 xl:container xl:mx-auto">
        {/* xl 이하일 때 보이는 내용 */}
        <div className="block xl:hidden">
          <ProfileSummary />
          <MenuList />
        </div>

        {/* xl 이상일 때 보이는 내용 */}
        <div className="hidden xl:flex">
          <div className="w-full xl:w-3/4 xl:pl-8">
            <div className="mt-4 flex flex-row">
              <div className="w-full xl:w-1/4">
                <h1 className="text-2xl font-bold mb-6">마이페이지</h1>
                <MenuList />
              </div>
              <div className="ml-6">
                <h2 className="text-xl font-bold">마이페이지</h2>
                <p className="text-gray-600"></p>
                <div className="border-t mt-4 pt-4">
                  <p className="text-gray-400"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPage;
