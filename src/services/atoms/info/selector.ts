import { IProps } from './types';
import { selector } from 'recoil';

//atoms
import { mainBalance, mainLimit } from './index';

export const setBalanceAccounts = selector<IProps>({
  key: 'setBalanceAccounts',
  get: ({ get }) => {
    let res = get(mainBalance);
    return res;
  },
  set: ({ set }, newVal) => {
    set(mainBalance, newVal);
  },
});

export const setLimitAccounts = selector<IProps>({
  key: 'setLimitAccounts',
  get: ({ get }) => {
    let res = get(mainLimit);
    return res;
  },
  set: ({ set }, newVal) => {
    set(mainLimit, newVal);
  },
});
