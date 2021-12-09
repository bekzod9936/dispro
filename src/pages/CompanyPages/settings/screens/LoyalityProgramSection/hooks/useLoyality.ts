import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation, useQuery } from "react-query";
import { useForm, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

//types
import { FormProps } from "./types";

//queries
import {
  fetchBonusPoints,
  fetchCashback,
  fetchDiscount,
} from "services/queries/partnerQuery";
import {
  changeProgramLoyality,
  fetchProgramSettings,
  loyalitySaveChange,
  loyalityNewSaveChange,
  saveUseProgramLoyality,
} from "services/queries/settingsQuery";

//utils
import { parseSimpleString } from "services/utils";
import { useAppDispatch } from "services/redux/hooks";
//slices
import {
  setBallCheck,
  setCashbackCheck,
  setMEmptyCashback,
  setSaleCheck,
  setMEmptyBall,
  setMEmptySale,
} from "services/redux/Slices/settingsSlice";
import { levelReqs } from "../constants";
//selectors
import { setBaseLoyal, setUseLoyal } from "services/atoms/settings/loyality";
import {
  activeM,
  activeCheckM,
  setActiveM,
  setActiveCheckM,
  eCashback,
  eBonuspoint,
  eDiscount,
  setEBonuspoint,
  setEDiscount,
  setECashback,
  switchKeyT,
} from "services/atoms/settings";
import { setSwitchKeyT } from "services/atoms/settings/index";
import { notify } from "services/utils/local_notification";

const useLoyality = () => {
  let companyId: any = localStorage.getItem("companyId");
  const { t } = useTranslation();
  //atoms
  const active = useRecoilValue(activeM);
  const activeCheck = useRecoilValue(activeCheckM);

  const emptyCashback = useRecoilValue(eCashback);
  const emptyDiscount = useRecoilValue(eDiscount);
  const emptyBonuspoint = useRecoilValue(eBonuspoint);
  const switchKey = useRecoilValue(switchKeyT);

  //recoil selectors
  const setBaseLoyality = useSetRecoilState(setBaseLoyal);
  const setLoyaltyUse = useSetRecoilState(setUseLoyal);
  const setActive = useSetRecoilState(setActiveM);
  const setActiveCheck = useSetRecoilState(setActiveCheckM);
  const setSwitchKey = useSetRecoilState(setSwitchKeyT);

  const setEmptyCashback = useSetRecoilState(setECashback);
  const setEmptyDiscount = useSetRecoilState(setEDiscount);
  const setEmptyBonuspoint = useSetRecoilState(setEBonuspoint);

  //hook form
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
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

  const [modified, setModified] = useState("0");
  const [assertModalVisible, setAssertModalVisible] = useState<boolean>(false);

  //program and point USE
  const dispatch = useAppDispatch();

  //program loyality
  const [availCheck, setAvailCheck] = useState(false);
  const [refetchCashback, setRefetchCashback] = useState(0);
  const [refetchDiscount, setRefetchDiscount] = useState(0);
  const [refetchBonusPoints, setRefetchBonusPoints] = useState(0);

  //Save and change loyality
  const useProgramSave = useMutation((data: any) =>
    saveUseProgramLoyality(data)
  );

  const loayalityPut = useMutation(
    (data: any) => {
      if (emptyBonuspoint.empty && emptyBonuspoint.type === "bonuspoint") {
        return loyalityNewSaveChange(
          data,
          active.active === "" ? activeCheck : active.active
        );
      } else if (emptyDiscount.empty && emptyDiscount.type === "discount") {
        return loyalityNewSaveChange(
          data,
          active.active === "" ? activeCheck : active.active
        );
      } else if (emptyCashback.empty && emptyCashback.type === "cashback") {
        return loyalityNewSaveChange(
          data,
          active.active === "" ? activeCheck : active.active
        );
      } else {
        return loyalitySaveChange(
          data,
          active.active === "" ? activeCheck : active.active
        );
      }
    },
    {
      onSuccess: () => {
        notify(t("save"));
        refetch();
        refetchdiscount();
        refetchcashback();
      },
    }
  );

  const checkLevels = (levels?: any, baseName?: any, baseAmount?: any) => {
    let errorCheck = false;
    let i: number;
    for (i = 0; i < levels?.length; i++) {
      if (!levels[i]?.name || !levels[i]?.percent) {
        errorCheck = true;
        notify(t("fields_not_filled"));
      }
      if (
        levels[i - 1]?.percent &&
        parseInt(levels[i].percent) <= parseInt(levels[i - 1]?.percent)
      ) {
        errorCheck = true;
        notify(
          `${t("percentage_in")} "${levels[i].name}" ${t(
            "must_be_more_than"
          )} "${levels[i - 1].name}"`
        );
      }
      if (levels[i].requirements && levels[i].requirements?.length) {
        // console.log("levels Second 2", levels);

        if (!i && parseInt(levels[i].percent) <= parseInt(baseAmount)) {
          errorCheck = true;
          notify(
            `${t("percentage_in")} "${levels[i].name}" ${t(
              "must_be_more_than"
            )} "${baseName}"`
          );
        }

        let reqi: number;
        const reqLen =
          "requirements" in levels[i] ? levels[i].requirements!.length : 0;
        for (reqi = 0; reqi < reqLen; reqi++) {
          if (
            !levels[i].requirements![reqi].type ||
            !levels[i].requirements![reqi].amount
          ) {
            errorCheck = true;
            notify(t("fields_not_filled"));
          }

          // console.log("levels => ", levels);

          // console.log("i => ", i);

          let singleReq = null;

          if (
            i &&
            levels[i - 1].requirements?.find((item: any) => {
              return item.type == levels[i].requirements![reqi].type;
            }) &&
            levels[i - 1].requirements
              ?.find((item: any) => {
                return item.type == levels[i].requirements![reqi].type;
              })!
              .amount?.toString()
              ?.split(" ")
              ?.join("")
          ) {
            singleReq = levels[i - 1].requirements
              ?.find((item: any) => {
                return item.type == levels[i].requirements![reqi].type;
              })!
              .amount?.toString()
              ?.split(" ")
              ?.join("");
          }

          if (
            singleReq &&
            parseInt(singleReq) >=
              parseInt(
                levels[i]
                  .requirements![reqi]?.amount?.toString()
                  ?.split(" ")
                  ?.join("")
              )
          ) {
            errorCheck = true;

            console.log(
              levelReqs.find((item: any) => {
                console.log(levels[i].requirements![reqi].type, "reqi type");
                console.log(item, "item searching");

                return levels[i].requirements![reqi].type == item.id;
              }),
              "name 111"
            );
            notify(
              `${t("count")} "${
                levelReqs.find((item: any) => {
                  return levels[i].requirements![reqi].type == item.id;
                })?.name
              }" в "${levels[i].name}" ${t("must_be_more_than")} "${
                levels[i - 1].name
              }"`
            );
          }
        }
      }
    }

    return errorCheck;
  };

  const onFormSubmit = async (data: FormProps) => {
    if (!checkLevels(data.levels, data.base_name, data.base_percent)) {
      setActiveCheck(switchKey);
      try {
        useProgramSave.mutate({
          useProgram: data.useProgram,
          usePoint: data.usePoint,
        });
        if (activeCheck === "discount" || switchKey === "discount") {
          loayalityPut.mutate({
            cashbackReturnedDay: data.give_cashback_after,
            description: "",
            isActive: true,
            companyId: parseInt(companyId),
            levels:
              data?.levels?.length > 0
                ? data?.levels?.map((item: any) => {
                    return {
                      name: item.name,
                      percent: item.percent,
                      requirements: item.requirements.map((reqItem: any) => {
                        return {
                          amount: parseSimpleString(
                            reqItem?.amount?.toString()
                          ),
                          condition: reqItem?.condition,
                          type: reqItem?.type,
                          unit: reqItem?.unit,
                        };
                      }),
                    };
                  })
                : [],
            maxAmount: data.max_percent,
            name: data.base_name,
            percent: data.base_percent,
          });
          setActiveCheck("discount");
          if (emptyDiscount.empty) {
            handleSwitchChange(true, "discount");
          } else {
            setEmptyDiscount({
              empty: false,
              type: "discount",
            });
          }
        } else if (activeCheck === "cashback" || switchKey === "cashback") {
          loayalityPut.mutate({
            cashbackReturnedDay: data.give_cashback_after,
            description: "",
            isActive: true,
            companyId: parseInt(companyId),
            levels:
              data?.levels?.length > 0
                ? data.levels.map((item: any) => {
                    return {
                      name: item.name,
                      percent: item.percent,
                      requirements: item.requirements.map((reqItem: any) => {
                        return {
                          amount: parseSimpleString(
                            reqItem?.amount?.toString()
                          ),
                          condition: reqItem?.condition,
                          type: reqItem?.type,
                          unit: reqItem?.unit,
                        };
                      }),
                    };
                  })
                : [],
            maxAmount: data.max_percent,
            name: data.base_name,
            percent: data.base_percent,
          });
          setActiveCheck("cashback");
          if (emptyCashback.empty) {
            handleSwitchChange(true, "cashback");
          } else {
            setEmptyCashback({
              empty: false,
              type: "cashback",
            });
          }
        } else if (activeCheck === "bonuspoint" || switchKey === "bonuspoint") {
          loayalityPut.mutate({
            cashbackReturnedDay: data.give_cashback_after,
            description: "",
            isActive: true,
            companyId: parseInt(companyId),
            levels:
              data?.levels?.length > 0
                ? data.levels.map((item: any) => {
                    return {
                      name: item.name,
                      percent: item.percent,
                      requirements: item.requirements.map((reqItem: any) => {
                        return {
                          amount: parseSimpleString(
                            reqItem?.amount?.toString()
                          ),
                          condition: reqItem?.condition,
                          type: reqItem?.type,
                          unit: reqItem?.unit,
                        };
                      }),
                    };
                  })
                : [],
            maxAmount: data.max_percent,
            name: data.base_name,
            percent: data.base_percent,
          });
          setActiveCheck("bonuspoint");
          if (emptyBonuspoint.empty) {
            handleSwitchChange(true, "bonuspoint");
          } else {
            setEmptyBonuspoint({
              empty: false,
              type: "bonuspoint",
            });
          }
        }
      } catch (err) {
        console.log(err, "error");
        // alert(err);s
      }
    }
  };

  //Fetching TO Program  loyality

  const {
    isLoading: discountLoading,
    refetch: refetchdiscount,
    isFetching: discountFetching,
  } = useQuery(["discount", refetchDiscount], fetchDiscount, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      // setEmptyLoyal
      if (data?.data?.data === null) {
        setEmptyDiscount({
          empty: true,
          type: "discount",
        });

        setBaseLoyality({
          max_percent: "",
          base_percent: "",
          give_cashback_after: "",
        });

        reset();
      } else {
        dispatch(setMEmptySale(false));
        if (data?.data?.data?.isActive) {
          setAvailCheck(true);
          setActive({ active: "discount" });
          setSwitchKey("discount");

          setBaseLoyality({
            max_percent: data.data.data.maxAmount,
            base_percent: data.data.data.percent,
            give_cashback_after: data.data.data.cashbackReturnedDay,
            base_name: data.data.data.name,
          });

          dispatch(setSaleCheck(true));
          setValue("max_percent", data.data.data.maxAmount);
          setValue("give_cashback_after", data.data.data.cashbackReturnedDay);
          setValue("base_name", data.data.data.name);
          setValue("base_percent", data.data.data.percent);
          setValue("levels", data.data.data.levels);
        } else {
          if (refetchDiscount > 0) {
            console.log("logged discount");

            setBaseLoyality({
              max_percent: data.data.data.maxAmount,
              base_percent: data.data.data.percent,
              give_cashback_after: data.data.data.cashbackReturnedDay,
              base_name: data.data.data.name,
            });

            setValue("max_percent", data.data.data.maxAmount);
            setValue("give_cashback_after", data.data.data.cashbackReturnedDay);
            setValue("base_name", data.data.data.name);
            setValue("base_percent", data.data.data.percent);
            setValue("levels", data.data.data.levels);
          }
        }
      }
    },
  });

  const {
    isLoading: cashbackLoading,
    refetch: refetchcashback,
    isFetching: cashbackFetching,
  } = useQuery(["cashback", refetchCashback], fetchCashback, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      if (data?.data?.data === null) {
        setEmptyCashback({
          empty: true,
          type: "cashback",
        });

        setBaseLoyality({
          max_percent: "",
          base_percent: "",
          give_cashback_after: "",
          base_name: "",
        });

        reset();
      } else {
        dispatch(setMEmptyCashback(false));
        if (data?.data?.data?.isActive) {
          setAvailCheck(true);
          setActive({ active: "cashback" });
          setSwitchKey("cashback");
          setValue("max_percent", data.data.data.maxAmount);

          setBaseLoyality({
            max_percent: data.data.data.maxAmount,
            base_percent: data.data.data.percent,
            give_cashback_after: data.data.data.cashbackReturnedDay,
            base_name: data.data.data.name,
          });

          dispatch(setCashbackCheck(true));
          setValue("give_cashback_after", data.data.data.cashbackReturnedDay);
          setValue("base_name", data.data.data.name);
          setValue("base_percent", data.data.data.percent);
          setValue("levels", data.data.data.levels);
        } else {
          if (refetchCashback > 0) {
            setValue("max_percent", data.data.data.maxAmount);

            setBaseLoyality({
              max_percent: data.data.data.maxAmount,
              base_percent: data.data.data.percent,
              give_cashback_after: data.data.data.cashbackReturnedDay,
              base_name: data.data.data.name,
            });

            setValue("give_cashback_after", data.data.data.cashbackReturnedDay);
            setValue("base_name", data.data.data.name);
            setValue("base_percent", data.data.data.percent);
            setValue("levels", data.data.data.levels);
          }
        }
      }
    },
  });

  const { isLoading, isFetching, refetch } = useQuery(
    ["Bonus", refetchBonusPoints],
    fetchBonusPoints,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        if (data?.data?.data === null) {
          setEmptyBonuspoint({
            empty: true,
            type: "bonuspoint",
          });
          reset();

          setBaseLoyality({
            max_percent: "",
            base_percent: "",
            give_cashback_after: 0,
            base_name: "",
          });
        } else {
          dispatch(setMEmptyBall(false));
          if (data?.data?.data?.isActive) {
            setAvailCheck(true);
            setActive({ active: "bonuspoint" });
            setSwitchKey("bonuspoint");

            setBaseLoyality({
              max_percent: data.data.data.maxAmount,
              base_percent: data.data.data.percent,
              give_cashback_after: 0,
              base_name: data.data.data.name,
            });

            dispatch(setBallCheck(true));
            setValue("max_percent", data.data.data.maxAmount);
            setValue("base_name", data.data.data.name);
            setValue("base_percent", data.data.data.percent);
            setValue("levels", data.data.data.levels);
          } else {
            if (refetchBonusPoints > 0) {
              setBaseLoyality({
                max_percent: data.data.data.maxAmount,
                base_percent: data.data.data.percent,
                give_cashback_after: 0,
                base_name: data.data.data.name,
              });

              setValue("max_percent", data.data.data.maxAmount);
              setValue("base_name", data.data.data.name);
              setValue("base_percent", data.data.data.percent);
              setValue("levels", data.data.data.levels);
            }
          }
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
        setModified("0");
      },
    }
  );

  const handleSwitchChange = (checked: boolean, key: any) => {
    // bonus/cashbacks/active-status
    let modifyLoyal = modified === "1" ? false : true;
    if (checked) {
      if (availCheck) {
        setActive({ active: key });
      } else {
        setActive({ active: "" });
        setActiveCheck(key);
      }
      if (key === "discount") {
        loayalityChange.mutate({
          bonusType: "discount",
          data: {
            isActive: true,
            isMoved: modifyLoyal,
          },
        });
        loayalityChange.mutate({
          bonusType: "cashback",
          data: {
            isActive: false,
            isMoved: modifyLoyal,
          },
        });
        loayalityChange.mutate({
          bonusType: "bonuspoint",
          data: {
            isActive: false,
            isMoved: modifyLoyal,
          },
        });

        setEmptyDiscount({
          empty: false,
          type: "discount",
        });
      } else if (key === "cashback") {
        loayalityChange.mutate({
          bonusType: "cashback",
          data: {
            isActive: true,
            isMoved: modifyLoyal,
          },
        });
        loayalityChange.mutate({
          bonusType: "discount",
          data: {
            isActive: false,
            isMoved: modifyLoyal,
          },
        });
        loayalityChange.mutate({
          bonusType: "bonuspoint",
          data: {
            isActive: false,
            isMoved: modifyLoyal,
          },
        });
        setEmptyCashback({
          empty: false,
          type: "cashback",
        });
      } else if (key === "bonuspoint") {
        loayalityChange.mutate({
          bonusType: "bonuspoint",
          data: {
            isActive: true,
            isMoved: modifyLoyal,
          },
        });
        loayalityChange.mutate({
          bonusType: "discount",
          data: {
            isActive: false,
            isMoved: modifyLoyal,
          },
        });
        loayalityChange.mutate({
          bonusType: "cashback",
          data: {
            isActive: false,
            isMoved: modifyLoyal,
          },
        });

        setEmptyBonuspoint({
          empty: false,
          type: "bonuspoint",
        });
      } else if (key === "") {
        console.log("ishlayabdi shu qism");
        loayalityChange.mutate({
          bonusType: "bonuspoint",
          data: {
            isActive: false,
            isMoved: modifyLoyal,
          },
        });
        loayalityChange.mutate({
          bonusType: "discount",
          data: {
            isActive: false,
            isMoved: modifyLoyal,
          },
        });
        loayalityChange.mutate({
          bonusType: "cashback",
          data: {
            isActive: false,
            isMoved: modifyLoyal,
          },
        });
      }
    }
  };

  //using program loyality and balls

  useQuery(["programsUse"], fetchProgramSettings, {
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      console.log(data.data.data, "data");
      setValue("useProgram", data.data.data.useProgram);
      setValue("usePoint", data.data.data.usePoint);
      setLoyaltyUse({
        useProgram: data.data.data.useProgram,
        usePoint: data.data.data.usePoint,
      });
    },
  });

  console.log(refetchCashback, activeCheck, active.active, "refetch cashback");

  useEffect(() => {
    if (active.active === "cashback" || activeCheck === "cashback") {
      setRefetchCashback(refetchCashback + 1);
    } else if (active.active === "discount" || activeCheck === "discount") {
      setRefetchDiscount(refetchDiscount + 1);
    } else if (active.active === "bonuspoint" || activeCheck === "bonuspoint") {
      setRefetchBonusPoints(refetchBonusPoints + 1);
    }
  }, [active.active, activeCheck]);

  return {
    control,
    refetchBonusPoints,
    refetchCashback,
    refetchDiscount,
    setValue,
    setRefetchCashback,
    setRefetchDiscount,
    setRefetchBonusPoints,
    handleSwitchChange,
    handleSubmit,
    dynamicFields,
    append,
    prepend,
    remove,
    getValues,
    isLoading,
    discountLoading,
    cashbackLoading,
    loayalityChange,
    refetchdiscount,
    refetch,
    refetchcashback,
    onFormSubmit,
    loayalityPut,
    errors,
    checkLevels,
    modified,
    setModified,
    availCheck,
    setAssertModalVisible,
    assertModalVisible,
    isFetching,
    cashbackFetching,
    discountFetching,
  };
};

export default useLoyality;
