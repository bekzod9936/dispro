import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQuery } from "react-query";
import { fetchRewards } from "services/queries/PartnerQueries";

export interface IForm {
  ballCheck: boolean;
  additionalCheck: boolean;
  recommendCheck: boolean;
  ballPoint?: any;
  summaOperations?: any;
  ballUzs?: any;
  referBallUzs?: any;
  countRefer?: any;
}

const useCashierSetting = () => {
  const companyId: any = localStorage.getItem("companyId");
  const [reward, setRewards] = useState([]);
  const [ballPoint, setBallPoint] = useState<any>("");
  const [ballUzs, setBallUzs] = useState<any>("");
  const { control, handleSubmit, setValue } = useForm<IForm>();

  const ballCheck = useWatch({
    control,
    name: "ballCheck",
  });

  const additionalCheck = useWatch({
    control,
    name: "additionalCheck",
  });

  const recommendCheck = useWatch({
    control,
    name: "recommendCheck",
  });

  //   fetch rewards
  useQuery(
    ["rewardsCashier"],
    () => {
      return fetchRewards();
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        data.data.data.rewards.forEach((element: any) => {
          if (element.rewardType === 5) {
            setValue("ballCheck", element.isActive);
          }
          // if (element.rewardType === 2) {
          //   setValue("recommendCheck", element.isActive);
          // }
          if (element.rewardType === 6) {
            setValue("additionalCheck", element.isActive);
          }
        });
        let result = data?.data?.data?.rewards;
        let forFirst = result.find((item: any) => item?.rewardType === 5);
        let forSecond = result.find((item: any) => item?.rewardType === 6);

        // setValue("ballPoint", forFirst?.amount);
        // setValue("ballUzs", forSecond?.amount);

        setBallPoint(forFirst?.amount);
        setBallUzs(forSecond?.amount);
      },
    }
  );

  return {
    ballCheck,
    additionalCheck,
    recommendCheck,
    handleSubmit,
    setValue,
    control,
    ballPoint,
    ballUzs,
  };
};

export default useCashierSetting;
