import { IReferal } from "./../constants";
import { useTranslation } from "react-i18next";
import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";

//async functions
import { useQuery, useMutation } from "react-query";
import { fetchBonusReferals } from "services/queries/partnerQuery";
import {
  changeReferal,
  getReferalLevel,
  setNewReferal,
  setReferalActive,
} from "services/queries/referalProgramQuery";
//types
interface FormProps {
  referals?: any;
}

const useReferalData = () => {
  const referalRef = useRef<null | HTMLDivElement>(null);

  const { t } = useTranslation();
  const companyId = localStorage.getItem("companyId");
  const [errorRef, setErrorRef] = useState(false);
  const [referalError, setReferalError] = useState("");
  const [saving, setSaving] = useState(false);
  const [newState, setNewState] = useState<string>("old");
  const [checkedState, setCheckedState] = useState<boolean>(false);
  const [levelsRef, setLevelsRef] = useState<IReferal[]>([]);
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

  // /bonus/bonusreferals/active-status
  // isActive
  const handleSwitch = (checked: boolean) => {
    setCheckedState(checked);
  };

  const handleClick = useCallback(() => {
    const currentRef = referalRef.current;
    if (currentRef) {
      if (currentRef.style.visibility === "visible") {
        currentRef.style.visibility = "hidden";
      } else {
        currentRef.style.visibility = "visible";
      }
    }
  }, []);

  //by leve-get data
  const {
    refetch: refetchLevel,
    isLoading: loadingReferal,
    isFetching: fetchingReferal,
  } = useQuery(["referal_level"], () => getReferalLevel(), {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log(data.data, "data levels");
      setLevelsRef(data.data.data);
    },
  });

  //get Bonus referals

  const { refetch, isLoading, isFetching } = useQuery(
    ["bonusreferals"],
    () => fetchBonusReferals(),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        console.log(data?.data?.data, "referal program");
        setCheckedState(data?.data?.data?.isActive);

        if (data.data.data?.levels) {
          setValue(
            "referals",
            data.data.data?.levels?.sort(
              (a: any, b: any) => a.number - b.number
            )
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
        }
      },
    }
  );

  const setActivate = useMutation((data: any) => setReferalActive(data));

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
        refetchLevel();
        setNewState("old");
        handleClick();
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
        refetchLevel();
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

          setBonusreferal.mutateAsync({
            companyId: companyId,
            referals: data.referals,
            isActive: checkedState,
          });
          setErrorRef(false);
        } else {
          setActivate.mutateAsync({
            isActive: checkedState,
          });
          saveBonusReferal.mutateAsync({
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
    handleSubmit,
    errors,
    errorRef,
    referalError,
    setErrorRef,
    refetchLevel,
    levelsRef,
    handleClick,
    referalRef,
    loadingReferal,
    isLoading,
    fetchingReferal,
    isFetching,
  };
};

export default useReferalData;
