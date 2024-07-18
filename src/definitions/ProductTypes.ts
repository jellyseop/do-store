import { Timestamp } from "firebase/firestore";

export interface IProduct {
  id: string;
  type: number;
  name: string;
  price: number;
  img_url: string;
  totalOrders: number;
  createdAt: Timestamp;
  tags: string[];
}
