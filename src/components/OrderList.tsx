import React from "react";
import { formatMoney } from "../util";
import { IPartialOrder } from "../definitions/OrderType";

interface OrderListProps {
  orders: IPartialOrder[];
}

const statusLabels: { [key: number]: string } = {
  1: "주문대기",
  2: "주문확인",
  3: "수령대기",
  4: "수령완료",
  5: "주문취소",
};

const getStatusLabel = (status: number): string => {
  return statusLabels[status] || "알 수 없음";
};

const OrderItem: React.FC<{ order: IPartialOrder }> = ({ order }) => {
  const formattedDate = new Date(
    order.createdAt.seconds * 1000
  ).toLocaleDateString("ko-KR");

  return (
    <li
      key={order.id}
      className="flex items-center py-4 border-b last:border-none last:pb-0 border-gray-200"
    >
      <img
        src={order.img_url}
        alt={order.name}
        className="w-20 h-20 object-cover mr-4"
      />
      <div className="flex flex-1 flex-col justify-between">
        <h3 className="text-lg text-gray-800">{order.name}</h3>
        <div className="flex items-center text-sm text-gray-800">
          {formatMoney(order.price)}
          <img src="/images/do-money.svg" alt="do-money" className="w-4 ml-1" />
        </div>
        <div className="text-gray-500 text-xs">{order.amount}개 구매</div>
      </div>
      <div className="text-right  items-center">
        <div className="text-sm text-gray-800">
          {getStatusLabel(order.status)}
        </div>
        <div className="text-sm text-gray-500">{formattedDate}</div>
      </div>
    </li>
  );
};

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-800 text-lg">최근 주문 내역이 없습니다</p>
      </div>
    );
  }

  return (
    <>
      {/* xl 이하일 때 보이는 내용 */}
      <ul className="xl:hidden">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>

      {/* xl 이상일 때 보이는 내용 */}
      <div className="hidden xl:block">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </>
  );
};

export default OrderList;
