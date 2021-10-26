import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const companyId = localStorage.getItem("companyId");
  const [errorRef, setErrorRef] = useState(false);
  const [referalError, setReferalError] = useState("");
  const [saving, setSaving] = useState(false);
  const [newState, setNewState] = useState<string>("old");
  const [checkedState, setCheckedState] = useState<boolean>(false);
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "onChange",
    reValidateMode: "onChange",
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
      setCheckedState(data?.data?.data?.isActive);

      if (data.data.data?.levels) {
        setValue(
          "referals",
          data.data.data?.levels?.sort((a: any, b: any) => a.number - b.number)
        );
      } else {
        setValue("referals", [
          {
            id: "37622af0-1e13-4321-9a8b-3b14c82cbb7f",
            name: "1",
            number: 1,
            percent: 0,
          },
        ]);
      }

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
        isActive: data.isActive,
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
        isActive: data.isActive,
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
      let levels = data.referals;
      for (let i = 0; i <= levels?.length; i++) {
        if (
          levels[i - 1]?.percent &&
          parseInt(levels[i]?.percent) > parseInt(levels[i - 1]?.percent)
        ) {
          setErrorRef(true);
          setReferalError(
            `${t("percentage_in")} "${levels[i]?.number} ${t("level")}" ${t(
              "must_be_more_than"
            )}"${levels[i - 1]?.number} ${t("level")}"`
          );
          setSaving(false);
          return;
        }
      }

      console.log(data.referals, "first side");

      if (!block) {
        console.log("second side", data.referals);
        if (newState === "new") {
          console.log("third side", data.referals);
          setBonusreferal.mutate({
            companyId: companyId,
            referals: data.referals,
            isActive: checkedState,
          });
          setErrorRef(false);
        } else {
          saveBonusReferal.mutate({
            companyId: companyId,
            referals: data.referals,
            isActive: checkedState,
          });
          setErrorRef(false);
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
    errors,
    errorRef,
    referalError,
    setErrorRef,
  };
};

export default useReferalData;
