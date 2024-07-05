import React from "react";
import { Link } from "react-router-dom";

interface IProfileSummary {
  name?: string;
  badge?: string;
  showLink: boolean;
}

const ProfileSummary: React.FC<IProfileSummary> = ({ showLink }) => {
  return (
    <div className="flex justify-between items-center px-6 py-5 xl:p-0 xl:mb-6 bg-gray-100 xl:bg-white text-gray-700">
      <div className="text-sm xl:text-xs text-gray-700 flex">
        보유 Do money
        <span className=" ml-3 xl:ml-2 mr-1 text-md">523</span>
        <img
          src="/images/do-money.svg"
          alt="do-money"
          className="w-3 xl:w-2.5 aspect-square text-yellow-400"
        />
        <span className="mx-2">|</span>
        <span className="mr-1">Steve</span> 님
        <img
          src={`/images/badges/top-green.svg`}
          alt="badge"
          className="w-5 xl:w-4 aspect-square ml-1 -mb-0.5"
        />
      </div>

      {showLink && (
        <Link to="/mypage" className="text-sm text-gray-400 xl:ml-2">
          {" >"}
        </Link>
      )}
    </div>
  );
};

export default ProfileSummary;
