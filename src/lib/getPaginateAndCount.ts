import {
  getDocs,
  limit,
  query,
  Query,
  QuerySnapshot,
  startAfter,
} from "firebase/firestore";
import { TableOutput } from "../definitions/common-types";

interface PaginationInput {
  currentPage: number;
  itemsPerPage?: number;
}

export async function getPaginateAndCount(
  queryRef: Query,
  { currentPage, itemsPerPage = 16 }: PaginationInput
): Promise<TableOutput<QuerySnapshot>> {
  try {
    const offset = (currentPage - 1) * itemsPerPage;

    const totalSizeSnapShot = await getDocs(queryRef);
    const totalCounts = totalSizeSnapShot.size;

    const totalPages = Math.ceil(totalCounts / itemsPerPage);

    // 오프셋 처리 및 쿼리 실행
    let snapshot;
    if (offset > 0) {
      const lastVisible = totalSizeSnapShot.docs[offset - 1];
      snapshot = await getDocs(
        query(queryRef, startAfter(lastVisible), limit(itemsPerPage))
      );
    } else {
      snapshot = await getDocs(query(queryRef, limit(itemsPerPage)));
    }

    return { ok: true, data: snapshot, totalCounts, totalPages };
  } catch (error) {
    console.error("paginated error:", error);

    return {
      ok: false,
      error: "Cannot get paginate and count",
    };
  }
}
