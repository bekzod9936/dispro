import { atom } from "recoil";

import { IProps } from "./types";

export const mainBalance = atom<IProps>({
  key: "mainBalance",
  default: {
    balance: 0,
  },
});

export const mainLimit = atom<IProps>({
  key: "mainLimit",
  default: {
    limit: 0,
  },
});
