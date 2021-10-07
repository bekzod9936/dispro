import { useState } from "react";
import { useQuery } from "react-query";
import {
  fetchBonusPoints,
  fetchCashback,
} from "services/queries/PartnerQueries";
import { useForm } from "react-hook-form";
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

const useLoyality = () => {
  const { control, handleSubmit, setValue } = useForm({});
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

  useQuery(["Bonus", refetchBonusPoints], fetchBonusPoints, {
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
      }
    },
  });

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
  };
};

export default useLoyality;
