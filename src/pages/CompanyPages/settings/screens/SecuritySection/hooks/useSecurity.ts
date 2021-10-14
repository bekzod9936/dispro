import { useQuery, useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { fetchSafeties } from "services/queries/PartnerQueries";
import { changeCompanySecurity } from "services/queries/SecuritySettingsQueries";

const useSecurity = () => {
  const { control, handleSubmit, setValue } = useForm();

  const { refetch } = useQuery(["safeties"], fetchSafeties, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      setValue("first", data.data.data.safeties.daily_purchase_limit);
    },
  });

  //save security
  const changeSecurity = useMutation((data: any) =>
    changeCompanySecurity(data)
  );

  const onFormSubmit = (data: any) => {
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
  };
};

export default useSecurity;
