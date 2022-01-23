import { atom, selector } from "recoil";

interface IPermissions {
  permissions: any;
}

export const permissionList = atom<IPermissions>({
  key: "permissionsList",
  default: {
    permissions: {
      clients: [],
      feedback: [],
      finances: [],
      info: [],
      news: [],
      notifications: [],
      orders: [],
      proposals: [],
      services: [],
      settings: [],
      staff: [],
      statistics: [],
      support: [],
    },
  },
});

export const setPermissions = selector<IPermissions>({
  key: "setPermissions",
  get: ({ get }) => {
    const res = get(permissionList);
    return res;
  },
  set: ({ set }, newVal) => {
    set(permissionList, newVal);
  },
});

//sidebar permission
export const localPermission = atom<any>({
  key: "localPermission",
  default: [],
});

export const setLocalPermission = selector<any>({
  key: "setLocalPermission",
  get: ({ get }) => {
    const res = get(localPermission);
    return res;
  },
  set: ({ set }, newVal) => {
    set(localPermission, newVal);
    console.log(newVal, newVal);
    if (!newVal) {
      set(openModal, true);
    }
  },
});

//menu list
const width = window.innerWidth;
export const openMenu = atom<boolean>({
  key: "openMenu",
  default: width <= 1000 ? false : true,
});

export const setOpenMenu = selector<boolean>({
  key: "setOpenMenu",
  get: ({ get }) => {
    const res = get(openMenu);

    return res;
  },
  set: ({ set }, newVal) => {
    set(openMenu, newVal);
  },
});

//permission modal
export const openModal = atom<boolean>({
  key: "openModalRestrict",
  default: false,
});

export const setOpenModal = selector<boolean>({
  key: "setOpenModalRestrict",
  get: ({ get }) => {
    const res = get(openModal);

    return res;
  },
  set: ({ set }, newVal) => {
    set(openModal, newVal);
  },
});
