import React from "react";
import ProfileSummary from "../components/ProfileSummary";
import MenuList from "../components/MenuList";

const MyPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <main className="px-6 xl:container xl:mx-auto">
        {/* xl 이하일 때 보이는 내용 */}
        <div className="block xl:hidden">
          <ProfileSummary showLink={false} />
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
