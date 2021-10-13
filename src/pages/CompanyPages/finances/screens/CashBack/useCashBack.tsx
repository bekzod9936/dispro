import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { fetchFinanceCashBack } from 'services/queries/FinanceQueries';

interface Props {
  activateDate?: string;
  amount?: number;
  amountCommission?: number;
  clientName?: string;
  date?: string;
  finished?: boolean;
  status?: string;
}
interface PProps {
  filterValues: any;
}

interface FProps {
  page: number;
  perPage: number;
}

interface HProps {
  title?: string;
  value?: number;
}

const useCashBack = ({ filterValues }: PProps) => {
  const { t } = useTranslation();

  const [data, setData] = useState<Props[]>([
    {
      activateDate: '',
      amount: 0,
      amountCommission: 0,
      clientName: '',
      date: '',
      finished: false,
      status: '',
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
      return fetchFinanceCashBack({
        url: url,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        setData(data.data.data.history);
        console.log(data.data.data, 'ghhh');
        setHeader([
          {
            title: t('totalpaidbyUZS'),
            value: data.data.data.totalSum,
          },
          {
            title: t('DISCommission'),
            value: data.data.data.totalCommissionSum,
          },
        ]);
        setTotalCount(
          Math.ceil(data.data.data.totalCount / filterValues?.perPage)
        );
        setBetween(
          format({
            page: filterValues?.page,
            perPage: filterValues?.perPage,
          })
        );
      },
    }
  );

  return { response, data, totalCount, between, header };
};

export default useCashBack;
