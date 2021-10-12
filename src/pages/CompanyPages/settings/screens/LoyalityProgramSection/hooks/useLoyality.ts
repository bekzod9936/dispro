import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import {
  fetchBonusPoints,
  fetchCashback,
  fetchDiscount,
} from "services/queries/PartnerQueries";
import { useForm, useFieldArray } from "react-hook-form";
import {
  changeProgramLoyality,
  fetchProgramSettings,
  loyalitySaveChange,
  saveUseProgramLoyality,
} from "services/queries/SettingsQueries";

export interface FormProps {
  levels?: any;
  requirements?: any;
  max_percent?: string | number;
  give_cashback_after?: string | number;
  base_level?: any;
  base_name?: any;
  base_percent?: any;
  useProgram?: any;
  usePoint?: any;
}

const useLoyality = () => {
  const { control, handleSubmit, setValue, getValues } = useForm<FormProps>({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const {
    fields: dynamicFields,
    append,
    remove,
    prepend,
  } = useFieldArray({
    control,
    name: "levels",
  });

  //program and point USE
  const [useProgram, setUseProgram] = useState<boolean>(false);
  const [usePoint, setUsePoint] = useState<boolean>(false);

  //program loyality

  const [refetchCashback, setRefetchCashback] = useState(0);
  const [refetchDiscount, setRefetchDiscount] = useState(0);
  const [refetchBonusPoints, setRefetchBonusPoints] = useState(0);
  const [active, setActive] = useState<
    "discount" | "cashback" | "bonuspoint" | ""
  >("");

  //Save and change loyality
  const useProgramSave = useMutation((data: any) =>
    saveUseProgramLoyality(data)
  );

  const loayalityPut = useMutation(
    (data: any) => loyalitySaveChange(data, active),
    {
      onSuccess: () => {
        refetch();
        refetchdiscount();
        refetchcashback();
      },
    }
  );

  const onFormSubmit = async (data: FormProps) => {
    console.log(data, "data");
    try {
      useProgramSave.mutate({
        useProgram: data.useProgram,
        usePoint: data.usePoint,
      });

      if (active === "discount") {
        loayalityPut.mutate({
          cashbackReturnedDay: 0,
          description: "",
          isActive: true,
          levels: data.levels,
          maxAmount: data.max_percent,
          name: data.base_name,
          percent: data.base_percent,
        });
      } else if (active === "cashback") {
        loayalityPut.mutate({
          cashbackReturnedDay: data.give_cashback_after || 0,
          description: "",
          isActive: true,
          levels: data.levels,
          maxAmount: data.max_percent,
          name: data.base_name,
          percent: data.base_percent,
        });
      } else if (active === "bonuspoint") {
        loayalityPut.mutate({
          cashbackReturnedDay: 0,
          description: "",
          isActive: true,
          levels: data.levels,
          maxAmount: data.max_percent,
          name: data.base_name,
          percent: data.base_percent,
        });
      }
      //alert("Goood");
    } catch (err) {
      alert(err);
    }
  };

  //Fetching TO Program  loyality

  const { isLoading: discountLoading, refetch: refetchdiscount } = useQuery(
    ["discount", refetchDiscount],
    fetchDiscount,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        if (data?.data?.data?.isActive) {
          setActive("discount");
          setValue("max_percent", data.data.data.maxAmount);
          setValue("give_cashback_after", data.data.data.cashbackReturnedDay);
          setValue("base_name", data.data.data.name);
          setValue("base_percent", data.data.data.percent);
          setValue("levels", data.data.data.levels);
        }
      },
    }
  );

  const { isLoading: cashbackLoading, refetch: refetchcashback } = useQuery(
    ["cashback", refetchCashback],
    fetchCashback,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        if (data?.data?.data?.isActive) {
          setActive("cashback");
          setValue("max_percent", data.data.data.maxAmount);
          setValue("give_cashback_after", data.data.data.cashbackReturnedDay);

          setValue("base_name", data.data.data.name);
          setValue("base_percent", data.data.data.percent);
          setValue("levels", data.data.data.levels);
        }
      },
    }
  );

  const { isLoading, refetch } = useQuery(
    ["Bonus", refetchBonusPoints],
    fetchBonusPoints,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        if (data?.data?.data?.isActive) {
          setActive("bonuspoint");
          setValue("max_percent", data.data.data.maxAmount);

          setValue("base_name", data.data.data.name);
          setValue("base_percent", data.data.data.percent);
          setValue("levels", data.data.data.levels);
        }
      },
    }
  );

  //Change program loyality
  const loayalityChange = useMutation(
    (data: any) =>
      changeProgramLoyality({ bonusType: data.bonusType, data: data.data }),
    {
      onSuccess: () => {
        refetch();
        refetchcashback();
        refetchdiscount();
      },
    }
  );

  const handleSwitchChange = (checked: boolean, key: any) => {
    // bonus/cashbacks/active-status
    if (checked) {
      setActive(key);
      if (key === "discount" && active) {
        loayalityChange.mutate({
          bonusType: "discount",
          data: {
            isActive: true,
            isMoved: true,
          },
        });
        loayalityChange.mutate({
          bonusType: "cashback",
          data: {
            isActive: false,
            isMoved: true,
          },
        });
        loayalityChange.mutate({
          bonusType: "bonuspoint",
          data: {
            isActive: false,
            isMoved: true,
          },
        });
      } else if (key === "cashback" && active) {
        loayalityChange.mutate({
          bonusType: "cashback",
          data: {
            isActive: true,
            isMoved: true,
          },
        });
        loayalityChange.mutate({
          bonusType: "discount",
          data: {
            isActive: false,
            isMoved: true,
          },
        });
        loayalityChange.mutate({
          bonusType: "bonuspoint",
          data: {
            isActive: false,
            isMoved: true,
          },
        });
      } else if (key === "bonuspoint" && active) {
        loayalityChange.mutate({
          bonusType: "bonuspoint",
          data: {
            isActive: true,
            isMoved: true,
          },
        });
        loayalityChange.mutate({
          bonusType: "discount",
          data: {
            isActive: false,
            isMoved: true,
          },
        });
        loayalityChange.mutate({
          bonusType: "cashback",
          data: {
            isActive: false,
            isMoved: true,
          },
        });
      } else if (key === "") {
        loayalityChange.mutate({
          bonusType: "bonuspoint",
          data: {
            isActive: false,
            isMoved: true,
          },
        });
        loayalityChange.mutate({
          bonusType: "discount",

          data: {
            isActive: false,
            isMoved: true,
          },
        });
        loayalityChange.mutate({
          bonusType: "cashback",
          data: {
            isActive: false,
            isMoved: true,
          },
        });
      }
    }
  };

  //using program loyality and balls

  useQuery(["programsUse"], fetchProgramSettings, {
    retry: 0,
    refetchOnWindowFocus: false,
    cacheTime: 10,
    onSuccess: (data: any) => {
      setValue("useProgram", data.data.data.useProgram);
      setValue("usePoint", data.data.data.usePoint);

      setUseProgram(data.data.data.useProgram);
      setUsePoint(data.data.data.usePoint);
    },
  });

  useEffect(() => {
    if (active === "cashback") {
      setRefetchCashback(refetchCashback + 1);
    } else if (active === "discount") {
      setRefetchDiscount(refetchDiscount + 1);
    } else if (active === "bonuspoint") {
      setRefetchBonusPoints(refetchBonusPoints + 1);
    }
  }, [active]);

  return {
    control,
    active,
    refetchBonusPoints,
    refetchCashback,
    refetchDiscount,
    setValue,
    setRefetchCashback,
    setRefetchDiscount,
    setRefetchBonusPoints,
    handleSwitchChange,
    handleSubmit,
    setActive,
    dynamicFields,
    append,
    prepend,
    remove,
    getValues,
    isLoading,
    discountLoading,
    cashbackLoading,
    usePoint,
    useProgram,
    loayalityChange,
    refetchdiscount,
    refetch,
    refetchcashback,
    onFormSubmit,
    loayalityPut,
  };
};

export default useLoyality;
