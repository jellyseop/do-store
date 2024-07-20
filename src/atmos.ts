import { atom } from "recoil";
import { IRanking, RankingData } from "./lib/Ranking-service";
import { IStudent } from "./definitions/StudentTypes";

export const studentDataState = atom<IStudent>({
  key: "studentDataState",
  default: {
    signInID: "",
    nameKo: "",
    nameEn: "",
    phone: "",
    birth: "",
    level: "",
    levelName: "",
    division: "",
    totalSchedules: 0,
    tags: [],
  },
});

export const balanceState = atom<number>({
  key: "balanceState",
  default: 0,
});

export const rankingState = atom<IRanking[]>({
  key: "rankingState",
  default: [],
});

export const rankingIdState = atom<RankingData>({
  key: "rankingIdState",
  default: {
    id: "",
    rankings: [],
  },
});
