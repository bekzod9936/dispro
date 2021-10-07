import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

//async functions
import { useQuery } from "react-query";
import partnerApi from "services/interceptors/companyInterceptor";
import { fetchBonusReferals } from "services/queries/PartnerQueries";

//types
import { ILevels } from "../constants";

const useReferalData = () => {
  const companyId = localStorage.getItem("companyId");
  const [saving, setSaving] = useState(false);
  const [newState, setNewState] = useState<string>("old");
  const [checkedState, setCheckedState] = useState<boolean>(false);
  const { control, setValue } = useForm();
  const [refetch, setRefetch] = useState(0);
  const [level, setLevels] = useState<ILevels[] | [] | any>([]);

  useQuery(["bonusreferals", refetch], () => fetchBonusReferals(), {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      setLevels(data?.data?.data?.levels);
      data.data.data.levels.forEach((item: any) => {
        setValue(item.name, item.percent);
      });
      if (data?.data?.data === null) {
        setNewState("new");
      } else if (data?.data?.data?.levels.length > 0) {
        setCheckedState(true);
      }
    },
  });

  const handleChange = (e: any, item: any, index: any) => {
    const existing = level?.find((value: any) => value.number === item.number);

    if (existing && e.target.value) {
      let updated = { ...existing, percent: +e.target.value };

      let newState = [...level];
      newState.splice(index, 1, updated);

      setLevels(newState);
    }
  };

  //   Add click
  const handleAddClick = (item: any) => {
    console.log(item, "item per");
    let newObj = {
      name: `${+item.name + 1}`,
      number: item.number + 1,
      percent: item.percent,
    };
    setLevels([...level, newObj]);
  };

  const handleSave = async () => {
    setSaving(true);
    console.log(level, "level");

    try {
      let block = level.find((value: any) => value.percent === "");
      console.log(block, "block");
      if (!block) {
        if (newState === "new") {
          await partnerApi.post("/bonus/bonusreferals", {
            companyId: companyId,
            levels: level,
          });
        } else {
          await partnerApi.put("/bonus/bonusreferals", {
            companyId: companyId,
            levels: level,
          });
        }
        setRefetch(refetch + 1);
        setSaving(false);
      }
      setSaving(false);
    } catch (error) {
      console.log(error, "error");
      setSaving(false);
    }
  };

  const handleXClick = () => {
    const copy = [...level];
    copy.pop();
    setLevels(copy);
  };

  const handleSwitch = (checked: boolean) => {
    setCheckedState(checked);
    if (checked && (!level || level?.length === 0)) {
      setLevels([{ name: "1", number: 1, percent: 0 }]);
    } else if (!checked && level?.length > 0) {
      setLevels([]);
    }
  };

  return {
    level,
    refetch,
    newState,
    control,
    checkedState,
    setRefetch,
    setValue,
    setLevels,
    handleChange,
    handleAddClick,
    handleSave,
    handleXClick,
    handleSwitch,
    companyId,
    saving,
  };
};

export default useReferalData;
