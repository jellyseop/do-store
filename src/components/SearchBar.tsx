import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/search?query=${query}&type=online`);
    }
    setQuery("");
  };
  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 pl-12 py-3 bg-gray-100 rounded-lg outline-none focus:ring focus:ring-yellow-300"
        placeholder="상품을 검색해보세요!"
      />
      <img
        src="/images/search-icon.svg"
        alt="Search"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 aspect-square"
      />
    </form>
  );
};

export default SearchBar;
