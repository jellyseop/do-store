import React from "react";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  return (
    <header className="pt-8 px-6">
      <div className="flex justify-between items-center mb-6 bg-white">
        <img src="/images/logo.svg" alt="Do store" className="h-10" />
        <img
          src="/images/cart-icon.svg"
          alt="Cart"
          className="w-7 aspect-square"
        />
      </div>
      <SearchBar />
    </header>
  );
};

export default Header;
