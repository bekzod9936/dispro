import { useForm, useWatch } from "react-hook-form";
import { useQuery, useMutation } from "react-query";

//helpers
import { fetchRewards } from "services/queries/partnerQuery";
import { changeLoyal } from "services/queries/staffQuery";
import { useAppDispatch } from "services/redux/hooks";
import { setSummaOperations } from "services/redux/Slices/staffs";
import { notifySuccess } from 'services/utils/local_notification';
export interface IForm {
  ballCheck: boolean;
  additionalCheck: boolean;
  recommendCheck: boolean;
  ballPoint?: any;
  summaOperations?: any;
  ballUzs?: any;
  referBallUzs: any;
  countRefer: any;
}

const useCashierSetting = () => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit, setValue, watch, clearErrors, formState: {errors} } = useForm<IForm>({
	  mode: 'onChange'
  });

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

  //change settings
  const changeLoyality = useMutation((data: any) => changeLoyal(data), {
    onSuccess: (data) => {
      console.log(data, "data");
	  notifySuccess(`Данные успешно сохранены`);
    },
    onError: (error) => {
      console.log(error, "error");
    },
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
          if (element.rewardType === 5 && element?.userType === 3) {
            setValue("ballCheck", element.isActive);
          }
          if (element.rewardType === 7 && element?.userType === 3) {
            setValue("recommendCheck", element.isActive);
          }
          if (element.rewardType === 6 && element?.userType === 3) {
            setValue("additionalCheck", element.isActive);
          }
        });
        let result = data?.data?.data?.rewards;
        let forFirst = result.find(
          (item: any) => item?.rewardType === 5 && item?.userType === 3
        );
        let forSecond = result.find(
          (item: any) => item?.rewardType === 6 && item?.userType === 3
        );

        let forThird = result.find(
          (item: any) => item?.rewardType === 7 && item?.userType === 3
        );

        setValue("ballPoint", forFirst?.amount);
        setValue("ballUzs", forSecond?.amount);
        setValue(
          "summaOperations",
          forSecond?.levels[0]?.requirements[0]?.amount
        );
        setValue("referBallUzs", forThird?.amount);
        setValue("countRefer", forThird?.levels[0]?.requirements[0]?.amount);

        dispatch(
          setSummaOperations(forSecond?.levels[0]?.requirements[0]?.amount)
        );
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
    changeLoyality,
	errors,
	watch,
	clearErrors
  };
};

export default useCashierSetting;
