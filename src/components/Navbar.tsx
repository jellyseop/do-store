import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white">
            Home
          </Link>
        </li>
        <li>
          <Link to="/mypage" className="text-white">
            My Page
          </Link>
        </li>
        <li>
          <Link to="/search" className="text-white">
            Search
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
