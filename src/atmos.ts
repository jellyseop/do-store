import { atom } from "recoil";
import { IRanking, RankingData } from "./lib/Ranking-service";

export const studentNameState = atom<string>({
  key: "studentNameState",
  default: "",
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
