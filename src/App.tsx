import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import SearchResults from "./pages/SearchResult";
import Header from "./components/Header";
import DoMoneyHistory from "./pages/DoMoneyHistory";
import OrderHistory from "./pages/OrderHistory";
import Ranking from "./pages/Ranking";
import OnlineProducts from "./pages/OnlineProducts";
import OfflineProducts from "./pages/OfflineProducts";
import NotFound from "./pages/Notfound";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full relative">
      <Header />
      <main className="flex-grow min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/doMoneyHistory" element={<DoMoneyHistory />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/products/online" element={<OnlineProducts />} />
          <Route path="/products/offline" element={<OfflineProducts />} />
          <Route
            path="/products"
            element={<Navigate to="/products/offline" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
