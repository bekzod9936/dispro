import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { fetchFinancePayment } from 'services/queries/financeQuery';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
  setPaymentFinanceBetween,
  setPaymentFinanceData,
  setPaymentFinanceHeader,
  setPaymentFinanceTotal,
} from 'services/redux/Slices/finance';
import { numberWithNew } from 'services/utils';
import { formatPagination } from 'services/utils/formatPagination';

interface PProps {
  filterValues: any;
}

const usePayment = ({ filterValues }: PProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.finance.paymentFinance.data);

  const response = useQuery(
    ['fetchPaymentInfo', filterValues],
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => `${v}=${filterValues[v]}&`)
        .join('');
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
              title: t('totalpaidbyUZS'),
              value: data.data.data.totalSum,
            },
            {
              title: t('DISCommission'),
              value: data.data.data.totalDisCommissionSum,
            },
          ])
        );
        dispatch(
          setPaymentFinanceTotal({
            count: Math.ceil(data.data.data.totalCount / filterValues?.perPage),
            pages: data.data.data.totalCount,
          })
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

  const listdesktop = useMemo(() => {
    return data?.map((v: any) => {
      return {
        col1: v?.payDate,
        col2: `${v?.firstName}  ${v?.lastName}`,
        col3: v?.cardNumber,
        col4: v?.amount,
        col5: v?.amountPartner,
        col6: v?.amount - v?.amountPartner,
      };
    });
  }, [data]);

  const columns: any = useMemo(
    () => [
      {
        Header: t('dateandtime'),
        accessor: 'col1',
        Cell: (props: any) => {
          return dayjs(props.value).format('DD.MM.YYYY HH:mm');
        },
      },
      {
        Header: t('customer'),
        accessor: 'col2',
      },
      {
        Header: t('cardnumber'),
        accessor: 'col3',
      },
      {
        Header: t('UZSamount'),
        accessor: 'col4',
        Cell: (props: any) => {
          return numberWithNew({ number: props.value });
        },
      },
      {
        Header: t('Profit (99%)'),
        accessor: 'col5',
        Cell: (props: any) => {
          return `${numberWithNew({ number: props.value })} (99%)`;
        },
      },
      {
        Header: t('DIS Commission (1%)'),
        accessor: 'col6',
        Cell: (props: any) => {
          return `${numberWithNew({ number: props.value })} (1%)`;
        },
      },
    ],
    []
  );

  const listmobile = useMemo(() => {
    return data.map((v: any) => {
      const date = dayjs(v?.payDate).format('DD.MM.YYYY HH:mm');
      const pay: number = v?.amount - v?.amountPartner;
      return {
        title: `${v?.firstName}  ${v?.lastName}`,
        value: numberWithNew({ number: v?.amount }),
        body: [
          { title: t('dateandtime'), value: date },
          {
            title: t('customer'),
            value: `${v?.firstName}  ${v?.lastName}`,
          },
          {
            title: t('cardnumber'),
            value: v?.cardNumber,
          },
          {
            title: t('UZSamount'),
            value: numberWithNew({ number: v?.amount }),
          },
          {
            title: t('Profit (99%)'),
            value: `${numberWithNew({ number: v?.amountPartner })} (99%)`,
          },
          {
            title: t('DIS Commission (1%)'),
            value: `${numberWithNew({ number: pay })} (1%)`,
          },
        ],
      };
    });
  }, [data]);

  return { response, columns, listmobile, listdesktop };
};

export default usePayment;
