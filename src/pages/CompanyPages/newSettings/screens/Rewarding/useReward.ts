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
      notify(t("saved"));
    },
  });

  const handleSave = (e: IForm) => {
    const arrnew = e.values?.rewards?.map((v: any) => {
      if (v?.rewardType === 1) {
        return {
          ...v,
          isActive: e?.rewardType1,
          amount: e?.amountType1 === null ? 0 : e?.amountType1,
        };
      } else if (v?.rewardType === 2) {
        return {
          ...v,
          isActive: e?.rewardType2,
          amount: e?.amountType2 === null ? 0 : e?.amountType2,
          levels: [{ limitCountReward: e?.limitCountReward }],
        };
      } else if (v?.rewardType === 3) {
        return {
          ...v,
          isActive: e?.rewardType3,
          amount: e?.amountType3 === null ? 0 : e?.amountType3,
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
          amount: e?.amountType4 === null ? 0 : e?.amountType4,
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
