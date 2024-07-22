import React, { useEffect } from "react";
import { formatMoney } from "../util";
import { useAuth } from "../AuthProvider";
import { useRecoilState } from "recoil";
import { cartState, studentDataState } from "../atmos";
import { removeCartItem, updateCartItemAmount } from "../lib/cart-Service";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../localStorage";

import { Timestamp } from "firebase/firestore";
import { addOrder } from "../lib/order-service";
import { IOrder } from "../definitions/OrderType";
import { ICartItem } from "../definitions/ProductTypes";

const CartList: React.FC = () => {
  const { currentUser } = useAuth();

  const [cartData, setCartData] = useRecoilState(cartState);
  const [studentData] = useRecoilState(studentDataState);

  const totalPrice = cartData.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  useEffect(() => {
    if (cartData.length === 0) {
      setCartData(loadCartFromLocalStorage());
    }
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    if (cartData.length <= 0) {
      return;
    }
    const syncCartData = (cartData: ICartItem[]) => {
      saveCartToLocalStorage(cartData);
    };

    syncCartData(cartData);
  }, [currentUser, cartData]);

  const handleAmountChange = (id: string, amount: number) => {
    if (amount <= 0) {
      console.log("blocked!");

      return;
    }

    const updatedItems = cartData.map((item) =>
      item.id === id ? { ...item, amount: Math.max(1, amount) } : item
    );
    setCartData(updatedItems);

    if (currentUser) {
      updateCartItemAmount(currentUser.uid, id, amount);
    }
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = cartData.filter((item) => item.id !== id);
    setCartData(updatedItems);

    if (!currentUser) {
      return;
    }
    try {
      removeCartItem(currentUser.uid, id);
    } catch (error) {
      console.error("Error removing cart item: ", error);
    }
  };

  const handleOrder = async () => {
    if (!currentUser) {
      return;
    }

    const orders: IOrder[] = cartData.map((item) => {
      console.log(item);

      return {
        student_id: currentUser.uid,
        nameKo: studentData.nameKo,
        nameEn: studentData.nameEn,
        product_id: item.id,
        type: item.type,
        desc: item.product_url,
        img_url: item.img_url,
        name: item.name,
        price: item.price,
        amount: item.amount,
        status: 1,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
    });

    try {
      console.log(orders);

      for (const order of orders) {
        await addOrder(order);
      }
      console.log("All orders added successfully");
      setCartData([]);
      saveCartToLocalStorage([]);
      alert("주문이 완료되었습니다!");
    } catch (error) {
      console.error("Error adding orders: ", error);
    }
  };

  if (cartData.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-800 text-lg">장바구니에 담긴 상품이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="xl:w-3/4">
      <div className="xl:border-y xl:border-gray-800 xl:flex xl:justify-between xl:gap-x-10 ">
        <ul className="w-full xl:mr-10 border-y border-gray-800 xl:border-none">
          {cartData.map((item) => (
            <li
              key={item.id}
              className="flex items-center py-4 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center w-full">
                  <img
                    src={item.img_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg text-gray-800">{item.name}</h3>
                    <div className="text-gray-500 text-base flex flex-row">
                      {formatMoney(item.price)}{" "}
                      <img
                        src="/images/do-money.svg"
                        alt="do-money"
                        className="w-4 ml-1"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-xl ml-4 mb-12 text-gray-400"
                  >
                    X
                  </button>
                </div>
                <div className="flex justify-between items-center w-full mt-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() =>
                        handleAmountChange(item.id, item.amount - 1)
                      }
                      className="text-2xl text-gray-800 px-3 py-1 rounded-l-md"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) =>
                        handleAmountChange(item.id, Number(e.target.value))
                      }
                      className="text-center text-gray-800 w-12 py-1 outline-none"
                      min="1"
                    />
                    <button
                      onClick={() =>
                        handleAmountChange(item.id, item.amount + 1)
                      }
                      className="text-2xl text-gray-800 px-3 py-1 rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-gray-800 text-lg flex flex-row">
                    {formatMoney(item.price * item.amount)}{" "}
                    <img
                      src="/images/do-money.svg"
                      alt="do-money"
                      className="w-4 ml-1"
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12 xl:w-1/3 xl:min-w-96">
          <div className="flex flex-col justify-between items-start gap-y-4 bg-gray-100 border border-gray-300 w-full px-4 py-4 rounded">
            <div className="w-full text-gray-800 text-lg border-b pb-2 border-gray-700 font-semibold">
              결제예정금액
            </div>
            <div className="text-gray-800 flex flex-row w-full justify-between">
              {formatMoney(totalPrice)}{" "}
              <img
                src="/images/do-money.svg"
                alt="do-money"
                className="w-4 ml-1"
              />
            </div>
          </div>
          <button
            className="w-full mt-6 bg-yellow-300 text-gray-800 text-lg py-4 rounded-lg"
            onClick={handleOrder}
          >
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartList;
