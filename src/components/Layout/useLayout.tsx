import { useState } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { setStaffId } from "services/redux/Slices/authSlice";
import { setAccounts, setInfoData } from "services/redux/Slices/info/info";
import { setCompanyInfo } from "../../services/redux/Slices/partnerSlice";

//queries
import { fetchLimitFinance } from "services/queries/InfoQuery";
import { fetchInfo } from "services/queries/partnerQuery";

//selectors
import {
  setLimitAccounts,
  setBalanceAccounts,
} from "services/atoms/info/selector";

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
  const companyId = localStorage.getItem("companyId");

  const setLimit = useSetRecoilState(setLimitAccounts);
  const setBalance = useSetRecoilState(setBalanceAccounts);

  const [headerData, setData] = useState<Props>({
    filled: false,
    filledAddress: false,
  });

  const resHeader = useQuery("logoANDname", () => fetchInfo(id), {
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
    "fetchLimitFinance",
    () => fetchLimitFinance({ companyId, currency }),
    {
      onSuccess: (data) => {
        dispatch(setAccounts(data?.data?.data?.accounts));
        // dispatch(setLimitAccounts(data?.data?.data?.accounts[0]?.limit));
        setLimit({ limit: data?.data?.data?.accounts[0]?.limit });
        setBalance({ balance: data?.data?.data?.accounts[0]?.balance });
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  return { resHeader, headerData, resLimit };
};

export default useLayout;
