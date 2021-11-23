import { atom, selector } from "recoil";

export const switchKeyT = atom<string>({
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
