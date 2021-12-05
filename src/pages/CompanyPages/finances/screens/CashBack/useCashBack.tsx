import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { fetchFinanceCashBack } from 'services/queries/financeQuery';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
  setCashBackFinanceBetween,
  setCashBackFinanceData,
  setCashBackFinanceHeader,
  setCashBackFinanceTotal,
} from 'services/redux/Slices/finance';
import { formatPagination } from 'services/utils/formatPagination';

interface PProps {
  filterValues: any;
}

const useCashBack = ({ filterValues }: PProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [enable, setEnable] = useState(false);
  const accounts = useAppSelector((state) => state.info.accounts);
  const accountId: any = accounts?.filter((v: any) => v.type === 6)[0]?.id;

  useEffect(() => {
    if (accountId !== undefined) {
      setEnable(true);
    }
  }, [accountId]);

  const response = useQuery(
    ['fetchPaymentInfo', filterValues],
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => `${v}=${filterValues[v]}&`)
        .join('');
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
              title: t('totalpaidbyUZS'),
              value: data.data.data.totalSum,
            },
            {
              title: t('DISCommission'),
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

  return { response , enable};
};

export default useCashBack;
