import React from "react";
import SearchBar from "./SearchBar";
import ProfileSummary from "./ProfileSummary";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartState } from "../atmos";

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const cartItems = useRecoilValue(cartState);
  const cartItemcount = cartItems.length;

  return (
    <header className=" sticky top-0 left-0 pt-6 xl:pt-4 px-6 w-full border-b border-gray-200 bg-white ">
      {/*웹 프로필*/}
      <div className="hidden w-full max-w-5xl xl:flex xl:mx-auto justify-end">
        <ProfileSummary showLink={true} />
      </div>
      <div className="w-full xl:max-w-5xl xl:mx-auto flex justify-between items-center mb-4 bg-white">
        <Link to="/">
          <img src="/images/logo.svg" alt="Do store" className="h-10 xl:h-12" />
        </Link>
        {/*웹 검색*/}
        <div className="hidden xl:block xl:w-full xl:max-w-lg xl:mr-20">
          <SearchBar />
        </div>
        <Link to="/cart" className="block">
          <div className="flex flex-row">
            <img
              src="/images/cart-icon.svg"
              alt="Cart"
              className="w-7 aspect-square"
            />
            <span className="flex items-center justify-center w-5 h-5 text-sm text-yellow-300 border-2 border-yellow-300 rounded-full -mt-2">
              {cartItemcount}
            </span>
          </div>
        </Link>
      </div>
      {/*모바일 검색*/}
      {pathname == "/" && (
        <div className="mb-4 xl:hidden">
          <SearchBar />
        </div>
      )}
    </header>
  );
};

export default Header;
