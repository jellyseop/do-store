import React from "react";
import CartList from "../components/CartList";

const CartPage: React.FC = () => {
  return (
    <div className="">
      <div className="p-6 xl:container xl:mx-auto">
        {/* xl 이하일 때 보이는 내용 */}
        <div className="block xl:hidden">
          <div className="bg-white">
            <div className="flex flex-row">
              <h2 className="text-gray-800 text-xl mb-2.5 mr-2.5">장바구니</h2>
              <div className="text-xs font-normal text-gray-400 mt-1.5">
                장바구니 최대개수는 5개 입니다.
              </div>
            </div>
            <CartList />
          </div>
        </div>

        {/* xl 이상일 때 보이는 내용 */}
        <div className="hidden xl:flex">
          <div className="flex flex-col w-full">
            <div className="flex flex-col mb-6 py-2.5 ml-40">
              <h2 className="text-2xl text-gray-800 font-semibold mb-1">
                장바구니
              </h2>
              <div className="text-sm font-normal text-gray-400">
                장바구니 최대개수는 5개 입니다.
              </div>
            </div>
            <div className="flex items-center justify-center">
              <CartList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
