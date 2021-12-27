import { useQuery } from 'react-query';
import { fetchQRCodes } from 'services/queries/newSettingQueries';
import { useAppDispatch } from 'services/redux/hooks';
import { setRefQrcodes } from 'services/redux/Slices/setting';

const useQrcode = () => {
  const dispatch = useAppDispatch();
  const response = useQuery('fetchQrcodes', fetchQRCodes, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      dispatch(setRefQrcodes(data.data.data));
    },
  });
  return { response };
};

export default useQrcode;
