import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchInfo } from 'services/queries/PartnerQueries';
import { useAppDispatch } from 'services/redux/hooks';
import { setCompanyInfo } from '../../services/redux/Slices/partnerSlice';

const useLayout = () => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState();

  const response = useQuery(
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

  return { response, data };
};

export default useLayout;
