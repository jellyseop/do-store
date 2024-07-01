import React from "react";
import SearchBar from "./SearchBar";
import ProfileSummary from "./ProfileSummary";

const Header: React.FC = () => {
  return (
    <header className="pt-8 xl:pt-4 px-6 w-full xl:border-b xl:border-gray-200  xl:shadow-lg xl:shadow-gray-600">
      <div className="hidden w-full max-w-5xl xl:flex xl:mx-auto justify-end">
        <ProfileSummary />
      </div>
      <div className="w-full max-w-5xl xl:mx-auto flex xl:justify-between items-center mb-6 bg-white">
        <img src="/images/logo.svg" alt="Do store" className="h-10 xl:h-12" />
        <div className="hidden xl:block xl:w-full xl:max-w-lg xl:mr-20">
          <SearchBar />
        </div>
        <img
          src="/images/cart-icon.svg"
          alt="Cart"
          className="w-7 aspect-square"
        />
      </div>
      <div className="mb-4 xl:hidden">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
