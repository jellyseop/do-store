import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import RankingList from "../components/RankingList";
import ProductList from "../components/ProductList";
import ProfileSummary from "../components/ProfileSummary";
import LoadingSpinner from "../components/LoadingSpinner";
import { getStudentBalance, getStudentData } from "../lib/UserFunction";
import { getTopProducts } from "../lib/productFunction";
import { ICartItem, IProduct } from "../definitions/ProductTypes";
import useMe from "../hooks/\buseMe";
import {
  balanceState,
  cartState,
  rankingIdState,
  rankingState,
  studentDataState,
} from "../atmos";
import { getLatestRanking } from "../lib/Ranking-service";
import { saveCartToLocalStorage } from "../localStorage";

const Home: React.FC = () => {
  const { currentUser, loading: authLoading } = useMe();
  const setStudentData = useSetRecoilState(studentDataState);
  const setBalance = useSetRecoilState(balanceState);
  const setRanking = useSetRecoilState(rankingState);
  const setRankingId = useSetRecoilState(rankingIdState);
  const setCart = useSetRecoilState(cartState);
  const [onlineProducts, setOnlineProducts] = useState<IProduct[]>([]);
  const [offlineProducts, setOfflineProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (currentUser) {
      const fetchData = async () => {
        try {
          const studentId = currentUser.uid;

          const [
            studentData,
            studentBalance,
            rankingData,
            topOnlineProducts,
            topOfflineProducts,
          ] = await Promise.all([
            getStudentData(studentId),
            getStudentBalance(studentId),
            getLatestRanking(),
            getTopProducts(1, 4),
            getTopProducts(2, 4),
          ]);

          if (!studentData.ok) {
            throw new Error(studentData.error);
          }
          if (!studentBalance.ok) {
            throw new Error(studentBalance.error);
          }
          if (!rankingData.ok) {
            throw new Error(rankingData.error);
          }
          if (!topOnlineProducts.ok) {
            throw new Error(topOnlineProducts.error);
          }
          if (!topOfflineProducts.ok) {
            throw new Error(topOfflineProducts.error);
          }

          const cartItems: ICartItem[] = studentData.data.cart
            ? studentData.data.cart.map((cartItem: any) => ({
                id: cartItem.id,
                name: cartItem.name,
                price: cartItem.price,
                img_url: cartItem.img_url,
                amount: cartItem.amount,
                type: cartItem.type,
                product_url: cartItem.product_url,
              }))
            : [];

          setStudentData({
            signInID: studentData.data.signInID,
            nameKo: studentData.data.nameKo,
            nameEn: studentData.data.nameEn,
            phone: studentData.data.phone,
            birth: studentData.data.birth,
            level: studentData.data.level,
            levelName: studentData.data.levelName,
            division: studentData.data.division,
            totalSchedules: studentData.data.totalSchedules,
            tags: studentData.data.tags,
            cart: cartItems,
          });
          setBalance(studentBalance.data.balance);
          setRanking(rankingData.data.rankings);
          setRankingId(rankingData.data);
          setOnlineProducts(topOnlineProducts.data);
          setOfflineProducts(topOfflineProducts.data);
          setCart(cartItems);
          saveCartToLocalStorage(cartItems);
        } catch (error) {
          console.error("Error fetching student or product data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [currentUser, setStudentData, setBalance, setRanking]);

  if (authLoading || loading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen -mt-32">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="xl:hidden">
        <ProfileSummary showLink={true} />
      </div>
      <div className="bg-gray-100">
        <RankingList />
        <ProductList
          title="온라인 상품"
          desc={"주문하면 학원으로 배송되는 상품"}
          products={onlineProducts}
        />
        <ProductList
          title="오프라인 상품"
          desc={"학원에서 바로 수령하는 상품"}
          products={offlineProducts}
        />
      </div>
    </>
  );
};

export default Home;
