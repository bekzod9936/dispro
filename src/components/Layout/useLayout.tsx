import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchInfo } from 'services/queries/PartnerQueries';
import { useAppDispatch } from 'services/redux/hooks';
import { setCompanyInfo } from '../../services/redux/Slices/partnerSlice';

const useLayout = () => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState({ name: '' });

  const response = useQuery(
    'logoANDname',
    () => fetchInfo(localStorage.getItem('companyId')),
    {
      onSuccess: (data) => {
        dispatch(setCompanyInfo(data?.data.data));
        setData(data?.data.data);
        console.log(data?.data.data, 'id1234');
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  return { response, data };
};

export default useLayout;
