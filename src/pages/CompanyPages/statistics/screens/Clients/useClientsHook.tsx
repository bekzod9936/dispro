import { useState } from "react";
import { useQuery } from "react-query";
import { fetchCilentsData } from "services/queries/StatisticsQueries";
import { useAppDispatch } from "services/redux/hooks";
import { setClientStats } from "services/redux/Slices/statistics/statistics";

interface Props {
  filterValues?: any;
  traffic?: any;
}

interface Props {
  ageAvg?: number;
  allClientParkCards?: number;
  cashbackSum?: number;
  chequeAvg?: number;
  chequeCount?: number;
  clientCount?: number;
  couponAmountSum?: number;
  couponDiscountSum?: number;
  discountSum?: number;
  femaleCount?: number;
  filter?: {
    gender?: { id?: number; name?: string }[];
    levels?: { name?: string; number?: number }[];
    referal?: { name?: string; refIds: number[] }[];
  };
  maleCount?: number;
  paidWithMoney?: number;
  paidWithPoint?: number;
  pointSum?: number;
  uniqueChequeClient?: number;
}

const useClientsHook = ({ filterValues, traffic }: Props) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Props>({});
  const response = useQuery(
    "fetchClientsInfo",
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => `${v}=${filterValues[v]}&`)
        .join("");
      return fetchCilentsData({ section: `clients?${url}&${traffic}` });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: true,
      staleTime: 5000,
      retry: 0,
      onSuccess: (data) => {
        
        setData(data.data.data);
        dispatch(setClientStats(data.data.data));
      },
    }
  );
    console.log("updatingData", data);
    
  return { response, data };
};

export default useClientsHook;
