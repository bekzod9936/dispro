import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { fetchFinancePayment } from "services/queries/financeQuery";
import { useAppDispatch } from "services/redux/hooks";
import {
  setPaymentFinanceBetween,
  setPaymentFinanceData,
  setPaymentFinanceHeader,
  setPaymentFinanceTotal,
} from "services/redux/Slices/finance";
import { formatPagination } from "services/utils/formatPagination";

interface PProps {
  filterValues: any;
}

const usePayment = ({ filterValues }: PProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const response = useQuery(
    ["fetchPaymentInfo", filterValues],
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => `${v}=${filterValues[v]}&`)
        .join("");
      return fetchFinancePayment({
        url: url,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        dispatch(setPaymentFinanceData(data.data.data.history));
        dispatch(
          setPaymentFinanceHeader([
            {
              title: t("totalpaidbyUZS"),
              value: data.data.data.totalSum,
            },
            {
              title: t("DISCommission"),
              value: data.data.data.totalDisCommissionSum,
            },
          ])
        );
        dispatch(
          setPaymentFinanceTotal(
            Math.ceil(data.data.data.totalCount / filterValues?.perPage)
          )
        );
        dispatch(
          setPaymentFinanceBetween(
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

  return { response };
};

export default usePayment;
