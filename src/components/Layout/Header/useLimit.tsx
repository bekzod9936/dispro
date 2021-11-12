import { useQuery } from 'react-query';
import { fetchLimitFinance } from 'services/queries/InfoQuery';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
  setAccounts,
  setBalanceAccounts,
  setLimitAccounts,
} from 'services/redux/Slices/info/info';

const useLimit = () => {
  const companyId = localStorage.getItem('companyId');
  const currency = useAppSelector((state) => state.info.data?.currencyId);
  const dispatch = useAppDispatch();

  const resLimit = useQuery(
    'fetchLimitFinance',
    () => fetchLimitFinance({ companyId, currency }),
    {
      onSuccess: (data) => {
        dispatch(setAccounts(data.data.data.accounts));
        dispatch(setLimitAccounts(data.data.data.accounts[0].limit));
        dispatch(setBalanceAccounts(data.data.data.accounts[0].balance));
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );
  return { resLimit };
};

export default useLimit;
