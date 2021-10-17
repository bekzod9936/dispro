import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchAddressInfo } from 'services/queries/InfoQueries';

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
  const [data, setData] = useState<Props[]>([]);
  const response = useQuery(
    'fetchAddress',
    () => fetchAddressInfo({ companyId }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        setData(data?.data?.data);
      },
    }
  );

  return { response, data };
};

export default useAddress;
