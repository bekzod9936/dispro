import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { fetchFinanceSuggestion } from 'services/queries/financeQuery';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { numberWithNew } from 'services/utils';
import { formatPagination } from 'services/utils/formatPagination';
import {
  setSuggestionFinanceBetween,
  setSuggestionFinanceData,
  setSuggestionFinanceTotal,
} from 'services/redux/Slices/finance';

interface PProps {
  filterValues: any;
}

const useSuggestion = ({ filterValues }: PProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.finance.suggestionFinance.data);

  const response = useQuery(
    ['fetchSuggestionInfo', filterValues],
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => `${v}=${filterValues[v]}&`)
        .join('');
      return fetchFinanceSuggestion({
        url: url,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        dispatch(setSuggestionFinanceData(data.data.data.history));
        dispatch(
          setSuggestionFinanceTotal({
            count: Math.ceil(data.data.data.totalCount / filterValues?.perPage),
            pages: data.data.data.totalCount,
          })
        );
        dispatch(
          setSuggestionFinanceBetween(
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

  const listdesktop: any = useMemo(() => {
    return data?.map((v: any) => {
      return {
        col1: v?.payDate,
        col2: `${v?.firstName}  ${v?.lastName}`,
        col3: v?.amount,
        col4:
          v?.couponType === 1
            ? t('summoney')
            : v?.couponType === 2
            ? t('sale')
            : '-',
        col5: v?.amountPartner,
        col6: v?.disCommission,
        col7: v?.couponName,
      };
    });
  }, [data]);

  const columns: any = useMemo(
    () => [
      {
        Header: t('date'),
        accessor: 'col1',
        Cell: (props: any) => {
          return dayjs(props.value).format('DD.MM.YYYY');
        },
      },
      {
        Header: t('customer'),
        accessor: 'col2',
      },
      {
        Header: t('purchaseamount'),
        accessor: 'col3',
        Cell: (props: any) => {
          return numberWithNew({ number: props.value });
        },
      },
      {
        Header: t('type'),
        accessor: 'col4',
      },
      {
        Header: t('profit'),
        accessor: 'col5',
        Cell: (props: any) => {
          return `${numberWithNew({
            number: props.value,
          })}  (${numberWithNew({
            number: 100 - props.cell.row.original.col6,
          })}%)`;
        },
      },
      {
        Header: t('commission'),
        accessor: 'col6',
        Cell: (props: any) => {
          return `${numberWithNew({
            number: props.cell.row.original.col3 - props.cell.row.original.col5,
          })} (${numberWithNew({ number: props.value })}%)`;
        },
      },
      {
        Header: t('title'),
        accessor: 'col7',
      },
    ],
    []
  );

  const listmobile: any = useMemo(() => {
    return data.map((v: any) => {
      const date = dayjs(v?.payDate).format('DD.MM.YYYY');
      const profit = `${numberWithNew({
        number: v?.amountPartner,
      })}  (${numberWithNew({
        number: 100 - v?.disCommission,
      })}%)`;
      const commission = `${numberWithNew({
        number: v?.amount - v?.amountPartner,
      })} (${numberWithNew({ number: v?.disCommission })}%)`;
      const type =
        v?.couponType === 1
          ? t('summoney')
          : v?.couponType === 2
          ? t('sale')
          : '-';
      const consumer = `${v?.firstName}  ${v?.lastName}`;
      return {
        title: consumer,
        value: numberWithNew({ number: v?.amount }),
        body: [
          { title: t('date'), value: date },
          {
            title: t('customer'),
            value: consumer,
          },
          {
            title: t('purchaseamount'),
            value: numberWithNew({ number: v?.amount }),
          },
          {
            title: t('type'),
            value: type,
          },
          {
            title: t('profit'),
            value: profit,
          },
          {
            title: t('commission'),
            value: commission,
          },
          { title: t('title'), value: v?.couponName },
        ],
      };
    });
  }, [data]);

  return { response, listdesktop, columns, listmobile };
};

export default useSuggestion;
