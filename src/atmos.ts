import { atom } from "recoil";
import { IRanking, RankingData } from "./lib/Ranking-service";
import { IStudent } from "./definitions/StudentTypes";
import { ICartItem } from "./definitions/ProductTypes";
import { IRecord } from "./lib/UserFunction";
import { IPartialOrder } from "./definitions/OrderType";

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
    cart: [],
  },
});

export const balanceState = atom<number>({
  key: "balanceState",
  default: 0,
});

export const recordsState = atom<IRecord[]>({
  key: "recordsState",
  default: [],
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

export const cartState = atom<ICartItem[]>({
  key: "cartState",
  default: [],
});

export const orderState = atom<IPartialOrder[]>({
  key: "orderState",
  default: [],
});
