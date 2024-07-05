import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import SearchResults from "./pages/SearchResult";
import Header from "./components/Header";
import DoMoneyHistory from "./pages/DoMoneyHistory";
import OrderHistory from "./pages/OrderHistory";
import Ranking from "./pages/Ranking";
import CartPage from "./pages/CartPage";
import ChangePassword from "./pages/ChangePW";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full relative">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/doMoney" element={<DoMoneyHistory />} />
        <Route path="/order" element={<OrderHistory />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Routes>
    </div>
  );
};

export default App;
