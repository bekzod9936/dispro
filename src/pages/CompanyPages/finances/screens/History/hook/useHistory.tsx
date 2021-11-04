import moment from 'moment';
import { useState } from 'react';
import { useQuery } from 'react-query';
import {
  fetchFinanceHistory,
  fetchFinanceHistoryExcel,
} from 'services/queries/FinanceQueries';
import { formatPagination } from 'services/utils/formatPagination';

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
  const [between, setBetween] = useState<string>('');
  const [total, setTotal] = useState(0);
  const [minus, setMinus] = useState(0);
  const [paid, setPaid] = useState(0);

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
          formatPagination({
            page: filterValues?.page,
            perPage: filterValues?.perPage,
            total: data.data.data.totalCount,
          })
        );
        setTotal(
          data.data.data.cashierHistories.histories.reduce(
            (sum: any, v: any) => sum + v?.payInfo?.amountTotal,
            0
          )
        );
        setMinus(
          data.data.data.cashierHistories.histories.reduce(
            (sum: any, v: any) => sum + v?.payInfo?.amountMinus,
            0
          )
        );
        setPaid(
          data.data.data.cashierHistories.histories.reduce(
            (sum: any, v: any) => sum + v?.payInfo?.amountPayed,
            0
          )
        );
      },
    }
  );

  return { response, data, totalCount, between, cashier, total, minus, paid };
};

export default useHistory;
