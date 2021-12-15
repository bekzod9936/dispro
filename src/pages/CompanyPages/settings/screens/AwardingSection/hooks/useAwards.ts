import { TOTAL_FIELDS_PATTERN, IForm } from "../constants";
import { useForm, useWatch } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { fetchRewards } from "services/queries/partnerQuery";
import { saveBonusRewards } from "services/queries/awardingSettingsQuery";
import { notify } from "services/utils/local_notification";
import { useTranslation } from "react-i18next";

const useAwards = () => {
  const companyId: any = localStorage.getItem("companyId");
  const { t } = useTranslation();
  const { control, handleSubmit, setValue } = useForm<IForm>();

  const inviteCheck = useWatch({
    control,
    name: "inviteCheck",
  });

  const recommendCheck = useWatch({
    control,
    name: "recommendCheck",
  });

  const vipCheck = useWatch({
    control,
    name: "vipCheck",
  });

  const { refetch, isLoading } = useQuery(["rewards"], () => fetchRewards(), {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      data.data.data.rewards.forEach((element: any) => {
        if (element.rewardType === 1) {
          setValue("inviteCheck", element.isActive);
        }
        if (element.rewardType === 2) {
          setValue("recommendCheck", element.isActive);
        }
        if (element.rewardType === 3) {
          setValue("birthdayCheck", element.isActive);
        }
        if (element.rewardType === 4) {
          setValue("vipCheck", element.isActive);
        }
      });
      let result = data?.data?.data?.rewards;
      let forFirst = result.find((item: any) => item?.rewardType === 1);
      let forSecond = result.find((item: any) => item?.rewardType === 2);
      let forThird = result.find((item: any) => item?.rewardType === 3);
      let forFourth = result.find((item: any) => item?.rewardType === 4);
      let forCongrat = result.find(
        (item: any) => item?.levels[0]?.congratulationText
      );
      let forBeforeDay = result.find((item: any) => item?.levels[0]?.beforeDay);

      console.log(forSecond, "forSecond");
      //let forDescription = result.find((item:any)=>item.)  ;
      // let forMoreThan :any = result.find((item: any) => item?.levels[0]?.requirements[0]?.amount);
      setValue("ifMoreThan", forFourth?.levels[0]?.requirements[0]?.amount);
      setValue("awardSizeFirst", forFirst?.amount);
      setValue("awardSizeSecond", forCongrat?.amount);
      setValue("awardSizeThird", forSecond?.amount);
      setValue("awardSizeFourth", forFourth?.amount);
      setValue("description", forCongrat?.levels[0]?.congratulationText);
      setValue("payfor", forBeforeDay?.levels[0]?.beforeDay);
      setValue("awardLimit", forSecond?.levels[0]?.limitCountReward);
    },
  });

  const birthdayCheck = useWatch({
    control,
    name: "birthdayCheck",
  });

  //Submitting Form

  const saveBonus = useMutation(
    (data: any) =>
      saveBonusRewards({
        companyId: data.companyId,
        rewards: data.rewards,
      }),
    {
      onSuccess: () => {
        refetch();
        notify(t("saved"));
      },
    }
  );

  const onFormSubmit = async (data: IForm) => {
    console.log('test',data.birthdayCheck)
    if (data.awardSizeFirst) {
      TOTAL_FIELDS_PATTERN[0].amount = +data.awardSizeFirst;

      TOTAL_FIELDS_PATTERN[0].isActive = data.inviteCheck;
    }
    if (data.awardSizeSecond) {
      TOTAL_FIELDS_PATTERN[1].amount = +data.awardSizeSecond;
      TOTAL_FIELDS_PATTERN[1].isActive = data.recommendCheck;
      TOTAL_FIELDS_PATTERN[1].levels[0].limitCountReward = data.awardLimit;
      //   awardLimit
    }
    if (data.awardSizeThird) {
      TOTAL_FIELDS_PATTERN[2].amount = +data.awardSizeThird;

      TOTAL_FIELDS_PATTERN[2].isActive = data.birthdayCheck;
    }
    if (data.awardSizeFourth) {
      TOTAL_FIELDS_PATTERN[3].amount = +data.awardSizeFourth;
      TOTAL_FIELDS_PATTERN[3].isActive = data.vipCheck;
    }
    if (data.description) {
      TOTAL_FIELDS_PATTERN[2].levels[0].congratulationText = data.description;
    }
    if (data.ifMoreThan) {
      TOTAL_FIELDS_PATTERN[3].levels[0].requirements[0].amount =
        data.ifMoreThan;
    }
    if (data.payfor) {
      TOTAL_FIELDS_PATTERN[2].levels[0].beforeDay = data.payfor;
    }

    console.log(TOTAL_FIELDS_PATTERN, "total fields")

    try {
      saveBonus.mutate({
        companyId: Number(companyId),
        rewards: TOTAL_FIELDS_PATTERN,
      });
    } catch (err) {}
  };

  return {
    control,
    handleSubmit,
    onFormSubmit,
    inviteCheck,
    recommendCheck,
    vipCheck,
    birthdayCheck,
    saveBonus,
    isLoading,
  };
};

export default useAwards;
