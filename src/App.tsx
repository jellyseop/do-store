import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import SearchResults from "./pages/SearchResult";
import Header from "./components/Header";
import DoMoneyHistory from "./pages/DoMoneyHistory";
import OrderHistory from "./pages/OrderHistory";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/doMoneyHistory" element={<DoMoneyHistory />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
      </Routes>
    </div>
  );
};

export default App;
