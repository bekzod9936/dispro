import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setStaffId } from 'services/redux/Slices/authSlice';
import {
  setAccounts,
  setInfoData,
  setPayGo,
} from 'services/redux/Slices/info/info';
import { setCompanyInfo } from '../../services/redux/Slices/partnerSlice';

//queries
import { fetchBadge, fetchLimitFinance } from 'services/queries/InfoQuery';
import { fetchInfo, fetchPayGoGet } from 'services/queries/partnerQuery';

//selectors
import {
  setLimitAccounts,
  setBalanceAccounts,
} from 'services/atoms/info/selector';
import { setBadgeData } from 'services/atoms/info/badge';

interface Props {
  name?: string;
  logo?: string;
  filled?: boolean;
  filledAddress?: boolean;
}

interface LProps {
  id?: any;
}
const useLayout = ({ id }: LProps) => {
  const dispatch = useAppDispatch();
  const companyId = localStorage.getItem('companyId');

  const setLimit = useSetRecoilState(setLimitAccounts);
  const setBalance = useSetRecoilState(setBalanceAccounts);
  const setBadge = useSetRecoilState(setBadgeData);
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
    ['fetchLimitFinance', currency],
    () => fetchLimitFinance({ companyId, currency }),
    {
      onSuccess: (data) => {
        dispatch(setAccounts(data?.data?.data?.accounts));
        setLimit({ limit: data?.data?.data?.accounts[0]?.limit });
        setBalance({ balance: data?.data?.data?.accounts[0]?.balance });
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  const resBadge = useQuery('fetchBadge', fetchBadge, {
    onSuccess: (data) => {
      setBadge(data.data.data);
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  const payGoResponse = useQuery('payGoGetFetch', () => fetchPayGoGet(), {
    onSuccess: (data) => {
      console.log(data.data.data);
      dispatch(setPayGo(data.data.data.payGo));
    },
  });

  return { resHeader, headerData, resLimit, resBadge, payGoResponse };
};

export default useLayout;
