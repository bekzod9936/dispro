import { useMutation, useQuery } from "react-query";
import {
  fetchComment,
  fetchFinanceHistory,
} from "services/queries/financeQuery";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { formatPagination } from "services/utils/formatPagination";
import {
  setCashierHistoryFinance,
  setHistoryFinanceBetween,
  setHistoryFinanceData,
  setHistoryFinanceTotal,
  setStoreIdsHistoryFinance,
  setSumHistoryFinance,
} from "services/redux/Slices/finance";
import dayjs from "dayjs";
import { numberWithNew } from "services/utils";
import { useTranslation } from "react-i18next";
import { Tr, Th } from "../../../components/Table/style";
import { useMemo } from "react";
import { WrapComment, WrapImage } from "../style";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "components/Custom/Buttons/Button";
import App from "assets/icons/StatistisPage/app.svg";
interface PProps {
  filterValues: any;
  handleClickCommet: (e: any) => void;
}

const useHistory = ({ filterValues, handleClickCommet }: PProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.finance.historyFinance.data);
  const sum = useAppSelector((state) => state.finance.historyFinance.sum);

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

      return fetchFinanceHistory({
        url: url,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      select: (data) => {
        return data.data.data;
      },
      onSuccess: (data: any) => {
        console.log(data, "sksksk");
        dispatch(setHistoryFinanceData(data?.cashierHistories.histories));

        dispatch(
          setHistoryFinanceTotal({
            count: Math.ceil(data?.totalCount / filterValues?.perPage),
            pages: data?.totalCount,
          })
        );
        dispatch(
          setHistoryFinanceBetween(
            formatPagination({
              page: filterValues?.page,
              perPage: filterValues?.perPage,
              total: data.totalCount,
            })
          )
        );
        dispatch(
          setSumHistoryFinance({
            total: data.amountTotal,
            minus: data.amountMinus,
            paid: data.amountPayed,
            cash: data.amountCash,
            card: data.amountCard,
          })
        );
        dispatch(
          setStoreIdsHistoryFinance(data.cashierHistories.filter.stores)
        );
        const cashierFilter = data.cashierHistories.filter.cashierStaffs.map(
          (v: any) => {
            return {
              value: v.id,
              label: v.name,
            };
          }
        );

        dispatch(
          setCashierHistoryFinance([
            { value: 0, label: t("p2p") },
            ...cashierFilter,
          ])
        );
      },
    }
  );

  const resComment = useMutation(
    (v: any) => {
      return fetchComment({ data: v });
    },
    {
      onSuccess: () => {
        response.refetch();
      },
    }
  );

  const listdesktop = useMemo(() => {
    return data?.map((v: any) => {
      return {
        col0: v.cashierLogo,
        filial: v.store.name,
        col1: v.cashierName,
        col2: v.chequeDate,
        col3: v.chequeDate,
        col4: v.payInfo.amountTotal,
        col5: v.payInfo.amountMinus,
        col6: v.payInfo.amountPayed,
        col7: v.payInfo.amountCash,
        col8: v.payInfo.amountCard,
        col9: v.clientName,
        col10: v.payInfo.value,
        col11: v.payInfo.value,
        col12: v.payInfo.value,
        col13: v.chequeComment,
        id: v.chequeId,
        isCashback: v.payInfo.isCashback,
        isDiscount: v.payInfo.isDiscount,
        isPoints: v.payInfo.isPoints,
        isCoupon: v.payInfo.isCoupon,
        valueType: v.payInfo.valueType,
      };
    });
  }, [data]);

  const listmobile = data.map((v: any) => {
    const date = dayjs(v.chequeDate).format("DD.MM.YYYY");
    const time = dayjs(v.chequeDate).format("HH:mm:ss");
    return {
      title: v.cashierName === "No cashier name" ? t("p2p") : v.cashierName,
      value: numberWithNew({ number: v.payInfo.amountTotal }),
      avatar: v.cashierLogo,
      id: v.chequeId,
      comment: v.chequeComment,
      values: {
        col0: v.cashierLogo,
        filial: v.store.name,
        col1: v.cashierName,
        col2: v.chequeDate,
        col3: v.chequeDate,
        col4: v.payInfo.amountTotal,
        col5: v.payInfo.amountMinus,
        col6: v.payInfo.amountPayed,
        col7: v.payInfo.amountCash,
        col8: v.payInfo.amountCard,
        col9: v.clientName,
        col10: v.payInfo.value,
        col11: v.payInfo.value,
        col12: v.payInfo.value,
        col13: v.chequeComment,
        id: v.chequeId,
        isCashback: v.payInfo.isCashback,
        isDiscount: v.payInfo.isDiscount,
        isPoints: v.payInfo.isPoints,
        isCoupon: v.payInfo.isCoupon,
        valueType: v.payInfo.valueType,
      },
      body: [
        {
          title: t("filial"),
          value: v.store.name,
        },
        {
          title: t("transactiondate"),
          value: date,
        },
        {
          title: t("transactiontime"),
          value: time,
        },
        {
          title: t("totalsum"),
          value: numberWithNew({ number: v.payInfo.amountTotal }),
        },
        {
          title: t("discountSum"),
          value: numberWithNew({ number: v.payInfo.amountMinus }),
        },
        {
          title: t("paid"),
          value: numberWithNew({ number: v.payInfo.amountPayed }),
        },
        {
          title: t("paycash/payterminal"),
          value: numberWithNew({ number: v.payInfo.amountCash }),
        },
        {
          title: t("paycardapp"),
          value: numberWithNew({ number: v.payInfo.amountCard }),
        },
        { title: t("customer"), value: v.clientName },
        {
          title: t("loyaltypercentage"),
          value:
            v.payInfo.isDiscount || v.payInfo.isCashback || v.payInfo.isPoints
              ? numberWithNew({ number: v.payInfo.value })
              : "-",
        },
        {
          title: t("coupon"),
          value:
            v.payInfo.isCoupon && v.payInfo.valueType === "percent"
              ? `${numberWithNew({ number: v.payInfo.value })}%`
              : "-",
        },
        {
          title: t("certificate"),
          value:
            v.payInfo.isCoupon && v.payInfo.valueType === "amount"
              ? numberWithNew({ number: v.payInfo.value })
              : "-",
        },
      ],
    };
  });

  const header2 = useMemo(() => {
    return (
      <Tr>
        <Th style={{ textAlign: "center" }} colSpan={4}>
          {t("total")}
        </Th>
        <Th style={{ textAlign: "center" }}>
          {numberWithNew({ number: sum.total })}
        </Th>
        <Th style={{ textAlign: "center" }}>
          {numberWithNew({ number: sum.minus })}
        </Th>
        <Th style={{ textAlign: "center" }}>
          {numberWithNew({ number: sum.paid })}
        </Th>
        <Th style={{ textAlign: "center" }}>
          {numberWithNew({ number: sum.cash })}
        </Th>
        <Th style={{ textAlign: "center" }}>
          {numberWithNew({ number: sum.card })}
        </Th>
      </Tr>
    );
  }, [sum]);

  const columns: any = useMemo(
    () => [
      {
        Header: t("cashier"),
        accessor: "col1",
        Cell: (props: any) => {
          if (props.value === "No cashier name") {
            return (
              <WrapImage>
                <LazyLoadImage
                  alt="avatar"
                  height="40px"
                  src={
                    props.cell.row.original.col0
                      ? props.cell.row.original.col0
                      : App
                  }
                  width="40px"
                  effect="blur"
                  style={{
                    objectFit: "cover",
                    borderRadius: "14px",
                    marginRight: "15px",
                  }}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = App;
                  }}
                />
                <span className="textth">{t("p2p")}</span>
              </WrapImage>
            );
          } else {
            return (
              <WrapImage>
                <LazyLoadImage
                  alt="avatar"
                  height="40px"
                  src={
                    props.cell.row.original.col0
                      ? props.cell.row.original.col0
                      : App
                  }
                  width="40px"
                  effect="blur"
                  style={{
                    objectFit: "cover",
                    borderRadius: "14px",
                  }}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = App;
                  }}
                />
                <span className="textth">{props.value}</span>
              </WrapImage>
            );
          }
        },
      },
      {
        Header: t("filial"),
        accessor: "filial",
      },
      {
        Header: t("transactiondate"),
        accessor: "col2",
        Cell: (props: any) => {
          return dayjs(props.value).format("DD.MM.YYYY");
        },
      },
      {
        Header: t("transactiontime"),
        accessor: "col3",
        Cell: (props: any) => {
          return dayjs(props.value).format("HH:mm:ss");
        },
      },
      {
        Header: t("totalsum"),
        accessor: "col4",
        Cell: (props: any) => {
          return numberWithNew({ number: props.value });
        },
      },
      {
        Header: t("discountSum"),
        accessor: "col5",
        Cell: (props: any) => {
          return numberWithNew({ number: props.value });
        },
      },
      {
        Header: t("paid"),
        accessor: "col6",
        Cell: (props: any) => {
          return numberWithNew({ number: props.value });
        },
      },
      {
        Header: t("paycash/payterminal"),
        accessor: "col7",
        Cell: (props: any) => {
          return numberWithNew({ number: props.value });
        },
      },
      {
        Header: t("paycardapp"),
        accessor: "col8",
        Cell: (props: any) => {
          return numberWithNew({ number: props.value });
        },
      },
      {
        Header: t("customer"),
        accessor: "col9",
      },
      {
        Header: t("loyaltypercentage"),
        accessor: "col10",
        Cell: (props: any) => {
          if (
            props.cell.row.original.isDiscount ||
            props.cell.row.original.isCashback ||
            props.cell.row.original.isPoints
          ) {
            return numberWithNew({ number: props.value });
          } else {
            return "-";
          }
        },
      },
      {
        Header: t("coupon"),
        accessor: "col11",
        Cell: (props: any) => {
          if (
            props.cell.row.original.isCoupon &&
            props.cell.row.original.valueType === "percent"
          ) {
            return `${numberWithNew({ number: props.value })}%`;
          } else {
            return "-";
          }
        },
      },
      {
        Header: t("certificate"),
        accessor: "col12",
        Cell: (props: any) => {
          if (
            props.cell.row.original.isCoupon &&
            props.cell.row.original.valueType === "amount"
          ) {
            return numberWithNew({ number: props.value });
          } else {
            return "-";
          }
        },
      },
      {
        Header: t("comment"),
        accessor: "col13",
        Cell: (props: any) => {
          if (props.value !== "") {
            return <WrapComment>{props.value}</WrapComment>;
          } else {
            return (
              <Button
                buttonStyle={{
                  bgcolor: "#e1e3fb",
                  color: "#3492FF",
                  radius: 12,
                  weight: 300,
                  height: {
                    laptop: 36,
                    desktop: 36,
                    planshet: 36,
                  },
                  fontSize: {
                    desktop: 14,
                    laptop: 14,
                    planshet: 14,
                  },
                }}
                onClick={() => handleClickCommet(props.cell.row.original)}
              >
                {t("addcomment")}
              </Button>
            );
          }
        },
      },
    ],
    []
  );

  return { response, resComment, listmobile, listdesktop, header2, columns };
};

export default useHistory;
