import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useHistory from './hook/useHistory';
import Spinner from 'components/Custom/Spinner';
import Pagination from 'components/Custom/Pagination';
import Table from '../../components/Table';
import { Tr, Th } from '../../components/Table/style';
import Filter from 'components/Custom/Filter/index';
import dayjs from 'dayjs';
import Input from 'components/Custom/Input';
import MultiSelect from 'components/Custom/MultiSelect';
import { ReactComponent as ExcelIcon } from 'assets/icons/FinanceIcons/excel.svg';
import useExcel from './hook/useExcel';
import Button from 'components/Custom/Button';
import { useAppSelector } from 'services/redux/hooks';
import { IconButton } from '@material-ui/core';
import { countPagination, numberWithNew } from 'services/utils';
import MobileTable from '../../components/MobileTable';
import useWindowWidth from 'services/hooks/useWindowWidth';
import {
  Container,
  WrapFilter,
  WrapInputs,
  Label,
  WrapDate,
  ButtonKeyWord,
  DeleteIcon,
  WrapFilterValues,
} from './style';
import { WrapPag, Info } from '../../style';

interface intialFilterProps {
  page?: number;
  perPage?: number;
  cashierStaffId?: number;
  endDate?: string;
  startDate?: string;
}

interface CashProp {
  value?: number;
  label?: string;
}

const Payment = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const data = useAppSelector((state) => state.finance.historyFinance.data);
  const total = useAppSelector((state) => state.finance.historyFinance.total);
  const between = useAppSelector(
    (state) => state.finance.historyFinance.between
  );

  const sum = useAppSelector((state) => state.finance.historyFinance.sum);

  const cashier = useAppSelector(
    (state) => state.finance.historyFinance.cashier
  );

  const intialFilter = {
    startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD'),
    cashierStaffId: 0,
    page: 1,
    perPage: 5,
  };

  const intialDate = {
    startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD'),
  };

  const [date, setDate] = useState(intialDate);
  const [dateLimit, setDateLimit] = useState({ startDate: '', endDate: '' });
  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);
  const [cashierStaffId, setCashierStaffId] = useState<CashProp>();

  const { response } = useHistory({
    filterValues: filterValues,
  });

  const { resExcel } = useExcel();
  const list = data?.map((v: any) => {
    const date = dayjs(v.chequeDate).format('DD.MM.YYYY');
    const time = dayjs(v.chequeDate).format('HH:mm:ss');
    return {
      col1: v.cashierName === 'No cashier name' ? t('p2p') : v.cashierName,
      col2: date,
      col3: time,
      col4: v.payInfo.amountTotal,
      col5: v.payInfo.amountMinus,
      col6: v.payInfo.amountPayed,
      col7: v.clientName,
      col8:
        v.payInfo.isDiscount || v.payInfo.isCashback || v.payInfo.isPoints
          ? v.payInfo.value
          : '-',
      col9:
        v.payInfo.isCoupon && v.payInfo.valueType === 'percent'
          ? v.payInfo.value
          : '-',
      col10:
        v.payInfo.isCoupon && v.payInfo.valueType === 'amount'
          ? v.payInfo.value
          : '-',
    };
  });

  const columns: any = useMemo(
    () => [
      {
        Header: t('cashier'),
        accessor: 'col1',
      },
      {
        Header: t('transactiondate'),
        accessor: 'col2',
      },
      {
        Header: t('transactiontime'),
        accessor: 'col3',
      },
      {
        Header: t('totalsum'),
        accessor: 'col4',
      },
      {
        Header: t('discountSum'),
        accessor: 'col5',
      },
      {
        Header: t('paid'),
        accessor: 'col6',
      },
      {
        Header: t('customer'),
        accessor: 'col7',
      },
      {
        Header: t('loyaltypercentage'),
        accessor: 'col8',
      },
      {
        Header: t('coupon'),
        accessor: 'col9',
      },
      {
        Header: t('certificate'),
        accessor: 'col10',
      },
    ],
    []
  );

  const header2 = (
    <Tr>
      <Th style={{ textAlign: 'center' }} colSpan={3}>
        {t('total')}
      </Th>
      <Th style={{ textAlign: 'center' }}>{sum.total}</Th>
      <Th style={{ textAlign: 'center' }}>{sum.minus}</Th>
      <Th style={{ textAlign: 'center' }}>{sum.paid}</Th>
    </Tr>
  );

  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await response.refetch();
  };

  const filterList = [
    {
      title: t('byDate'),
      content: (
        <WrapInputs>
          <Label>{t('chose_date')}</Label>
          <div>
            <Input
              type='date'
              width={{
                maxwidth: 200,
              }}
              max={dateLimit.endDate}
              IconStart={<WrapDate>{t('from')}</WrapDate>}
              inputStyle={{
                inpadding: '0 10px 0 0',
              }}
              value={date.startDate}
              onChange={(e: any) => {
                const d = new Date(e.target.value);
                const isafter = dayjs(d).isAfter(dayjs(date.endDate));
                if (isafter) {
                  const a: any = dayjs(e.target.value, 'YYYY-MM-DD').add(
                    1,
                    'days'
                  );
                  let b: any = dayjs(a._d).format('YYYY-MM-DD');
                  setDate({
                    endDate: b,
                    startDate: e.target.value,
                  });
                } else {
                  setDate({ ...date, startDate: e.target.value });
                }

                setDateLimit({ ...dateLimit, startDate: e.target.value });
              }}
            />
            <Input
              type='date'
              width={{
                maxwidth: 200,
              }}
              margin={{ laptop: '0 0 0 15px' }}
              IconStart={<WrapDate>{t('to')}</WrapDate>}
              inputStyle={{
                inpadding: '0 10px 0 0',
              }}
              min={dateLimit.startDate}
              value={date.endDate}
              onChange={(e: any) => {
                const d = new Date(e.target.value);
                const isafter = dayjs(d).isBefore(dayjs(date.startDate));
                if (isafter) {
                  const a: any = dayjs(e.target.value, 'YYYY-MM-DD').add(
                    -1,
                    'days'
                  );
                  let b: any = dayjs(a._d).format('YYYY-MM-DD');
                  setDate({
                    startDate: b,
                    endDate: e.target.value,
                  });
                } else {
                  setDate({ ...date, endDate: e.target.value });
                }
                setDateLimit({ ...dateLimit, endDate: e.target.value });
              }}
            />
          </div>
        </WrapInputs>
      ),
    },
    {
      title: t('bycashier'),
      content: (
        <MultiSelect
          label={t('chose_cashier')}
          options={cashier}
          placeholder={t('cashiernotselected')}
          onChange={(e: any) => setCashierStaffId(e)}
          value={cashierStaffId}
        />
      ),
    },
  ];

  const handleFilterSubmit = async ({ startDate = '', endDate = '' }) => {
    await setFilterValues({
      ...filterValues,
      cashierStaffId: cashierStaffId?.value,
      startDate: startDate,
      endDate: endDate,
    });

    await response.refetch();
  };

  const onReset = async () => {
    await setFilterValues(intialFilter);
    await setDate(intialDate);
    await setCashierStaffId({});
    await setDateLimit({ startDate: '', endDate: '' });
    await response.refetch();
  };

  const handleClick = () => {
    resExcel.refetch();
  };

  return (
    <Container>
      <WrapFilter>
        <WrapFilterValues>
          <Filter
            onSubmit={() =>
              handleFilterSubmit({
                startDate: date.startDate,
                endDate: date.endDate,
              })
            }
            onReset={onReset}
            list={filterList}
          />

          {dateLimit?.startDate !== '' && dateLimit?.endDate !== '' ? (
            <ButtonKeyWord
              onClick={async () => {
                await setFilterValues({
                  ...filterValues,
                  endDate: '',
                  startDate: '',
                });
                await setDate(intialDate);
                await setDateLimit({ startDate: '', endDate: '' });
                await response.refetch();
              }}
            >
              {`${dayjs(dateLimit?.startDate).format('DD MMMM')}-${dayjs(
                dateLimit?.endDate
              ).format('DD MMMM, YYYY')}`}
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </ButtonKeyWord>
          ) : null}
          {cashierStaffId?.label ? (
            <ButtonKeyWord
              onClick={async () => {
                await setFilterValues({
                  ...filterValues,
                  cashierStaffId: 0,
                });
                await setCashierStaffId({});
                await response.refetch();
              }}
            >
              {cashierStaffId?.label}
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </ButtonKeyWord>
          ) : null}
        </WrapFilterValues>

        <Button
          onClick={handleClick}
          startIcon={<ExcelIcon />}
          buttonStyle={{ bgcolor: '#45A13B' }}
          disabled={resExcel.isLoading}
        >
          {t('exportexcel')}
        </Button>
      </WrapFilter>
      {response.isLoading || response.isFetching ? (
        <Spinner />
      ) : width > 600 ? (
        <Table header2={header2} columns={columns} data={list} />
      ) : (
        <MobileTable
          data={{
            title: t('totalsum'),
            info: data.map((v: any) => {
              const date = dayjs(v.chequeDate).format('DD.MM.YYYY');
              const time = dayjs(v.chequeDate).format('HH:mm:ss');
              return {
                title:
                  v.cashierName === 'No cashier name'
                    ? t('p2p')
                    : v.cashierName,
                value: numberWithNew({ number: v.payInfo.amountTotal }),
                body: [
                  {
                    title: t('cashier'),
                    value:
                      v.cashierName === 'No cashier name'
                        ? t('p2p')
                        : v.cashierName,
                  },
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
                    value: v.payInfo.amountTotal,
                  },
                  {
                    title: t('discountSum'),
                    value: v.payInfo.amountMinus,
                  },
                  {
                    title: t('paid'),
                    value: v.payInfo.amountPayed,
                  },
                  { title: t('customer'), value: v.clientName },
                  {
                    title: t('loyaltypercentage'),
                    value:
                      v.payInfo.isDiscount ||
                      v.payInfo.isCashback ||
                      v.payInfo.isPoints
                        ? v.payInfo.value
                        : '-',
                  },
                  {
                    title: t('coupon'),
                    value:
                      v.payInfo.isCoupon && v.payInfo.valueType === 'percent'
                        ? v.payInfo.value
                        : '-',
                  },
                  {
                    title: t('certificate'),
                    value:
                      v.payInfo.isCoupon && v.payInfo.valueType === 'amount'
                        ? v.payInfo.value
                        : '-',
                  },
                ],
              };
            }),
          }}
          headertitle={t('byCashiers')}
        />
      )}
      {list.length > 0 ? (
        <WrapPag>
          <Info>
            {t('shown')}
            <span>{between}</span>
            {t('from1')} <span>{total.pages}</span>
            {countPagination({
              count: Number(total.count),
              firstWord: t('operations1'),
              secondWord: t('operations23'),
            })}
          </Info>
          <Pagination
            page={filterValues.page}
            count={total.count}
            onChange={handlechangePage}
            disabled={response.isLoading || response.isFetching}
          />
        </WrapPag>
      ) : null}
    </Container>
  );
};

export default Payment;
