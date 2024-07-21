import React from "react";
import CartList from "../components/CartList";

const CartPage: React.FC = () => {
  return (
    <div className="">
      <div className="p-6 xl:container xl:mx-auto">
        {/* xl 이하일 때 보이는 내용 */}
        <div className="block xl:hidden">
          <div className="bg-white">
            <h2 className="text-gray-800 text-xl mb-4">장바구니</h2>
            <CartList />
          </div>
        </div>

        {/* xl 이상일 때 보이는 내용 */}
        <div className="hidden xl:flex">
          <div className="flex flex-col w-full">
            <h2 className="flex items-center justify-center text-2xl text-gray-800 font-semibold py-12 mb-6">
              장바구니
            </h2>
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
