import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useHistory from './useHistory';
import Spinner from 'components/Custom/Spinner';
import Pagination from 'components/Custom/Pagination';
import Table from '../../components/Table';
import {
  Container,
  Wrap,
  WrapPag,
  Info,
  WrapFilter,
  WrapInputs,
  Label,
  WrapDate,
} from './style';
import { Tr, Th } from '../../components/Table/style';
import Filter from 'components/Custom/Filter/index';
import moment from 'moment';
import Input from 'components/Custom/Input';
import MultiSelect from 'components/Custom/MultiSelect';
import ExportCSV from './ExportCSV';

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

const Payment = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState(intialDate);
  const [dateLimit, setDateLimit] = useState({ startDate: '', endDate: '' });
  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);
  const [total, setTotal] = useState(0);
  const [minus, setMinus] = useState(0);
  const [paid, setPaid] = useState(0);
  const [cashierStaffId, setCashierStaffId] = useState<CashProp>();
  const { response, data, totalCount, between, cashier } = useHistory({
    filterValues: filterValues,
  });

  const list = data?.map((v: any) => {
    const date = moment(v.chequeDate).format('DD.MM.YYYY');
    const time = moment(v.chequeDate).format('HH:MM:SS');
    return {
      col1: v.cashierName,
      col2: date,
      col3: time,
      col4: v.payInfo.amountTotal,
      col5: v.payInfo.amountMinus,
      col6: v.payInfo.amountPayed,
      col7: v.clientName,
      col8: v.payInfo.value,
      col9: '-',
      col10: '-',
    };
  });

  const excellist = data
    ?.map((v: any) => {
      const date = moment(v.chequeDate).format('DD.MM.YYYY');
      const time = moment(v.chequeDate).format('HH:MM:SS');
      return {
        [t('cashier')]: v.cashierName,
        [t('transactiondate')]: date,
        [t('transactiontime')]: time,
        [t('totalsum')]: v.payInfo.amountTotal,
        [t('discountSum')]: v.payInfo.amountMinus,
        [t('paid')]: v.payInfo.amountPayed,
        [t('customer')]: v.clientName,
        [t('loyaltypercentage')]: v.payInfo.value,
        [t('coupon')]: '-',
        [t('certificate')]: '-',
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
        [t('totalsum')]: total,
        [t('discountSum')]: minus,
        [t('paid')]: paid,
        [t('customer')]: '',
        [t('loyaltypercentage')]: '',
        [t('coupon')]: '',
        [t('certificate')]: '',
      },
    ]);

  useEffect(() => {
    setTotal(
      data.reduce((sum: any, v: any) => sum + v?.payInfo?.amountTotal, 0)
    );
    setMinus(
      data.reduce((sum: any, v: any) => sum + v?.payInfo?.amountMinus, 0)
    );
    setPaid(
      data.reduce((sum: any, v: any) => sum + v?.payInfo?.amountPayed, 0)
    );
  }, [data]);

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
      <Th style={{ textAlign: 'center' }}>{total}</Th>
      <Th style={{ textAlign: 'center' }}>{minus}</Th>
      <Th style={{ textAlign: 'center' }}>{paid}</Th>
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
              min={dateLimit.startDate}
              max={dateLimit.endDate}
              IconStart={<WrapDate>{t('from')}</WrapDate>}
              inputStyle={{
                inpadding: '0 10px 0 0',
              }}
              value={date.startDate}
              onChange={(e: any) => {
                setDate({ ...date, startDate: e.target.value });
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
              max={dateLimit.endDate}
              value={date.endDate}
              onChange={(e: any) => {
                setDate({ ...date, endDate: e.target.value });
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
    await await response.refetch();
  };

  const onReset = async () => {
    await setFilterValues(intialFilter);
    await setDate(intialDate);
    await response.refetch();
  };

  return (
    <Container>
      <WrapFilter>
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
        <ExportCSV date={date} csvData={excellist} />
      </WrapFilter>
      <Wrap>
        {response.isLoading || response.isFetching ? (
          <Spinner />
        ) : (
          <>
            <Table header2={header2} columns={columns} data={list} />
          </>
        )}
        {list.length > 0 ? (
          <WrapPag>
            <Info>
              {t('shown')}
              <span>{between}</span>
              {t('from1')} <span>{totalCount}</span> {t('operations1')}
            </Info>
            <Pagination
              page={filterValues.page}
              count={totalCount}
              onChange={handlechangePage}
              disabled={response.isLoading || response.isFetching}
            />
          </WrapPag>
        ) : null}
      </Wrap>
    </Container>
  );
};

export default Payment;
