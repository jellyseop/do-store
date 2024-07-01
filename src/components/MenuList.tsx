import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuList: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Do money 내역', path: '/doMoneyHistory' },
    { label: '상품 요청하기', path: '/requestProduct' },
    { label: '비밀번호 변경', path: '/changePassword' },
    { label: '로그아웃', path: '/logout' },
  ];

  return (
    <div className="bg-white">
      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(item.path)}
          className="p-4 border-b flex justify-between items-center cursor-pointer"
        >
          <span>{item.label}</span>
          <span>{">"}</span>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
