import { useQuery, useMutation } from "react-query";
import { useForm, useWatch } from "react-hook-form";
import { fetchSafeties } from "services/queries/PartnerQueries";
import { changeCompanySecurity } from "services/queries/SecuritySettingsQueries";
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
  const { refetch } = useQuery(["safeties"], fetchSafeties, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      setValue("suspendedSum", false);
      setValue("second", 0);

      if (data?.data?.data?.safeties?.daily_purchase_limit) {
        setValue("first", data?.data?.data?.safeties?.daily_purchase_limit);
        setValue("suspendedClient", true);
      } else {
        setValue("first", 0);
        setValue("suspendedClient", false);
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

  const onFormSubmit = (data: any) => {
    console.log(data, "data submitted");
    changeSecurity.mutate({
      safeties: {
        daily_purchase_limit: +data.first,
      },
    });
  };

  return {
    control,
    handleSubmit,
    onFormSubmit,
    suspendedClient,
    suspendedSum,
  };
};

export default useSecurity;
