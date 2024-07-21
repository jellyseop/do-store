import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { IProduct } from "../definitions/ProductTypes";

type QueryOutput<T> = QuerySuccessOutput<T> | ErrorOutput;

interface QuerySuccessOutput<T> extends SuccessOutput {
  data: T;
}

interface SuccessOutput {
  ok: true;
}

interface ErrorOutput {
  ok: false;
  error: string;
}

export const getTopProducts = async (
  productType: number,
  limitCount: number
): Promise<QueryOutput<IProduct[]>> => {
  try {
    const q = query(
      collection(db, "products"),
      where("type", "==", productType),
      orderBy("totalOrders", "desc"),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const products: IProduct[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as IProduct;
      return {
        id: doc.id,
        type: data.type,
        name: data.name,
        price: data.price,
        img_url: data.img_url,
        product_url: data.product_url,
        totalOrders: data.totalOrders,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        tags: data.tags,
      };
    });

    return {
      ok: true,
      data: products,
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error?.message || "Cannot get products",
    };
  }
};
