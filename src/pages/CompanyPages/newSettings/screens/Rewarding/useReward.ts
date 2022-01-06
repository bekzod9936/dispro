import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useAppDispatch } from "services/redux/hooks";
import { setReward } from "services/redux/Slices/setting";
import { fetchRewards, postRewards } from "services/queries/newSettingQueries";
import { notify } from "services/utils/local_notification";
import { IForm } from "./rewarding.schema";

const useReward = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const response = useQuery("rewardFetch", fetchRewards, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    select: (data) => {
      const newdata: any = [data.data.data?.companyId, data.data.data?.rewards];
      return newdata;
    },
    onSuccess: (data: any) => {
      const [companyId, rewards] = data;
      const arr1 = Array(4)
        .fill(1)
        .map((v: any, i: any) => {
          return {
            amount: 0,
            companyId: companyId,
            isActive: false,
            levels: [],
            rewardType: i + 1,
            userType: 1,
          };
        });

      const value = arr1.map((a: any) => {
        const arr: any = rewards.find(
          (v: any) => v?.rewardType === a.rewardType && v.userType === 1
        );
        return arr ?? a;
      });

      const arrNew = {
        companyId: companyId,
        rewards: value,
      };

      dispatch(setReward(arrNew));
    },
  });

  const postReward = useMutation((data: any) => postRewards(data), {
    onSuccess: () => {
      response.refetch();
      notify(t("saved"));
    },
  });

  const handleSave = (e: IForm) => {
    const arrnew = e.values?.rewards?.map((v: any) => {
      if (v?.rewardType === 1) {
        return {
          ...v,
          isActive: e?.rewardType1,
          amount: e?.amountType1 ?? 0,
        };
      } else if (v?.rewardType === 2) {
        return {
          ...v,
          isActive: e?.rewardType2,
          amount: e?.amountType2 ?? 0,
          levels: [{ limitCountReward: e?.limitCountReward }],
        };
      } else if (v?.rewardType === 3) {
        return {
          ...v,
          isActive: e?.rewardType3,
          amount: e?.amountType3 ?? 0,
          levels: [
            {
              beforeDay: e?.beforeDay,
              congratulationText: e?.congratulationText,
            },
          ],
        };
      } else if (v?.rewardType === 4) {
        return {
          ...v,
          isActive: e?.rewardType4,
          amount: e?.amountType4 ?? 0,
          levels: [
            {
              requirements: [
                {
                  ...v?.levels[0]?.requirements[0],
                  amount: e?.amountRequirements,
                },
              ],
            },
          ],
        };
      }
    });

    const values: any = { companyId: e?.values?.companyId, rewards: arrnew };
    postReward.mutate(values);
  };

  return { response, postReward, handleSave };
};

export default useReward;
