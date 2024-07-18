import { collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { IProduct } from "../definitions/ProductTypes";
import { getPaginateAndCount } from "./getPaginateAndCount";
import { TableOutput } from "../definitions/common-types";

export const searchProducts = async ({
  productType,
  currentPage,
  tags = [],
  productOrder = 1,
}: {
  productType: number;
  currentPage: number;
  tags?: string[];
  productOrder?: number;
}): Promise<TableOutput<IProduct[]>> => {
  try {
    let q = query(collection(db, "products"), where("type", "==", productType));

    if (tags.length > 0) {
      q = query(q, where("tags", "array-contains-any", tags));
    }

    if (productOrder) {
      q = query(q, orderBy("totalOrders", "desc"));
    }

    const result = await getPaginateAndCount(q, {
      currentPage,
    });

    if (!result.ok) {
      throw new Error(result.error);
    }

    const { data: snapshot, totalCounts, totalPages } = result;

    const products: IProduct[] = snapshot.docs.map((doc) => {
      const data = doc.data() as IProduct;
      return {
        id: doc.id,
        type: data.type,
        name: data.name,
        price: data.price,
        img_url: data.img_url,
        totalOrders: data.totalOrders,
        createdAt: data.createdAt,
        tags: data.tags,
      };
    });

    return {
      ok: true,
      data: products,
      totalCounts,
      totalPages,
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error?.message || "Cannot get products",
    };
  }
};
