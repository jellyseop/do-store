import React from "react";
import { IOrder } from "../mock";
import { formatMoney } from "../util";

interface OrderListProps {
  orders: IOrder[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <>
      {/* xl 이하일 때 보이는 내용 */}
      <ul className="xl:hidden">
        {orders.map((order) => (
          <li
            key={order.id}
            className="flex items-center py-4 border-b last:border-none last:pb-0 border-gray-200"
          >
            <img
              src={order.imageUrl}
              alt={order.name}
              className="w-20 h-20 object-cover mr-4"
            />
            <div className="flex flex-1 flex-col justify-between">
              <h3 className="text-lg text-gray-800">{order.name}</h3>
              <div className="flex items-center text-sm text-gray-800">
                {formatMoney(order.price)}
                <img
                  src="/images/do-money.svg"
                  alt="do-money"
                  className="w-4 ml-1"
                />
              </div>
              <div className="text-gray-500 text-xs">{order.amount}개 구매</div>
            </div>
            <div className="text-right flex flex-col items-center">
              <div className="text-sm text-gray-800">{order.condition}</div>
              {order.condition === "주문 취소" && (
                <div className="text-xs text-gray-800">재고 부족</div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* xl 이상일 때 보이는 내용 */}
      <div className="hidden xl:block">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center p-4 border-b last:border-none border-gray-200"
          >
            <img
              src={order.imageUrl}
              alt={order.name}
              className="w-20 h-20 object-cover mr-4"
            />
            <div className="flex flex-1 justify-between items-center">
              <div className="flex flex-col">
                <h3 className="text-lg text-gray-800">{order.name}</h3>
                <div className="flex items-center text-sm text-gray-800">
                  {formatMoney(order.price)}
                  <img
                    src="/images/do-money.svg"
                    alt="do-money"
                    className="w-4 ml-1"
                  />
                </div>
                <div className="text-gray-500 text-xs">
                  {order.amount}개 구매
                </div>
              </div>
              <div className="text-right flex flex-col items-center ml-4">
                <div className="text-sm text-gray-800">{order.condition}</div>
                {order.condition === "주문 취소" && (
                  <div className="text-xs text-gray-800">재고 부족</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderList;
