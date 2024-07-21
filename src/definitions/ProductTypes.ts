import { Timestamp } from "firebase/firestore";

export interface ProductProps {
  idx: number;
  product: IProduct;
}

export interface IProduct {
  id: string;
  type: number;
  name: string;
  price: number;
  img_url: string;
  product_url: string;
  totalOrders: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  tags: string[];
}

export interface ICartItem
  extends Pick<
    IProduct,
    "id" | "name" | "price" | "img_url" | "product_url" | "type"
  > {
  amount: number;
}

export interface ICart {
  items: ICartItem[];
}
