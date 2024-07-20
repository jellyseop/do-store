import React from "react";
import { formatMoney } from "../util";
import { ICartItem } from "../definitions/ProductTypes";

interface CartListProps {
  items: ICartItem[];
  onAmountChange: (id: string, amount: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartList: React.FC<CartListProps> = ({
  items,
  onAmountChange,
  onRemoveItem,
}) => {
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-800 text-lg">장바구니에 담긴 상품이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="xl:w-3/4">
      <ul className="border-y border-gray-800">
        {items.map((item) => (
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
                  onClick={() => onRemoveItem(item.id)}
                  className="text-xl ml-4 mb-12 text-gray-400"
                >
                  X
                </button>
              </div>
              <div className="flex justify-between items-center w-full mt-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => onAmountChange(item.id, item.amount - 1)}
                    className="text-2xl text-gray-800 px-3 py-1 rounded-l-md"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) =>
                      onAmountChange(item.id, Number(e.target.value))
                    }
                    className="text-center text-gray-800 w-12 py-1 outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => onAmountChange(item.id, item.amount + 1)}
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
      <div className="mt-12">
        <div className="flex justify-between items-center bg-gray-100 border border-gray-300 w-full px-4 py-4 rounded">
          <div className="text-gray-800 text-lg">결제예정금액</div>
          <div className="text-gray-800 text-lg flex flex-row">
            {formatMoney(totalPrice)}{" "}
            <img
              src="/images/do-money.svg"
              alt="do-money"
              className="w-4 ml-1"
            />
          </div>
        </div>
        <button className="w-full mt-6 bg-yellow-300 text-gray-800 text-lg py-4 rounded-lg">
          주문하기
        </button>
      </div>
    </div>
  );
};

export default CartList;
