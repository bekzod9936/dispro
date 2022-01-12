import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { fetchFinanceCashBack } from "services/queries/financeQuery";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import {
  setCashBackFinanceBetween,
  setCashBackFinanceData,
  setCashBackFinanceHeader,
  setCashBackFinanceTotal,
} from "services/redux/Slices/finance";
import { numberWithNew } from "services/utils";
import { formatPagination } from "services/utils/formatPagination";
import { WrapIcon, WalletIcon, CashBackIcon } from "./style";

interface PProps {
  filterValues: any;
}

const useCashBack = ({ filterValues }: PProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [enable, setEnable] = useState(false);
  const accounts = useAppSelector((state) => state.info.accounts);
  const accountId: any = accounts?.filter((v: any) => v.type === 6)[0]?.id;
  const data = useAppSelector((state) => state.finance.cashBackFinance.data);

  useEffect(() => {
    if (accountId !== undefined) {
      setEnable(true);
    }
  }, [accountId]);

  const response = useQuery(
    ["fetchPaymentInfo", filterValues],
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => {
          if (filterValues[v] !== "") {
            return `${v}=${filterValues[v]}&`;
          } else {
            return "";
          }
        })
        .join("");
      return fetchFinanceCashBack({
        url: url,
        accountId: accountId,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: enable,
      onSuccess: (data) => {
        dispatch(setCashBackFinanceData(data.data.data.history));
        dispatch(
          setCashBackFinanceHeader([
            {
              title: t("totalpaidbyUZS"),
              value: data.data.data.totalSum,
            },
            {
              title: t("DISCommission"),
              value: data.data.data.totalCommissionSum,
            },
          ])
        );
        dispatch(
          setCashBackFinanceTotal({
            count: Math.ceil(data.data.data.totalCount / filterValues?.perPage),
            pages: data.data.data.totalCount,
          })
        );
        dispatch(
          setCashBackFinanceBetween(
            formatPagination({
              page: filterValues?.page,
              perPage: filterValues?.perPage,
              total: data.data.data.totalCount,
            })
          )
        );
      },
    }
  );

  const listdesktop = useMemo(() => {
    return data?.map((v: any) => {
      return {
        col1: v.operationType,
        col2: v.clientName ? v.clientName : "-",
        col3: v.amount,
        col4: Math.round((v.amount / 100) * 100) / 100,
        col5: v.date,
        col6: v.activateDate,
        col7: v.status,
      };
    });
  }, [data]);

  const columns: any = useMemo(
    () => [
      {
        Header: t("typeoftransaction"),
        accessor: "col1",
        Cell: (props: any) => (
          <WrapIcon>
            {props?.value === "cashback_account_top_up" ? (
              <WalletIcon />
            ) : props?.value === "cashback_in" ? (
              <CashBackIcon />
            ) : (
              "-"
            )}
            {props?.value === "cashback_account_top_up"
              ? t("depositcashbek")
              : props?.value === "cashback_in"
              ? t("cashbackaccrual")
              : "-"}
          </WrapIcon>
        ),
      },
      {
        Header: t("customer"),
        accessor: "col2",
      },
      {
        Header: t("cashbackUZS"),
        accessor: "col3",
        Cell: (props: any) => {
          return numberWithNew({ number: props.value });
        },
      },
      {
        Header: t("commission/top-upamount"),
        accessor: "col4",
        Cell: (props: any) => {
          console.log(props.row.original.col1, "sdkfmsdi");
          if (props.row.original.col1 === "cashback_account_top_up") {
            return "-";
          } else {
            return numberWithNew({ number: props.value });
          }
        },
      },
      {
        Header: t("purchasedate"),
        accessor: "col5",
        Cell: (props: any) => {
          return dayjs(props.value).format("DD.MM.YYYY");
        },
      },
      {
        Header: t("dateofaccrual"),
        accessor: "col6",
        Cell: (props: any) => {
          return dayjs(props.value).format("DD.MM.YYYY");
        },
      },
      {
        Header: t("status"),
        accessor: "col7",
        Cell: (props: any) => (
          <>
            {props?.value === "success"
              ? t("accrued")
              : props?.value === "pending"
              ? t("pending")
              : t("canceled")}
          </>
        ),
      },
    ],
    []
  );

  const listmobile = useMemo(() => {
    return data.map((v: any) => {
      const date1 = dayjs(v.date).format("DD.MM.YYYY");
      const date2 = dayjs(v.activateDate).format("DD.MM.YYYY");

      const bodydata = () => {
        if (v.operationType === "cashback_account_top_up") {
          return [
            {
              title: t("typeoftransaction"),
              value:
                v.operationType === "cashback_account_top_up"
                  ? t("depositcashbek")
                  : v.operationType === "cashback_in"
                  ? t("cashbackaccrual")
                  : "-",
            },
            {
              title: t("dateofaccrual"),
              value: date2,
            },
            {
              title: t("status"),
              value:
                v.status === "success"
                  ? t("accrued")
                  : v.status === "pending"
                  ? t("pending")
                  : t("canceled"),
            },
          ];
        } else {
          return [
            {
              title: t("typeoftransaction"),
              value:
                v.operationType === "cashback_account_top_up"
                  ? t("depositcashbek")
                  : v.operationType === "cashback_in"
                  ? t("cashbackaccrual")
                  : "-",
            },
            {
              title: t("customer"),
              value: v.clientName ? v.clientName : "-",
            },
            {
              title: t("cashbackUZS"),
              value: numberWithNew({ number: v?.amount }),
            },
            {
              title: t("commission/top-upamount"),
              value: numberWithNew({
                number: Math.round((v.amount / 100) * 100) / 100,
              }),
            },
            {
              title: t("purchasedate"),
              value: date1,
            },
            {
              title: t("dateofaccrual"),
              value: date2,
            },
            {
              title: t("status"),
              value:
                v.status === "success"
                  ? t("accrued")
                  : v.status === "pending"
                  ? t("pending")
                  : t("canceled"),
            },
          ];
        }
      };

      return {
        title:
          v.operationType === "cashback_account_top_up"
            ? t("depositcashbek")
            : v.operationType === "cashback_in"
            ? t("cashbackaccrual")
            : "-",
        value: numberWithNew({ number: v?.amount }),
        icon: (
          <WrapIcon>
            {v.operationType === "cashback_account_top_up" ? (
              <WalletIcon />
            ) : v.operationType === "cashback_in" ? (
              <CashBackIcon />
            ) : null}
          </WrapIcon>
        ),
        body: bodydata(),
      };
    });
  }, [data]);

  return { response, enable, listdesktop, columns, listmobile };
};

export default useCashBack;
