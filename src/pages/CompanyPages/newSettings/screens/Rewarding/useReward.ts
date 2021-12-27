import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { useAppDispatch } from 'services/redux/hooks';
import { setReward } from 'services/redux/Slices/setting';
import { fetchRewards, postRewards } from 'services/queries/newSettingQueries';
import { notify } from 'services/utils/local_notification';

const useReward = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const response = useQuery('rewardFetch', fetchRewards, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      const arr1 = Array(4).fill(1);
      const arr2 = arr1.map((v: any, i: any) => {
        return {
          amount: 0,
          companyId: data.data.data?.companyId,
          isActive: false,
          levels: [],
          rewardType: i + 1,
          userType: 1,
        };
      });
      const value = arr2.map((a: any) => {
        const arr: any = data.data.data?.rewards.find(
          (v: any) => v?.rewardType === a.rewardType && v.userType === 1
        );
        if (arr === undefined) {
          return a;
        } else {
          return arr;
        }
      });

      const arrNew = {
        companyId: data.data.data?.companyId,
        rewards: value,
      };

      dispatch(setReward(arrNew));
    },
  });

  const postReward = useMutation((data: any) => postRewards(data), {
    onSuccess: () => {
      response.refetch();
      notify(t('saved'));
    },
  });
  return { response, postReward };
};

export default useReward;
