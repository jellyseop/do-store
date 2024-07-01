import React from "react";

const SearchBar: React.FC = () => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full p-2 pl-12 py-3 bg-gray-100 rounded-lg"
        placeholder="상품을 검색해보세요!"
      />
      <img
        src="/images/search-icon.svg"
        alt="Search"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 aspect-square"
      />
    </div>
  );
};

export default SearchBar;
