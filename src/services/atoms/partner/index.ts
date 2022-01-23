import { atom } from "recoil";
import { IAtom } from "./types";

export const currentPage = atom<IAtom>({
  key: "currentPage",
  default: {
    currentPage: "statistics",
  },
});
