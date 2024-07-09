import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import SearchResults from "./pages/SearchResult";
import Header from "./components/Header";
import DoMoneyHistory from "./pages/DoMoneyHistory";
import OrderHistory from "./pages/OrderHistory";
import Ranking from "./pages/Ranking";
import CartPage from "./pages/CartPage";
import ChangePassword from "./pages/ChangePW";
import OnlineProducts from "./pages/OnlineProducts";
import OfflineProducts from "./pages/OfflineProducts";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import { AuthProvider } from "./AuthProvider";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route
            element={
              <div className="flex flex-col min-h-screen w-full relative">
                <Header />
                <main className="flex-grow min-h-screen">
                  <Outlet />
                </main>
                <Footer />
              </div>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/doMoney" element={<DoMoneyHistory />} />
            <Route path="/order" element={<OrderHistory />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/products/online" element={<OnlineProducts />} />
            <Route path="/products/offline" element={<OfflineProducts />} />
            <Route
              path="/products"
              element={<Navigate to="/products/offline" />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
