import { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { fetchInfo } from 'services/queries/PartnerQueries';
import { useAppDispatch } from 'services/redux/hooks';
import { setStaffId } from 'services/redux/Slices/authSlice';
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
  const history = useHistory();

  const [headerData, setData] = useState<Props>({
    filled: true,
    filledAddress: true,
  });

  const resHeader = useQuery('logoANDname', () => fetchInfo(id), {
    onSuccess: (data) => {
      dispatch(setCompanyInfo(data?.data.data));
      setData(data?.data.data);
      dispatch(setStaffId(data.data.data.staffId));

      if (state !== undefined) {
        if (data.data.data.filled && data.data.data.filledAddress) {
          history.push('/statistics');
        } else {
          history.push('/info');
        }
      }
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: companyId !== null ? true : false,
  });

  return { resHeader, headerData };
};

export default useLayout;
