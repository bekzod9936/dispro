import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useHistory from './hook/useHistory';
import Spinner from 'components/Custom/Spinner';
import Pagination from 'components/Custom/Pagination';
import Table from '../../components/Table';
import { Tr, Th } from '../../components/Table/style';
import Filter from 'components/Custom/Filter/index';
import moment from 'moment';
import Input from 'components/Custom/Input';
import MultiSelect from 'components/Custom/MultiSelect';
import { ReactComponent as ExcelIcon } from 'assets/icons/FinanceIcons/excel.svg';
import useExcel from './hook/useExcel';
import Button from 'components/Custom/Button';
import { useAppSelector } from 'services/redux/hooks';
import { IconButton } from '@material-ui/core';
import { countPagination } from 'services/utils';
import {
  Container,
  WrapPag,
  Info,
  WrapFilter,
  WrapInputs,
  Label,
  WrapDate,
  ButtonKeyWord,
  DeleteIcon,
  WrapFilterValues,
} from './style';

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

  const data = useAppSelector((state) => state.finance.historyFinance.data);
  const totalCount = useAppSelector(
    (state) => state.finance.historyFinance.totalCount
  );
  const between = useAppSelector(
    (state) => state.finance.historyFinance.between
  );

  const sum = useAppSelector((state) => state.finance.historyFinance.sum);

  const cashier = useAppSelector(
    (state) => state.finance.historyFinance.cashier
  );

  const intialFilter = {
    startDate: moment().startOf('month').format('YYYY-MM-DD'),
    endDate: moment().endOf('month').format('YYYY-MM-DD'),
    cashierStaffId: 0,
    page: 1,
    perPage: 5,
  };

  const intialDate = {
    startDate: moment().startOf('month').format('YYYY-MM-DD'),
    endDate: moment().endOf('month').format('YYYY-MM-DD'),
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
    const date = moment(v.chequeDate).format('DD.MM.YYYY');
    const time = moment(v.chequeDate).format('HH:mm:ss');
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
                const isafter = moment(d).isAfter(moment(date.endDate));
                if (isafter) {
                  const a: any = moment(e.target.value, 'YYYY-MM-DD').add(
                    1,
                    'days'
                  );
                  let b: any = moment(a._d).format('YYYY-MM-DD');
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
                const isafter = moment(d).isBefore(moment(date.startDate));
                if (isafter) {
                  const a: any = moment(e.target.value, 'YYYY-MM-DD').add(
                    -1,
                    'days'
                  );
                  let b: any = moment(a._d).format('YYYY-MM-DD');
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
              {`${moment(dateLimit?.startDate).format('Do MMMM')}-${moment(
                dateLimit?.endDate
              ).format('Do MMMM, YYYY')}`}
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
      ) : (
        <Table header2={header2} columns={columns} data={list} />
      )}
      {list.length > 0 ? (
        <WrapPag>
          <Info>
            {t('shown')}
            <span>{between}</span>
            {t('from1')} <span>{totalCount}</span>
            {countPagination({
              count: totalCount,
              firstWord: t('page1'),
              secondWord: t('page23'),
            })}
          </Info>
          <Pagination
            page={filterValues.page}
            count={totalCount}
            onChange={handlechangePage}
            disabled={response.isLoading || response.isFetching}
          />
        </WrapPag>
      ) : null}
    </Container>
  );
};

export default Payment;
