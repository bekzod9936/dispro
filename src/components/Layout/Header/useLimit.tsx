import { useQuery } from 'react-query';
import { fetchLimitFinance } from 'services/queries/InfoQuery';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
  setAccounts,
  setBalance,
  setLimit,
} from 'services/redux/Slices/info/info';
import { numberWithNew } from 'services/utils';

const useLimit = () => {
  const companyId = localStorage.getItem('companyId');
  const currency = useAppSelector((state) => state.info.data?.currencyId);
  const dispatch = useAppDispatch();

  const resLimit = useQuery(
    'fetchLimitFinance',
    () => fetchLimitFinance({ companyId, currency }),
    {
      onSuccess: (data) => {
        console.log(
          Number.isInteger(data.data.data.accounts[0].limit),
          Number.isInteger(data.data.data.accounts[0].balance)
        );
        dispatch(setAccounts(data.data.data.accounts));
        dispatch(setLimit(data.data.data.accounts[0].limit));
        dispatch(setBalance(data.data.data.accounts[0].balance));
      },
    }
  );
  return { resLimit };
};

export default useLimit;
