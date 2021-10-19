import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchInfo } from 'services/queries/PartnerQueries';
import { useAppDispatch } from 'services/redux/hooks';
import { setCompanyInfo } from '../../services/redux/Slices/partnerSlice';

interface Props {
  name?: string;
  logo?: string;
  filled?: boolean;
  filledAddress?: boolean;
}

const useLayout = () => {
  const dispatch = useAppDispatch();

  const [headerData, setData] = useState<Props>({
    filled: true,
    filledAddress: true,
  });

  const resHeader = useQuery(
    'logoANDname',
    () => fetchInfo(localStorage.getItem('companyId')),
    {
      onSuccess: (data) => {
        dispatch(setCompanyInfo(data?.data.data));
        setData(data?.data.data);
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  return { resHeader, headerData };
};

export default useLayout;
