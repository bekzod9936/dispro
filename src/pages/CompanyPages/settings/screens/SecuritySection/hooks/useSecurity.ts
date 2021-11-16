import { useQuery, useMutation } from "react-query";
import { useForm, useWatch } from "react-hook-form";
import { fetchSafeties } from "services/queries/partnerQuery";
import { changeCompanySecurity } from "services/queries/securitySettingQuery";
import { IForm } from "../constants";

const useSecurity = () => {
  const { control, handleSubmit, setValue } = useForm<IForm>();

  const suspendedClient = useWatch({
    control,
    name: "suspendedClient",
  });

  const suspendedSum = useWatch({
    control,
    name: "suspendedSum",
  });

  //fetching security
  const { refetch, isLoading } = useQuery(["safeties"], fetchSafeties, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: async (data: any) => {
      setValue("suspendedSum", false);
      setValue("second", 0);

      const safeties = await data?.data?.data?.safeties;

      console.log(data.data.data);
      if (safeties?.daily_purchase_limit) {
        setValue("first", safeties?.daily_purchase_limit);
        setValue("suspendedClient", data?.data?.data?.isEnabledPurchaseLimit);
      } else {
        setValue("first", 0);
      }

      if (safeties?.pay_sum_limit) {
        setValue("second", safeties?.pay_sum_limit);
        setValue("suspendedSum", data?.data?.data?.isEnabledPaySumLimit);
      } else {
        setValue("second", 0);
      }
    },
  });

  //save security
  const changeSecurity = useMutation(
    (data: any) => changeCompanySecurity(data),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const onFormSubmit = (data: IForm) => {
    console.log(data, "data submitted");
    changeSecurity.mutate({
      safeties: {
        daily_purchase_limit: +data.first,
        pay_sum_limit: +data.second,
      },
      isEnabledPurchaseLimit: data.suspendedClient,
      isEnabledPaySumLimit: data.suspendedSum,
    });
  };

  return {
    control,
    handleSubmit,
    onFormSubmit,
    suspendedClient,
    suspendedSum,
    isLoading,
  };
};

export default useSecurity;
