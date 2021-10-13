import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { fetchFinancePayment } from 'services/queries/FinanceQueries';

interface Props {
  amount: number;
  amountPartner: number;
  closed: boolean;
  disCommission: number;
  finished: boolean;
  firstName: string;
  id: number;
  lastName: string;
  payDate: string;
}
interface PProps {
  filterValues: any;
}

interface FProps {
  total: number;
  page: number;
  perPage: number;
}

interface HProps {
  title?: string;
  value?: number;
}

const usePayment = ({ filterValues }: PProps) => {
  const { t } = useTranslation();
  const [data, setData] = useState<Props[]>([
    {
      amount: 0,
      amountPartner: 0,
      closed: false,
      disCommission: 0,
      finished: false,
      firstName: '',
      id: 0,
      lastName: '',
      payDate: '',
    },
  ]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [header, setHeader] = useState<HProps[]>([{ title: '', value: 0 }]);

  function format({ page, perPage }: FProps) {
    let start = 1;
    let end = 1;
    if (page === 1) {
      start = 1;
      end = perPage;
    } else {
      start = (page - 1) * perPage + 1;
      end = page * perPage;
    }

    let info = `${start}-${end}`;
    return info;
  }

  const [between, setBetween] = useState<string>('');
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
        setData(data.data.data.history);
        setHeader([
          {
            title: t('totalpaidbyUZS'),
            value: data.data.data.totalSum,
          },
          {
            title: t('DISCommission'),
            value: data.data.data.totalDisCommissionSum,
          },
        ]);
        setTotalCount(
          Math.ceil(data.data.data.totalCount / filterValues?.perPage)
        );
        setBetween(
          format({
            total: data.data.data.totalCount,
            page: filterValues?.page,
            perPage: filterValues?.perPage,
          })
        );
      },
    }
  );

  return { response, data, totalCount, between, header };
};

export default usePayment;
