import { collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { IProduct } from "../definitions/ProductTypes";
import { getPaginateAndCount } from "./getPaginateAndCount";
import { TableOutput } from "../definitions/common-types";

const getFirestoreProducts = async ({
  productType,
  productOrder,
  currentPage,
}: {
  productType: number;
  productOrder: number;
  currentPage: number;
}): Promise<TableOutput<IProduct[]>> => {
  try {
    let q = query(collection(db, "products"), where("type", "==", productType));

    if (productOrder === 1) {
      q = query(q, orderBy("totalOrders", "desc"));
    } else if (productOrder === 2) {
      q = query(q, orderBy("price", "desc"));
    } else {
      q = query(q, orderBy("price", "asc"));
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
        product_url: data.product_url,
        price: data.price,
        img_url: data.img_url,
        totalOrders: data.totalOrders,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
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

export default getFirestoreProducts;
