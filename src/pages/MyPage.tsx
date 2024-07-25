import React from "react";
import ProfileSummary from "../components/ProfileSummary";
import MenuList from "../components/MenuList";
import MyPageLayout from "../components/MyPageLayout";

const MyPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="p-6 xl:container xl:mx-auto">
        {/* xl 이하일 때 보이는 내용 */}
        <div className="block xl:hidden">
          <ProfileSummary showLink={true} />
          <MenuList />
        </div>

        {/* xl 이상일 때 보이는 내용 */}
        <div className="hidden xl:flex">
          <MyPageLayout title="마이페이지" subtitle=""></MyPageLayout>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
