import { useQuery, useMutation } from 'react-query';
import { useAppDispatch } from 'services/redux/hooks';
import { setSecurty } from 'services/redux/Slices/setting';
import { notify } from 'services/utils/local_notification';
import { useTranslation } from 'react-i18next';
import {
  fetchSecurity,
  postSecurity,
} from 'services/queries/newSettingQueries';

const useSecurty = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const response = useQuery('securtyFetch', fetchSecurity, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      dispatch(setSecurty(data.data.data));
    },
  });

  const putSecurity = useMutation(
    (data) => {
      return postSecurity(data);
    },
    {
      onSuccess: () => {
        response.refetch();
        notify(t('saved'));
      },
    }
  );

  return { response, putSecurity };
};

export default useSecurty;
