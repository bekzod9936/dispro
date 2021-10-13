import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchFinanceHistory } from 'services/queries/FinanceQueries';

interface Props {
  cashierName?: string;
  chequeDate?: string;
  chequeStatus?: number;
  clientName?: string;
  payInfo?: {
    amountMinus?: number;
    amountPayed?: number;
    amountTotal?: number;
    isCashback?: boolean;
    isCoupon?: boolean;
    isDiscount?: boolean;
    isPoints?: boolean;
    usedPointAmount?: number;
    value?: number;
    valueType?: string;
  };
}
interface PProps {
  filterValues: any;
}

interface FProps {
  page: number;
  perPage: number;
}

interface CProps {
  value?: number;
  label?: string;
}

const useHistory = ({ filterValues }: PProps) => {
  const [data, setData] = useState<Props[]>([
    {
      cashierName: '',
      chequeDate: '',
      chequeStatus: 0,
      clientName: '',
      payInfo: {
        amountMinus: 0,
        amountPayed: 0,
        amountTotal: 0,
        isCashback: false,
        isCoupon: false,
        isDiscount: false,
        isPoints: false,
        usedPointAmount: 0,
        value: 0,
        valueType: '',
      },
    },
  ]);

  const [cashier, setCashier] = useState<CProps[]>([
    {
      value: 0,
      label: '',
    },
  ]);

  const [totalCount, setTotalCount] = useState<number>(0);

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
      return fetchFinanceHistory({
        url: url,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        setData(data.data.data.cashierHistories.histories);
        setCashier(
          data.data.data.cashierHistories.filter.cashierStaffs.map((v: any) => {
            return {
              value: v.id,
              label: v.name,
            };
          })
        );
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

  return { response, data, totalCount, between, cashier };
};

export default useHistory;
