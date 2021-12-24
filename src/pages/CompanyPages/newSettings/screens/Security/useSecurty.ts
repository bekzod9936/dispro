import { useQuery, useMutation } from 'react-query';
import { fetchSafeties } from 'services/queries/partnerQuery';
import { useAppDispatch } from 'services/redux/hooks';
import { setSecurty } from 'services/redux/Slices/setting';
import { changeCompanySecurity } from 'services/queries/securitySettingQuery';
import { notify } from 'services/utils/local_notification';
import { useTranslation } from 'react-i18next';

const useSecurty = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const response = useQuery('securtyFetch', fetchSafeties, {
    onSuccess: (data) => {
      dispatch(setSecurty(data.data.data));
    },
  });

  const putSecurity = useMutation(
    (data) => {
      console.log(data);
      return changeCompanySecurity(data);
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
