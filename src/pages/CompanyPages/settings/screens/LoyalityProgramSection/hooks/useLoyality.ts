import { useState } from "react";
import { useQuery } from "react-query";
import {
  fetchBonusPoints,
  fetchCashback,
} from "services/queries/PartnerQueries";
import { useForm, useFieldArray } from "react-hook-form";
import { initialFields } from "../constants";

interface IFields {
  id: number;
  name: string;
  percent: number;
  requirements: {
    amount: any;
    condition: any;
    type: number;
    unit: any;
    id: number;
  }[];
}

interface FormProps {
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

  //other requirements
  const [fields, setFileds] = useState<IFields[]>(initialFields);

  const [refetchCashback, setRefetchCashback] = useState(0);
  const [refetchDiscount, setRefetchDiscount] = useState(0);
  const [refetchBonusPoints, setRefetchBonusPoints] = useState(0);
  const [active, setActive] = useState<
    "discount" | "cashback" | "bonusPoints" | ""
  >("");

  //another content
  const [switchChange, setSwitchChange] = useState(0);
  const [assertModalVisible, setAssertModalVisible] = useState<boolean>(false);

  useQuery(["cashback", refetchCashback], fetchCashback, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      if (data?.data?.data?.isActive) {
        setActive("cashback");
        setValue("max_percent", data.data.data.maxAmount);
        setValue("give_cashback_after", data.data.data.cashbackReturnedDay);
        let copy = [...initialFields];
        copy[0].id = 0;
        copy[0].name = data?.data?.data.name;
        copy[0].percent = data?.data?.data.percent;
        copy[0].requirements = [
          { type: 1, amount: 0, unit: "UZS", condition: "", id: 0 },
        ];
        copy = [...copy, ...data.data.data.levels];
        setFileds(copy);
      }
    },
  });

  const { isLoading } = useQuery(
    ["Bonus", refetchBonusPoints],
    fetchBonusPoints,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        if (data?.data?.data?.isActive) {
          setActive("bonusPoints");
          setValue("max_percent", data.data.data.maxAmount);
          let copy = [...initialFields];
          copy[0].id = 0;
          copy[0].name = data?.data?.data.name;
          copy[0].percent = data?.data?.data.percent;
          copy[0].requirements = [
            { type: 1, amount: 0, unit: "UZS", condition: "", id: 1 },
          ];
          copy = [...copy, ...data.data.data.levels];
          setFileds(copy);
          setValue("levels", data.data.data.levels);
          setValue("base_name", data.data.data.name);
          setValue("base_percent", data.data.data.percent);

          // console.log(data.data.data, "data incoming");
          // setValue("base_level", data.data.data)
        }
      },
    }
  );

  return {
    control,
    fields,
    active,
    refetchBonusPoints,
    refetchCashback,
    refetchDiscount,
    setValue,
    setRefetchCashback,
    setRefetchDiscount,
    setRefetchBonusPoints,
    setFileds,
    handleSubmit,
    setActive,
    dynamicFields,
    append,
    prepend,
    remove,
    getValues,
    isLoading,
  };
};

export default useLoyality;
