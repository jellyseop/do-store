import { addDoc, collection } from "firebase/firestore";
import { IOrder } from "../definitions/OrderType";
import { db } from "../firebase";

export const addOrder = async (orderItem: IOrder): Promise<void> => {
  try {
    await addDoc(collection(db, "orders"), orderItem);
    console.log("Order added successfully");
  } catch (error) {
    console.error("Error adding order: ", error);
  }
};
