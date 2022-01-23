import { selector } from "recoil";

//atoms
import { currentPage } from "./index";
import { IAtom } from "./types";

export const setCurrentScreen = selector<IAtom>({
  key: "setCurrentScreen",
  get: ({ get }) => {
    const item = get(currentPage);
    return item;
  },
  set: ({ set }, page) => {
    set(currentPage, page);
  },
});
