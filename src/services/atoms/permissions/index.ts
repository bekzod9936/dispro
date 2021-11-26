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
