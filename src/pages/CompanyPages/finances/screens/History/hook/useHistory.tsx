import { useMutation, useQuery } from 'react-query';
import {
  fetchComment,
  fetchFinanceHistory,
} from 'services/queries/financeQuery';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { formatPagination } from 'services/utils/formatPagination';
import {
  setCashierHistoryFinance,
  setHistoryFinanceBetween,
  setHistoryFinanceData,
  setHistoryFinanceTotal,
  setStoreIdsHistoryFinance,
  setSumHistoryFinance,
} from 'services/redux/Slices/finance';
import dayjs from 'dayjs';
import { numberWithNew } from 'services/utils';
import { useTranslation } from 'react-i18next';
import { Tr, Th } from '../../../components/Table/style';
import { useMemo } from 'react';

interface PProps {
  filterValues: any;
}

const useHistory = ({ filterValues }: PProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.finance.historyFinance.data);
  const sum = useAppSelector((state) => state.finance.historyFinance.sum);

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
            cash: data.data.data.amountCash,
            card: data.data.data.amountCard,
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

  const listmobile = useMemo(() => {
    return data.map((v: any) => {
      const date = dayjs(v.chequeDate).format('DD.MM.YYYY');
      const time = dayjs(v.chequeDate).format('HH:mm:ss');
      return {
        title: v.cashierName === 'No cashier name' ? t('p2p') : v.cashierName,
        value: numberWithNew({ number: v.payInfo.amountTotal }),
        avatar: v.cashierLogo,
        values: {
          col0: v.cashierLogo,
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
            title: t('transactiondate'),
            value: date,
          },
          {
            title: t('transactiontime'),
            value: time,
          },
          {
            title: t('totalsum'),
            value: numberWithNew({ number: v.payInfo.amountTotal }),
          },
          {
            title: t('discountSum'),
            value: numberWithNew({ number: v.payInfo.amountMinus }),
          },
          {
            title: t('paid'),
            value: numberWithNew({ number: v.payInfo.amountPayed }),
          },
          {
            title: t('paycash/payterminal'),
            value: numberWithNew({ number: v.payInfo.amountCash }),
          },
          {
            title: t('paycardapp'),
            value: numberWithNew({ number: v.payInfo.amountCard }),
          },
          { title: t('customer'), value: v.clientName },
          {
            title: t('loyaltypercentage'),
            value:
              v.payInfo.isDiscount || v.payInfo.isCashback || v.payInfo.isPoints
                ? numberWithNew({ number: v.payInfo.value })
                : '-',
          },
          {
            title: t('coupon'),
            value:
              v.payInfo.isCoupon && v.payInfo.valueType === 'percent'
                ? `${numberWithNew({ number: v.payInfo.value })}%`
                : '-',
          },
          {
            title: t('certificate'),
            value:
              v.payInfo.isCoupon && v.payInfo.valueType === 'amount'
                ? numberWithNew({ number: v.payInfo.value })
                : '-',
          },
        ],
      };
    });
  }, [data]);

  const header2 = useMemo(() => {
    return (
      <Tr>
        <Th style={{ textAlign: 'center' }} colSpan={3}>
          {t('total')}
        </Th>
        <Th style={{ textAlign: 'center' }}>
          {numberWithNew({ number: sum.total })}
        </Th>
        <Th style={{ textAlign: 'center' }}>
          {numberWithNew({ number: sum.minus })}
        </Th>
        <Th style={{ textAlign: 'center' }}>
          {numberWithNew({ number: sum.paid })}
        </Th>
        <Th style={{ textAlign: 'center' }}>
          {numberWithNew({ number: sum.cash })}
        </Th>
        <Th style={{ textAlign: 'center' }}>
          {numberWithNew({ number: sum.card })}
        </Th>
      </Tr>
    );
  }, [sum]);

  return { response, resComment, listmobile, listdesktop, header2 };
};

export default useHistory;
