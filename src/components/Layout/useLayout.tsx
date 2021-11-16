import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchLimitFinance } from 'services/queries/InfoQuery';
import { fetchInfo } from 'services/queries/partnerQuery';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setStaffId } from 'services/redux/Slices/authSlice';
import {
  setAccounts,
  setBalanceAccounts,
  setInfoData,
  setLimitAccounts,
} from 'services/redux/Slices/info/info';
import { setCompanyInfo } from '../../services/redux/Slices/partnerSlice';

interface Props {
  name?: string;
  logo?: string;
  filled?: boolean;
  filledAddress?: boolean;
}

interface LProps {
  id?: any;
  state?: any;
}
const useLayout = ({ id, state }: LProps) => {
  const dispatch = useAppDispatch();
  const companyId = localStorage.getItem('companyId');

  const [headerData, setData] = useState<Props>({
    filled: false,
    filledAddress: false,
  });

  const resHeader = useQuery('logoANDname', () => fetchInfo(id), {
    onSuccess: (data) => {
      dispatch(setCompanyInfo(data?.data.data));
      dispatch(setInfoData(data?.data.data));
      setData(data?.data.data);
      dispatch(setStaffId(data.data.data.staffId));
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: companyId !== null ? true : false,
  });

  const currency = useAppSelector((state) => state.info.data?.currencyId);

  const resLimit = useQuery(
    'fetchLimitFinance',
    () => fetchLimitFinance({ companyId, currency }),
    {
      onSuccess: (data) => {
        dispatch(setAccounts(data?.data?.data?.accounts));
        dispatch(setLimitAccounts(data?.data?.data?.accounts[0]?.limit));
        dispatch(setBalanceAccounts(data?.data?.data?.accounts[0]?.balance));
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  return { resHeader, headerData, resLimit };
};

export default useLayout;
