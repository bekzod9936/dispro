import { atom, selector } from 'recoil';
import { IBadge } from './types';

export const badgeData = atom<IBadge>({
  key: 'badgeData',
  default: {
    histories: [],
    totalCount: 0,
  },
});

export const setBadgeData = selector<IBadge>({
  key: 'setBadgeData',
  get: ({ get }) => {
    let res = get(badgeData);
    return res;
  },
  set: ({ set }, newVal) => {
    set(badgeData, newVal);
  },
});
