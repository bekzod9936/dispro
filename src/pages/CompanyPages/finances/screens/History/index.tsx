import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useHistory from './useHistory';
import Spinner from 'components/Custom/Spinner';
import Pagination from 'components/Custom/Pagination';
import Table from '../../components/Table';
import { Container, Wrap, WrapPag, Info, WrapFilter } from './style';
import { Tr, Th } from '../../components/Table/style';
import Filter from 'components/Custom/Filter/index';
import Button from 'components/Custom/Button';
import { ReactComponent as ExcelIcon } from 'assets/icons/FinanceIcons/excel.svg';
import moment from 'moment';
interface intialFilterProps {
  page?: number;
  perPage?: number;
  cashierStaffId?: number;
  endDate?: string;
  startDate?: string;
}

const intialFilter = {
  startDate: '2021-10-01',
  endDate: '2021-10-31',
  cashierStaffId: 0,
  page: 1,
  perPage: 5,
};

const Payment = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState({ dateFrom: '', dateTo: '' });
  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response, data, totalCount, between } = useHistory({
    filterValues: filterValues,
  });

  const list = data?.map((v: any) => {
    const date = moment(v?.chequeDate).format('DD.MM.YYYY HH:MM');
    const time = moment(v?.chequeDate).format('HH:MM:SS');
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
      <Th style={{ textAlign: 'center' }}>513 000</Th>
      <Th style={{ textAlign: 'center' }}>63 000</Th>
      <Th style={{ textAlign: 'center' }}>410 000</Th>
    </Tr>
  );

  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await response.refetch();
  };

  return (
    <Container>
      <WrapFilter>
        <Filter />
        <Button startIcon={<ExcelIcon />} buttonStyle={{ bgcolor: '#45A13B' }}>
          {t('exportexcel')}
        </Button>
      </WrapFilter>
      <Wrap>
        {response.isLoading || response.isFetching ? (
          <Spinner />
        ) : (
          <>
            <Table header2={header2} columns={columns} data={list} />
          </>
        )}
        {list.length > 1 ? (
          <WrapPag>
            <Info>
              Показано
              <span>{between}</span>
              из <span>{totalCount}</span> операций
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
