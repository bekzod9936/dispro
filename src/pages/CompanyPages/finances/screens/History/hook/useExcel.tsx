import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { fetchFinanceHistoryExcel } from 'services/queries/FinanceQueries';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const useExcel = () => {
  const { t } = useTranslation();
  const [total, setTotal] = useState(0);
  const [minus, setMinus] = useState(0);
  const [paid, setPaid] = useState(0);

  const [date] = useState<any>({
    startDate: moment().startOf('month').format('YYYY-MM-DD'),
    endDate: moment().endOf('month').format('YYYY-MM-DD'),
  });

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const [excellist, setExcelList] = useState<any[]>([]);

  const resExcel = useQuery(
    'fetchPaymentInfoExcel',
    () => {
      return fetchFinanceHistoryExcel({
        startDate: date.startDate,
        endDate: date.endDate,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: false,
      onSuccess: (data) => {
        const excellist = data.data.data.cashierHistories.histories
          ?.map((v: any) => {
            const date = moment(v.chequeDate).format('DD.MM.YYYY');
            const time = moment(v.chequeDate).format('HH:mm:ss');
            return {
              [t('cashier')]:
                v.cashierName === 'No cashier name' ? t('p2p') : v.cashierName,
              [t('transactiondate')]: date,
              [t('transactiontime')]: time,
              [t('totalsum')]: v.payInfo.amountTotal,
              [t('discountSum')]: v.payInfo.amountMinus,
              [t('paid')]: v.payInfo.amountPayed,
              [t('customer')]: v.clientName,
              [t('loyaltypercentage')]:
                v.payInfo.isDiscount ||
                v.payInfo.isCashback ||
                v.payInfo.isPoints
                  ? v.payInfo.value
                  : '-',
              [t('coupon')]:
                v.payInfo.isCoupon && v.payInfo.valueType === 'percent'
                  ? v.payInfo.value
                  : '-',
              [t('certificate')]:
                v.payInfo.isCoupon && v.payInfo.valueType === 'amount'
                  ? v.payInfo.value
                  : '-',
            };
          })
          .concat([
            {
              [t('cashier')]: '',
              [t('transactiondate')]: '',
              [t('transactiontime')]: '',
              [t('totalsum')]: '',
              [t('discountSum')]: '',
              [t('paid')]: '',
              [t('customer')]: '',
              [t('loyaltypercentage')]: '',
              [t('coupon')]: '',
              [t('certificate')]: '',
            },
            {
              [t('cashier')]: '',
              [t('transactiondate')]: '',
              [t('transactiontime')]: '',
              [t('totalsum')]: '',
              [t('discountSum')]: t('total'),
              [t('paid')]: '',
              [t('customer')]: '',
              [t('loyaltypercentage')]: '',
              [t('coupon')]: '',
              [t('certificate')]: '',
            },
            {
              [t('cashier')]: '',
              [t('transactiondate')]: '',
              [t('transactiontime')]: '',
              [t('totalsum')]: data.data.data.cashierHistories.histories.reduce(
                (sum: any, v: any) => sum + v?.payInfo?.amountTotal,
                0
              ),
              [t('discountSum')]:
                data.data.data.cashierHistories.histories.reduce(
                  (sum: any, v: any) => sum + v?.payInfo?.amountMinus,
                  0
                ),
              [t('paid')]: data.data.data.cashierHistories.histories.reduce(
                (sum: any, v: any) => sum + v?.payInfo?.amountPayed,
                0
              ),
              [t('customer')]: '',
              [t('loyaltypercentage')]: '',
              [t('coupon')]: '',
              [t('certificate')]: '',
            },
          ]);

        const ws = XLSX.utils.json_to_sheet(excellist);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, {
          bookType: 'xlsx',
          type: 'array',
        });
        const data1 = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(
          data1,
          `${t('report')}/${t('from')}${date?.startDate}${t('to')}${
            date?.endDate
          }` + fileExtension
        );
      },
    }
  );

  return { resExcel, excellist, date };
};

export default useExcel;
