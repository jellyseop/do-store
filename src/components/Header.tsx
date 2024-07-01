import React from "react";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  return (
    <header className="pt-6 px-6">
      <div className="flex items-center justify-between bg-white mb-4 ">
        <img
          src="/images/menu-icon.svg"
          alt="Menu"
          className="w-8 aspect-square"
        />
        <img src="/images/logo.svg" alt="Do store" className="h-10" />
        <img
          src="/images/cart-icon.svg"
          alt="Cart"
          className="w-8 aspect-square"
        />
      </div>
      <SearchBar />
    </header>
  );
};

export default Header;

//Hello, world!
