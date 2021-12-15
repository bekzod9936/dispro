import { useQuery } from 'react-query';
import { fetchFinanceHistory } from 'services/queries/financeQuery';
import { useAppDispatch } from 'services/redux/hooks';
import { formatPagination } from 'services/utils/formatPagination';
import {
  setCashierHistoryFinance,
  setHistoryFinanceBetween,
  setHistoryFinanceData,
  setHistoryFinanceTotal,
  setStoreIdsHistoryFinance,
  setSumHistoryFinance,
} from 'services/redux/Slices/finance';

interface PProps {
  filterValues: any;
}

const useHistory = ({ filterValues }: PProps) => {
  const dispatch = useAppDispatch();

  const response = useQuery(
    ['fetchPaymentInfo', filterValues],
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => {
          if (filterValues[v] !== '') {
            return `${v}=${filterValues[v]}&`;
          } else {
            return '';
          }
        })
        .join('');

      return fetchFinanceHistory({
        url: url,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        dispatch(
          setHistoryFinanceData(data.data.data.cashierHistories.histories)
        );

        dispatch(
          setHistoryFinanceTotal({
            count: Math.ceil(data.data.data.totalCount / filterValues?.perPage),
            pages: data.data.data.totalCount,
          })
        );
        dispatch(
          setHistoryFinanceBetween(
            formatPagination({
              page: filterValues?.page,
              perPage: filterValues?.perPage,
              total: data.data.data.totalCount,
            })
          )
        );
        dispatch(
          setSumHistoryFinance({
            total: data.data.data.amountTotal,
            minus: data.data.data.amountMinus,
            paid: data.data.data.amountPayed,
          })
        );
        dispatch(
          setStoreIdsHistoryFinance(
            data.data.data.cashierHistories.filter.stores
          )
        );

        dispatch(
          setCashierHistoryFinance(
            data.data.data.cashierHistories.filter.cashierStaffs.map(
              (v: any) => {
                return {
                  value: v.id,
                  label: v.name,
                };
              }
            )
          )
        );
      },
    }
  );

  return { response };
};

export default useHistory;
