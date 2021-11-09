import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { fetchFinanceCashBack } from "services/queries/financeQuery";
import { useAppDispatch } from "services/redux/hooks";
import {
  setCashBackFinanceBetween,
  setCashBackFinanceData,
  setCashBackFinanceHeader,
  setCashBackFinanceTotal,
} from "services/redux/Slices/finance";
import { formatPagination } from "services/utils/formatPagination";

interface PProps {
  filterValues: any;
}

const useCashBack = ({ filterValues }: PProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const response = useQuery(
    ["fetchPaymentInfo", filterValues],
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => `${v}=${filterValues[v]}&`)
        .join("");
      return fetchFinanceCashBack({
        url: url,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
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
          setCashBackFinanceTotal(
            Math.ceil(data.data.data.totalCount / filterValues?.perPage)
          )
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

  return { response };
};

export default useCashBack;
