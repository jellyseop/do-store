import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const MENU_ITEMS = [
  { label: "Do money 내역", path: "/doMoney" },
  { label: "주문 내역", path: "/order" },
  { label: "비밀번호 변경", path: "/changePassword" },
  { label: "로그아웃", path: "/" },
];

const MenuList: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = (path: string) => {
    if (path === "/") {
      logout();
    }
  };

  return (
    <div className="bg-white xl:border">
      {MENU_ITEMS.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            to={item.path}
            key={index}
            className="block"
            onClick={() => handleLogout(item.path)}
          >
            <div
              className={`py-4 flex justify-between items-center cursor-pointer xl:p-4 ${
                isActive ? "bg-gray-100 text-yellow-400" : "text-gray-800"
              } ${index < MENU_ITEMS.length - 1 ? "border-b" : ""}`}
            >
              <span>{item.label}</span>
              <span>{">"}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MenuList;
