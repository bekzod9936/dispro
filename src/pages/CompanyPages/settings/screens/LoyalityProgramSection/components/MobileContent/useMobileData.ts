import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
// queries
import {
  fetchBonusPoints,
  fetchCashback,
  fetchDiscount,
} from "services/queries/partnerQuery";
import {
  loyalityNewSaveChange,
  loyalitySaveChange,
  saveUseProgramLoyality,
} from "services/queries/settingsQuery";
//utils
import { parseSimpleString } from "services/utils";
import { levelReqs } from "../../constants";

//hooks
import { FormProps } from "../../hooks/types";
import { handleClick } from "services/redux/Slices/settingsSlice";

const useMobileData = () => {
  const dispatch = useAppDispatch();
  //alert error time
  const [checkL, setCheckL] = useState(false);
  const [alertName, setAlertName] = useState<any>("");
  const emptySale = useAppSelector((state) => state.settings.emptySale);
  const emptyBall = useAppSelector((state) => state.settings.emptyBall);
  const emptyCashback = useAppSelector((state) => state.settings.emptyCashback);
  const { t } = useTranslation();
  const openCashback = useAppSelector((state) => state.settings.openState);
  let companyId: any = localStorage.getItem("companyId");

  //form data
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    getValues,
  } = useForm();

  //fetching data
  const {
    isLoading: saleLoading,
    isFetching: saleIsFetch,
    refetch: refetchdiscount,
  } = useQuery(["discountM"], fetchDiscount, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      if (data?.data?.data?.isActive) {
        setValue("max_percent", data.data.data.maxAmount);
        setValue("give_cashback_after", data.data.data.cashbackReturnedDay);
        setValue("base_name", data.data.data.name);
        setValue("base_percent", data.data.data.percent);
        setValue("levels", data.data.data.levels);
      }
    },
  });

  const {
    isLoading: cashLoading,
    isFetching: cashIsFetch,
    refetch: refetchcashback,
  } = useQuery(["cashbackM"], fetchCashback, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      if (data?.data?.data?.isActive) {
        setValue("give_cashback_after", data.data.data.cashbackReturnedDay);
        setValue("base_name", data.data.data.name);
        setValue("base_percent", data.data.data.percent);
        setValue("levels", data.data.data.levels);
      }
    },
  });

  const { isLoading, isFetching, refetch } = useQuery(
    ["BonusM"],
    fetchBonusPoints,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        if (data?.data?.data?.isActive) {
          setValue("max_percent", data.data.data.maxAmount);
          setValue("base_name", data.data.data.name);
          setValue("base_percent", data.data.data.percent);
          setValue("levels", data.data.data.levels);
        }
      },
    }
  );

  //   change loyality and save
  const loayalityPut = useMutation(
    (data: any) => {
      if (emptyCashback || emptyBall || emptySale) {
        return loyalityNewSaveChange(data, openCashback.type);
      } else {
        return loyalitySaveChange(data, openCashback.type);
      }
    },
    {
      onSuccess: () => {
        refetch();
        refetchdiscount();
        refetchcashback();
        dispatch(handleClick({ type: openCashback.type, open: false }));
      },
    }
  );

  //Save and change loyality
  const useProgramSave = useMutation((data: any) =>
    saveUseProgramLoyality(data)
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
    if (!checkLevels(data.levels, data.base_name, data.base_percent)) {
      try {
        useProgramSave.mutate({
          useProgram: data.useProgram,
          usePoint: data.usePoint,
        });

        if (openCashback.type === "discount") {
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
        } else if (openCashback.type === "cashback") {
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
        } else if (openCashback.type === "bonuspoint") {
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
        }
      } catch (err) {
        console.log(err, "error");
        // alert(err);s
      }
    }
  };

  return {
    control,
    errors,
    setValue,
    handleSubmit,
    onFormSubmit,
    saleLoading,
    cashLoading,
    isLoading,
    isFetching,
    cashIsFetch,
    saleIsFetch,
    alertName,
    checkL,
    setCheckL,
    getValues,
  };
};

export default useMobileData;
