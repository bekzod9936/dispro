import { atom, selector } from "recoil";

//types
import { IBaseLoyality, ILoyality } from "./types";

//use loaylty
export const useLoyal = atom<ILoyality>({
  key: "useLoyal",
  default: {
    useProgram: false,
    usePoint: false,
  },
});

export const setUseLoyal = selector<ILoyality>({
  key: "setUseLoyal",
  get: ({ get }) => {
    const res = get(useLoyal);
    return res;
  },
  set: ({ set }, newVal) => {
    set(useLoyal, newVal);
  },
});

//base loaylty
export const baseLoyalty = atom<IBaseLoyality>({
  key: "baseLoyalty",
  default: {
    max_percent: 0,
    give_cashback_after: 0,
    base_percent: 0,
    base_name: "",
  },
});

export const setBaseLoyal = selector<IBaseLoyality>({
  key: "setBaseLoyalty",
  get: ({ get }) => {
    const res = get(baseLoyalty);
    return res;
  },
  set: ({ set }, newVal) => {
    set(baseLoyalty, newVal);
  },
});
