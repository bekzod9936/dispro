import { useState } from 'react';
import { useQuery } from 'react-query';
import {
  fetchAddressInfo,
  fetchAddressMain,
} from 'services/queries/InfoQueries';

interface Props {
  address?: string;
  addressDesc?: string;
  companyId?: number;
  dynLink?: string;
  id?: number;
  isMain?: boolean;
  location?: { lat?: number; lng?: number };
  name?: string;
  telNumbers?: string[];
  workingTime?: {
    aroundTheClock?: boolean;
    work?: {
      day: number;
      dayOff: boolean;
      wHours: { from?: string; to?: string };
      bHours: { from?: string; to?: string };
    }[];
  } | null;
}

const useAddress = () => {
  const companyId: any = localStorage.getItem('companyId');
  const [dataAddress, setData] = useState<Props[]>([]);
  const responseAddress = useQuery(
    'fetchAddress',
    () => fetchAddressInfo({ companyId }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        setData(data?.data?.data);
        console.log(data.data.data, 'dddd');
      },
    }
  );

  const responseMain = useQuery(
    'fetchAddressMain',
    () => fetchAddressMain({ companyId }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        console.log(data.data.data);
      },
    }
  );

  return { responseAddress, dataAddress, responseMain };
};

export default useAddress;
