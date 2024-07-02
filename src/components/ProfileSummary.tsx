import React from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileSummary: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnClick = () => {
    navigate("/mypage");
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 px-6 py-5">
      <div className="text-sm text-gray-800 flex">
        보유 Do money
        <span className=" ml-3 mr-1 text-md">523</span>
        <img
          src="/images/do-money.svg"
          alt="do-money"
          className="w-3 aspect-square text-yellow-400"
        />
        <span className="mx-2">|</span>
        <span className="mr-1">Steve</span> 님
      </div>

      {/* <Link to="/mypage" className="text-sm text-gray-400">
        내역보기{" >"}
      </Link> */}

      {location.pathname === "/" && (
        <div onClick={handleOnClick} className="text-sm text-gray-400">
          내역보기{" >"}
        </div>
      )}
    </div>
  );
};

export default ProfileSummary;
