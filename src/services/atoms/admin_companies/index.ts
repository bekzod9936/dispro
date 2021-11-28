import { atom, selector } from "recoil";
import { ICompany } from "./types";

export const companiesM = atom<ICompany[]>({
  key: "adminCompanies",
  default: [],
});

export const setCompaniesM = selector<ICompany[]>({
  key: "setAdminCompanies",
  get: ({ get }) => {
    const res = get(companiesM);

    return res;
  },
  set: ({ set }, newVal) => {
    set(companiesM, newVal);
  },
});
