import React from "react";
import ProfileSummary from "../components/ProfileSummary";
import MenuList from "../components/MenuList";

const MyPage: React.FC = () => {
  return (
    <div className="">
      <ProfileSummary/>
      <MenuList />
    </div>
  );
};

export default MyPage;
