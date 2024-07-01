export const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat("ko-KR").format(amount);
};
