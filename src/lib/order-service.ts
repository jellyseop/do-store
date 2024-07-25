import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { IPartialOrder } from "../definitions/OrderType";
import { db } from "../firebase";
import { QueryOutput } from "../definitions/common-types";

export const fetchOrders = async (
  studentId: string
): Promise<QueryOutput<IPartialOrder[]>> => {
  try {
    const ordersCollection = collection(db, "orders");
    const q = query(
      ordersCollection,
      where("student_id", "==", studentId),
      orderBy("createdAt", "desc")
    );
    const ordersSnapshot = await getDocs(q);

    const orders: IPartialOrder[] = ordersSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        price: data.price,
        amount: data.amount,
        status: data.status,
        img_url: data.img_url,
        createdAt: data.createdAt,
      } as IPartialOrder;
    });

    return { ok: true, data: orders };
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};
