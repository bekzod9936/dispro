import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

//async functions
import { useQuery, useMutation } from "react-query";
import partnerApi from "services/interceptors/companyInterceptor";
import { fetchBonusReferals } from "services/queries/PartnerQueries";
import {
  changeReferal,
  setNewReferal,
} from "services/queries/ReferalProgramQueries";
//types
interface FormProps {
  referals?: any;
}

const useReferalData = () => {
  const companyId = localStorage.getItem("companyId");
  const [saving, setSaving] = useState(false);
  const [newState, setNewState] = useState<string>("old");
  const [checkedState, setCheckedState] = useState<boolean>(false);
  const { control, setValue, handleSubmit } = useForm<FormProps>({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const handleSwitch = (checked: boolean) => {
    setCheckedState(checked);
  };

  //form field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "referals",
  });

  //get Bonus referals

  const { refetch } = useQuery(["bonusreferals"], () => fetchBonusReferals(), {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      console.log(data?.data?.data, "referal program");

      setValue(
        "referals",
        data.data.data.levels.sort((a: any, b: any) => a.number - b.number)
      );

      if (data?.data?.data === null) {
        setNewState("new");
      } else if (data?.data?.data?.levels.length > 0) {
        setCheckedState(true);
      }
    },
  });

  //Save Referal program

  const setBonusreferal = useMutation(
    (data: any) =>
      setNewReferal({
        companyId: data.companyId,
        referals: data.referals,
      }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const saveBonusReferal = useMutation(
    (data: any) =>
      changeReferal({
        companyId: data.companyId,
        referals: data.referals,
      }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const handleSave = async (data: FormProps) => {
    setSaving(true);

    try {
      let block = data.referals.find((value: any) => value.percent === "");
      if (!block) {
        if (newState === "new") {
          setBonusreferal.mutate({
            companyId: companyId,
            referals: data.referals,
          });
        } else {
          saveBonusReferal.mutate({
            companyId: companyId,
            referals: data.referals,
          });
        }

        setSaving(false);
      }
      setSaving(false);
    } catch (error) {
      console.log(error, "error");
      setSaving(false);
    }
  };

  return {
    newState,
    control,
    checkedState,
    setValue,
    handleSave,
    handleSwitch,
    companyId,
    saving,
    fields,
    append,
    remove,
    handleSubmit,
  };
};

export default useReferalData;
