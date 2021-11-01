import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchInfo } from 'services/queries/PartnerQueries';
import { useAppDispatch } from 'services/redux/hooks';
import { setStaffId } from 'services/redux/Slices/authSlice';
import { setInfoData } from 'services/redux/Slices/info/info';
import { setCompanyInfo } from '../../services/redux/Slices/partnerSlice';

interface Props {
  name?: string;
  logo?: string;
  filled?: boolean;
  filledAddress?: boolean;
}

const companyId = localStorage.getItem('companyId');
interface LProps {
  id?: any;
  state?: any;
}
const useLayout = ({ id, state }: LProps) => {
  const dispatch = useAppDispatch();

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

  return { resHeader, headerData };
};

export default useLayout;
