import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  fetchBonusPoints,
  fetchCashback,
  fetchDiscount,
} from "services/queries/PartnerQueries";
import { useForm, useFieldArray } from "react-hook-form";

export interface FormProps {
  levels?: any;
  requirements?: any;
  max_percent?: string | number;
  give_cashback_after?: string | number;
  base_level?: any;
  base_name?: any;
  base_percent?: any;
  useProgramLoyality?: any;
}

const useLoyality = () => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "onBlur",
    shouldFocusError: true,
  });

  console.log(errors, "error form");

  const {
    fields: dynamicFields,
    append,
    remove,
    prepend,
  } = useFieldArray({
    control,
    name: "levels",
  });

  const [swithcState, setSwitchState] = useState("");
  const [switchChange, setSwitchChange] = useState(0);

  const [refetchCashback, setRefetchCashback] = useState(0);
  const [refetchDiscount, setRefetchDiscount] = useState(0);
  const [refetchBonusPoints, setRefetchBonusPoints] = useState(0);
  const [active, setActive] = useState<
    "discount" | "cashback" | "bonusPoints" | ""
  >("");

  //Switch Component

  const handleSwitchChange = (checked: boolean, key: any) => {
    if (checked) {
      setActive(key);
      setSwitchChange(switchChange + 1);
    } else if (!checked) {
      setSwitchState("");
    }
  };

  useEffect(() => {
    if (switchChange > 0) {
      setValue("max_percent", "");
    }
  }, [switchChange]);

  //Fetching TO Program  loyality

  const { isLoading: discountLoading } = useQuery(
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

  const { isLoading: cashbackLoading } = useQuery(
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

  const { isLoading } = useQuery(
    ["Bonus", refetchBonusPoints],
    fetchBonusPoints,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        console.log(data.data.data, "data fetching");

        if (data?.data?.data?.isActive) {
          setActive("bonusPoints");
          setValue("max_percent", data.data.data.maxAmount);

          setValue("base_name", data.data.data.name);
          setValue("base_percent", data.data.data.percent);
          setValue("levels", data.data.data.levels);
        }
      },
    }
  );

  useEffect(() => {
    if (active === "cashback") {
      setRefetchCashback(refetchCashback + 1);
    } else if (active === "discount") {
      setRefetchDiscount(refetchDiscount + 1);
    } else if (active === "bonusPoints") {
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
  };
};

export default useLoyality;
