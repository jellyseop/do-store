import { Timestamp } from "firebase/firestore";

export interface IOrder {
  student_id: string;
  nameKo: string;
  nameEn: string;
  product_id: string;
  type: number;
  desc?: string;
  img_url: string;
  name: string;
  price: number;
  amount: number;
  status: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
