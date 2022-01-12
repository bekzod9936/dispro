import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { fetchFinanceHistoryExcel } from "services/queries/financeQuery";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { numberWithNew } from "services/utils";
import { useAppSelector } from "services/redux/hooks";

const useExcel = () => {
  const { t } = useTranslation();

  const sum = useAppSelector((state) => state.finance.historyFinance.sum);
  const [openModal, setOpenModal] = useState(false);

  const [date] = useState<any>({
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const resExcel = useQuery(
    "fetchPaymentInfoExcel",
    () => {
      return fetchFinanceHistoryExcel({
        startDate: date.startDate,
        endDate: date.endDate,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: false,
      onSuccess: (data) => {
        if (data.data.data.cashierHistories.histories.length === 0) {
          setOpenModal(true);
        } else {
          const excellist = data.data.data.cashierHistories.histories
            ?.map((v: any) => {
              const date = dayjs(v.chequeDate).format("DD.MM.YYYY");
              const time = dayjs(v.chequeDate).format("HH:mm:ss");
              return {
                [t("cashier")]:
                  v.cashierName === "No cashier name"
                    ? t("p2p")
                    : v.cashierName,
                [t("filial")]: v.store.name,
                [t("transactiondate")]: date,
                [t("transactiontime")]: time,
                [t("totalsum")]: numberWithNew({
                  number: v.payInfo.amountTotal,
                }),
                [t("discountSum")]: numberWithNew({
                  number: v.payInfo.amountMinus,
                }),
                [t("paid")]: numberWithNew({ number: v.payInfo.amountPayed }),
                [t("paycash/payterminal")]: numberWithNew({
                  number: v.payInfo.amountCash,
                }),
                [t("paycardapp")]: numberWithNew({
                  number: v.payInfo.amountCard,
                }),
                [t("customer")]: v.clientName,
                [t("loyaltypercentage")]:
                  v.payInfo.isDiscount ||
                  v.payInfo.isCashback ||
                  v.payInfo.isPoints
                    ? numberWithNew({ number: v.payInfo.value })
                    : "-",
                [t("coupon")]:
                  v.payInfo.isCoupon && v.payInfo.valueType === "percent"
                    ? numberWithNew({ number: v.payInfo.value })
                    : "-",
                [t("certificate")]:
                  v.payInfo.isCoupon && v.payInfo.valueType === "amount"
                    ? numberWithNew({ number: v.payInfo.value })
                    : "-",
                [t("comment")]: v.chequeComment === "" ? "-" : v.chequeComment,
              };
            })
            .concat([
              {
                [t("cashier")]: "",
                [t("filial")]: "",
                [t("transactiondate")]: "",
                [t("transactiontime")]: "",
                [t("totalsum")]: "",
                [t("discountSum")]: "",
                [t("paid")]: "",
                [t("paycash/payterminal")]: "",
                [t("paycardapp")]: "",
                [t("customer")]: "",
                [t("loyaltypercentage")]: "",
                [t("coupon")]: "",
                [t("certificate")]: "",
                [t("comment")]: "",
              },
              {
                [t("cashier")]: "",
                [t("filial")]: "",
                [t("transactiondate")]: "",
                [t("transactiontime")]: "",
                [t("totalsum")]: "",
                [t("discountSum")]: t("total"),
                [t("paid")]: "",
                [t("paycash/payterminal")]: "",
                [t("paycardapp")]: "",
                [t("customer")]: "",
                [t("loyaltypercentage")]: "",
                [t("coupon")]: "",
                [t("certificate")]: "",
                [t("comment")]: "",
              },
              {
                [t("cashier")]: "",
                [t("filial")]: "",
                [t("transactiondate")]: "",
                [t("transactiontime")]: "",
                [t("totalsum")]: numberWithNew({ number: sum.total }),
                [t("discountSum")]: numberWithNew({ number: sum.minus }),
                [t("paid")]: numberWithNew({ number: sum.paid }),
                [t("paycash/payterminal")]: numberWithNew({ number: sum.cash }),
                [t("paycardapp")]: numberWithNew({ number: sum.card }),
                [t("customer")]: "",
                [t("loyaltypercentage")]: "",
                [t("coupon")]: "",
                [t("certificate")]: "",
                [t("comment")]: "",
              },
            ]);

          const ws = XLSX.utils.json_to_sheet(excellist);
          const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
          const excelBuffer = XLSX.write(wb, {
            bookType: "xlsx",
            type: "array",
          });
          const data1 = new Blob([excelBuffer], { type: fileType });
          FileSaver.saveAs(
            data1,
            `${t("report")}/${t("from")}${date?.startDate}${t("to")}${
              date?.endDate
            }` + fileExtension
          );
        }
      },
    }
  );

  return { resExcel, openModal, setOpenModal };
};

export default useExcel;
