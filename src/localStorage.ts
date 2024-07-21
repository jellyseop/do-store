import { ICartItem } from "./definitions/ProductTypes";

const CART_STORAGE_KEY = "cart_items";
const EXPIRY_KEY = "cart_expiry";
const TWO_WEEKS_IN_MS = 14 * 24 * 60 * 60 * 1000;

export const saveCartToLocalStorage = (cartItems: ICartItem[]) => {
  const expiryTime = Date.now() + TWO_WEEKS_IN_MS;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  localStorage.setItem(EXPIRY_KEY, expiryTime.toString());
};

export const loadCartFromLocalStorage = (): ICartItem[] => {
  const expiryTime = localStorage.getItem(EXPIRY_KEY);
  if (expiryTime && Date.now() > parseInt(expiryTime, 10)) {
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    return [];
  }
  const storedItems = localStorage.getItem(CART_STORAGE_KEY);
  return storedItems ? JSON.parse(storedItems) : [];
};
