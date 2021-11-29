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

//select company
export const selectedCompany = atom<ICompany>({
  key: "selectedCompany",
  default: {},
});

export const setSelectCompany = selector<ICompany>({
  key: "setSelectCompany",
  get: ({ get }) => {
    const res = get(selectedCompany);
    return res;
  },
  set: ({ set }, newVal) => {
    set(selectedCompany, newVal);
  },
});

export const successLoginModerator = atom<boolean>({
  key: "successLoginModerator",
  default: false,
});

export const setSuccessLogin = selector<boolean>({
  key: "setSuccessLogin",
  get: ({ get }) => {
    const res = get(successLoginModerator);
    return res;
  },
  set: ({ set }, newVal) => {
    set(successLoginModerator, newVal);
  },
});
