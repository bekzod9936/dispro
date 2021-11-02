import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import {
  fetchBonusPoints,
  fetchCashback,
  fetchDiscount,
} from "services/queries/PartnerQueries";
import { setLoyaltyUse } from "services/redux/Slices/loyalitySlice";
import { useForm, useFieldArray } from "react-hook-form";
import {
  changeProgramLoyality,
  fetchProgramSettings,
  loyalitySaveChange,
  loyalityNewSaveChange,
  saveUseProgramLoyality,
} from "services/queries/SettingsQueries";
import { parseSimpleString } from "services/utils";
import { useAppDispatch } from "services/redux/hooks";
import { setBaseLoyality } from "services/redux/Slices/settingsSlice";
import { useTranslation } from "react-i18next";
import { levelReqs } from "../constants";

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

interface IEmpty {
  empty?: boolean;
  type?: string;
}

const useLoyality = () => {
  const { t } = useTranslation();
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

  //alert error time
  const [checkL, setCheckL] = useState(false);
  const [alertName, setAlertName] = useState<any>("");
  const [modified, setModified] = useState("0");
  const [assertModalVisible, setAssertModalVisible] = useState<boolean>(false);

  //program and point USE
  const dispatch = useAppDispatch();

  //program loyality
  const [onSuccesSave, setOnSuccessSave] = useState(false);
  const [onErrorSave, setOnErrorSave] = useState(false);
  let companyId: any = localStorage.getItem("companyId");
  const [availCheck, setAvailCheck] = useState(false);
  const [refetchCashback, setRefetchCashback] = useState(0);
  const [refetchDiscount, setRefetchDiscount] = useState(0);
  const [refetchBonusPoints, setRefetchBonusPoints] = useState(0);
  const [active, setActive] = useState<
    "discount" | "cashback" | "bonuspoint" | ""
  >("");

  const [activeCheck, setActiveCheck] = useState<
    "discount" | "cashback" | "bonuspoint" | ""
  >("");

  const [emptyCashback, setEmptyCashback] = useState<IEmpty>({
    empty: false,
    type: "cashback",
  });

  const [emptyDiscount, setEmptyDiscount] = useState<IEmpty>({
    empty: false,
    type: "discount",
  });

  const [emptyBonuspoint, setEmptyBonuspoint] = useState<IEmpty>({
    empty: false,
    type: "bonuspoint",
  });

  //Save and change loyality
  const useProgramSave = useMutation((data: any) =>
    saveUseProgramLoyality(data)
  );

  console.log(emptyDiscount, "empty Discount");
  console.log(emptyCashback, "empty Cashback");
  console.log(emptyBonuspoint, "empty bonuspoint");

  const loayalityPut = useMutation(
    (data: any) => {
      if (emptyBonuspoint.empty && emptyBonuspoint.type === "bonuspoint") {
        return loyalityNewSaveChange(
          data,
          active === "" ? activeCheck : active
        );
      } else if (emptyDiscount.empty && emptyDiscount.type === "discount") {
        return loyalityNewSaveChange(
          data,
          active === "" ? activeCheck : active
        );
      } else if (emptyCashback.empty && emptyCashback.type === "cashback") {
        return loyalityNewSaveChange(
          data,
          active === "" ? activeCheck : active
        );
      } else {
        return loyalitySaveChange(data, active === "" ? activeCheck : active);
      }
    },
    {
      onSuccess: () => {
        setOnSuccessSave(true);
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
        setCheckL(true);
        setAlertName(t("fields_not_filled"));
      }
      if (
        levels[i - 1]?.percent &&
        parseInt(levels[i].percent) <= parseInt(levels[i - 1]?.percent)
      ) {
        errorCheck = true;
        setCheckL(true);
        // console.log("levels Second 1", levels);
        setAlertName(
          `${t("percentage_in")} "${levels[i].name}" ${t(
            "must_be_more_than"
          )} "${levels[i - 1].name}"`
        );
      }
      if (levels[i].requirements && levels[i].requirements?.length) {
        // console.log("levels Second 2", levels);

        if (!i && parseInt(levels[i].percent) <= parseInt(baseAmount)) {
          errorCheck = true;
          setCheckL(true);
          setAlertName(
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
            setCheckL(true);
            setAlertName(t("fields_not_filled"));
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
            setCheckL(true);
            setAlertName(
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
    console.log(data, "data");
    console.log(activeCheck, "1111 active check main");

    if (!checkLevels(data.levels, data.base_name, data.base_percent)) {
      try {
        useProgramSave.mutate({
          useProgram: data.useProgram,
          usePoint: data.usePoint,
        });

        if (activeCheck === "discount") {
          loayalityPut.mutate({
            cashbackReturnedDay: 0,
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
        } else if (activeCheck === "cashback") {
          loayalityPut.mutate({
            cashbackReturnedDay: data.give_cashback_after || 0,
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
        } else if (activeCheck === "bonuspoint") {
          loayalityPut.mutate({
            cashbackReturnedDay: 0,
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

  const { isLoading: discountLoading, refetch: refetchdiscount } = useQuery(
    ["discount", refetchDiscount],
    fetchDiscount,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        // setEmptyLoyal
        if (data?.data?.data === null) {
          setEmptyDiscount({
            empty: true,
            type: "discount",
          });
          dispatch(
            setBaseLoyality({
              max_percent: "",
              base_percent: "",
              give_cashback_after: "",
            })
          );
          reset();
        } else {
          if (data?.data?.data?.isActive) {
            setAvailCheck(true);
            setActive("discount");
            dispatch(
              setBaseLoyality({
                max_percent: data.data.data.maxAmount,
                base_percent: data.data.data.percent,
                give_cashback_after: data.data.data.cashbackReturnedDay,
              })
            );
            setValue("max_percent", data.data.data.maxAmount);
            setValue("give_cashback_after", data.data.data.cashbackReturnedDay);
            setValue("base_name", data.data.data.name);
            setValue("base_percent", data.data.data.percent);
            setValue("levels", data.data.data.levels);
          } else {
            if (refetchDiscount > 0) {
              console.log("logged discount");
              dispatch(
                setBaseLoyality({
                  max_percent: data.data.data.maxAmount,
                  base_percent: data.data.data.percent,
                  give_cashback_after: data.data.data.cashbackReturnedDay,
                })
              );
              setValue("max_percent", data.data.data.maxAmount);
              setValue(
                "give_cashback_after",
                data.data.data.cashbackReturnedDay
              );
              setValue("base_name", data.data.data.name);
              setValue("base_percent", data.data.data.percent);
              setValue("levels", data.data.data.levels);
            }
          }
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
        if (data?.data?.data === null) {
          setEmptyCashback({
            empty: true,
            type: "cashback",
          });
          dispatch(
            setBaseLoyality({
              max_percent: "",
              base_percent: "",
              give_cashback_after: "",
            })
          );
          reset();
        } else {
          if (data?.data?.data?.isActive) {
            setAvailCheck(true);
            setActive("cashback");
            setValue("max_percent", data.data.data.maxAmount);
            dispatch(
              setBaseLoyality({
                max_percent: data.data.data.maxAmount,
                base_percent: data.data.data.percent,
                give_cashback_after: data.data.data.cashbackReturnedDay,
              })
            );
            setValue("give_cashback_after", data.data.data.cashbackReturnedDay);
            setValue("base_name", data.data.data.name);
            setValue("base_percent", data.data.data.percent);
            setValue("levels", data.data.data.levels);
          } else {
            if (refetchCashback > 0) {
              setValue("max_percent", data.data.data.maxAmount);
              dispatch(
                setBaseLoyality({
                  max_percent: data.data.data.maxAmount,
                  base_percent: data.data.data.percent,
                  give_cashback_after: data.data.data.cashbackReturnedDay,
                })
              );
              setValue(
                "give_cashback_after",
                data.data.data.cashbackReturnedDay
              );
              setValue("base_name", data.data.data.name);
              setValue("base_percent", data.data.data.percent);
              setValue("levels", data.data.data.levels);
            }
          }
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
        if (data?.data?.data === null) {
          setEmptyBonuspoint({
            empty: true,
            type: "bonuspoint",
          });
          reset();
          dispatch(
            setBaseLoyality({
              max_percent: "",
              base_percent: "",
              give_cashback_after: 0,
            })
          );
        } else {
          if (data?.data?.data?.isActive) {
            setAvailCheck(true);
            setActive("bonuspoint");
            dispatch(
              setBaseLoyality({
                max_percent: data.data.data.maxAmount,
                base_percent: data.data.data.percent,
                give_cashback_after: 0,
              })
            );
            setValue("max_percent", data.data.data.maxAmount);
            setValue("base_name", data.data.data.name);
            setValue("base_percent", data.data.data.percent);
            setValue("levels", data.data.data.levels);
          } else {
            if (refetchBonusPoints > 0) {
              dispatch(
                setBaseLoyality({
                  max_percent: data.data.data.maxAmount,
                  base_percent: data.data.data.percent,
                  give_cashback_after: 0,
                })
              );
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
    console.log(key, "modify screen");
    if (checked) {
      if (availCheck) {
        setActive(key);
      } else {
        setActive("");
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
          type: "bonuspoint",
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
      dispatch(
        setLoyaltyUse({
          useProgram: data.data.data.useProgram,
          usePoint: data.data.data.usePoint,
        })
      );
    },
  });

  useEffect(() => {
    if (active === "cashback" || activeCheck === "cashback") {
      setRefetchCashback(refetchCashback + 1);
    } else if (active === "discount" || activeCheck === "discount") {
      setRefetchDiscount(refetchDiscount + 1);
    } else if (active === "bonuspoint" || activeCheck === "bonuspoint") {
      setRefetchBonusPoints(refetchBonusPoints + 1);
    }
  }, [active, activeCheck]);

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
    loayalityChange,
    refetchdiscount,
    refetch,
    refetchcashback,
    onFormSubmit,
    loayalityPut,
    onSuccesSave,
    setOnSuccessSave,
    setOnErrorSave,
    onErrorSave,
    errors,
    alertName,
    checkLevels,
    checkL,
    setCheckL,
    modified,
    setModified,
    activeCheck,
    setActiveCheck,
    availCheck,
    setAssertModalVisible,
    assertModalVisible,
    emptyCashback,
    emptyDiscount,
    emptyBonuspoint,
  };
};

export default useLoyality;
