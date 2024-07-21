import React, { useEffect } from "react";
import Product from "../components/Product";
import PageHeader from "../components/mobile/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import { ICartItem, IProduct } from "../definitions/ProductTypes";
import { useAuth } from "../AuthProvider";
import { useRecoilState } from "recoil";
import { cartState } from "../atmos";
import { saveCartToLocalStorage } from "../localStorage";

interface ProductPageProps {
  title: string;
  data: IProduct[] | null;
  totalPages: number;
  totalCounts: number;
  productOrder?: number;
  handlePageChange: (newPage: number) => void;
  handleProductOrderChange?: (order: number) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({
  title,
  data,
  totalPages,
  totalCounts,
  productOrder,
  handlePageChange,
  handleProductOrderChange,
}) => {
  const { currentUser } = useAuth();
  const [cartData, setCartData] = useRecoilState(cartState);

  if (!currentUser) {
    return;
  }

  useEffect(() => {
    if (cartData.length <= 0) {
      return;
    }

    const syncCartData = (cartData: ICartItem[]) => {
      saveCartToLocalStorage(cartData);
    };

    syncCartData(cartData);
  }, [cartData]);

  return (
    <div className="xl:max-w-5xl xl:mx-auto w-full">
      <PageHeader title={title} />
      <div className="flex justify-between items-center px-6 xl:px-0 mt-3 xl:mt-5 mb-8 xl:mb-12">
        <p className="text-gray-400">총 {totalCounts}건</p>
        {handleProductOrderChange && (
          <div className="flex items-center gap-x-2 text-sm">
            <button
              onClick={() => handleProductOrderChange(1)}
              className={`${
                productOrder === 1
                  ? "text-yellow-300 font-bold"
                  : "text-gray-300"
              }`}
            >
              인기순
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => handleProductOrderChange(2)}
              className={`${
                productOrder === 2
                  ? "text-yellow-300 font-bold"
                  : "text-gray-300"
              }`}
            >
              높은 가격
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => handleProductOrderChange(3)}
              className={`${
                productOrder === 3
                  ? "text-yellow-300 font-bold"
                  : "text-gray-300"
              }`}
            >
              낮은 가격
            </button>
          </div>
        )}
      </div>
      {data ? (
        <>
          <div className="px-6 xl:px-0 grid grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-12">
            {data.map((product, idx) => (
              <Product
                user_id={currentUser.uid}
                key={product.id}
                idx={idx}
                setter={setCartData}
                product={product}
              />
            ))}
          </div>
          <div className="w-full px-6 xl:px-0 mt-12 xl:mt-24">
            <Pagination
              handlePageChange={handlePageChange}
              totalPages={totalPages}
            />
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center mt-36 xl:mt-44">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
