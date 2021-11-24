import { atom, selector } from "recoil";
import { IActive, IEDiscount, IEBonuspoint, IECashback } from "./types";
export const switchKeyT = atom<string | any>({
  key: "switchKey",
  default: "discount",
});

export const setSwitchKeyT = selector<string>({
  key: "setSwitchKey",
  get: ({ get }) => {
    const res = get(switchKeyT);
    return res;
  },
  set: ({ set }, newVal) => {
    set(switchKeyT, newVal);
  },
});

//active check
export const activeM = atom<IActive>({
  key: "active",
  default: {
    active: "",
  },
});

export const setActiveM = selector<IActive>({
  key: "setActive",
  get: ({ get }) => {
    const res = get(activeM);

    return res;
  },
  set: ({ set }, newVal) => {
    set(activeM, newVal);
  },
});

//active check
export const activeCheckM = atom<"discount" | "cashback" | "bonuspoint" | "">({
  key: "activeCheck",
  default: "",
});

export const setActiveCheckM = selector<
  "discount" | "cashback" | "bonuspoint" | ""
>({
  key: "setActiveCheck",
  get: ({ get }) => {
    const res = get(activeCheckM);
    return res;
  },
  set: ({ set }, newVal) => {
    set(activeCheckM, newVal);
  },
});

//exmpty states
export const eCashback = atom<IECashback>({
  key: "emptyCashback",
  default: {
    type: "cashback",
    empty: false,
  },
});

export const eDiscount = atom<IEDiscount>({
  key: "emptyDiscount",
  default: {
    type: "discount",
    empty: false,
  },
});

export const eBonuspoint = atom<IEBonuspoint>({
  key: "emptyBonuspoint",
  default: {
    type: "bonuspoint",
    empty: false,
  },
});

export const setECashback = selector<IECashback>({
  key: "setECashback",
  get: ({ get }) => {
    const res = get(eCashback);
    return res;
  },
  set: ({ set }, newVal) => {
    set(eCashback, newVal);
  },
});

export const setEDiscount = selector<IEDiscount>({
  key: "setEDiscount",
  get: ({ get }) => {
    const res = get(eDiscount);
    return res;
  },
  set: ({ set }, newVal) => {
    set(eDiscount, newVal);
  },
});

export const setEBonuspoint = selector<IEBonuspoint>({
  key: "setEBonuspoint",
  get: ({ get }) => {
    const res = get(eBonuspoint);
    return res;
  },
  set: ({ set }, newVal) => {
    set(eBonuspoint, newVal);
  },
});
