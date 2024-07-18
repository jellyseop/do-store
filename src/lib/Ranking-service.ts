import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { QueryOutput } from "../definitions/common-types";

export interface IRanking {
  nameKo: string;
  nameEn: string;
  balance: number;
  rank: number;
}

export interface RankingData {
  id: string; //YYYY-MM-DD(최종업데이트 일자)
  rankings: IRanking[];
}

export const getLatestRanking = async (): Promise<QueryOutput<RankingData>> => {
  try {
    const q = query(
      collection(db, "ranking"),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        ok: false,
        error: "No ranking data found",
      };
    }

    const doc = querySnapshot.docs[0];
    const { rankings } = doc.data() as RankingData;
    const data: RankingData = {
      id: doc.id,
      rankings,
    };

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error.message || "Cannot get ranking data",
    };
  }
};
