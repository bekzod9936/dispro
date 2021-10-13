import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useCashBack from './useCashBack';
import Spinner from 'components/Custom/Spinner';
import Pagination from 'components/Custom/Pagination';
import Table from '../../components/Table';
import {
  Container,
  Wrap,
  WrapPag,
  Info,
  CashBackIcon,
  WrapIcon,
  WalletIcon,
} from './style';
import DatePcker from 'components/Custom/DatePicker';

interface intialFilterProps {
  page?: number;
  perPage?: number;
  dateFrom?: string;
  dateTo?: string;
}
const companyId = localStorage.getItem('companyId');
const intialFilter = {
  companyId: companyId,
  page: 1,
  perPage: 5,
  dateFrom: '',
  dateTo: '',
};

const Payment = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState({ dateFrom: '', dateTo: '' });
  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response, data, totalCount, between } = useCashBack({
    filterValues: filterValues,
  });

  const list = [
    {
      col1: 'Начисление кешбэка',
      col2: 'Фахриддин Юлдошев',
      col3: 15008,
      col4: 150,
      col5: '22.06.2021',
      col6: '22.06.2021',
      col7: 'Начислено',
    },
    {
      col1: 'Пополнение депозита',
      col2: 'Фахриддин Юлдошев',
      col3: 1500,
      col4: 20,
      col5: '22.06.2021',
      col6: '22.06.2021',
      col7: 'Начислено',
    },
    {
      col1: 'Начисление кешбэка',
      col2: 'Фахриддин Юлдошев',
      col3: 15000,
      col4: 150,
      col5: '22.06.2021',
      col6: '22.06.2021',
      col7: 'Начислено',
    },
    {
      col1: 'Пополнение депозита',
      col2: 'Фахриддин Юлдошев',
      col3: 15000,
      col4: 10,
      col5: '22.06.2021',
      col6: '22.06.2021',
      col7: 'Начислено',
    },
  ];

  const columns: any = useMemo(
    () => [
      {
        Header: t('typeoftransaction'),
        accessor: 'col1',
        Cell: (props: any) => (
          <WrapIcon>
            {props?.value === 'Пополнение депозита' ? (
              <WalletIcon />
            ) : (
              <CashBackIcon />
            )}
            {props?.value}
          </WrapIcon>
        ),
      },
      {
        Header: t('customer'),
        accessor: 'col2',
      },
      {
        Header: t('cashbackUZS'),
        accessor: 'col3',
      },
      {
        Header: t('commission/top-upamount'),
        accessor: 'col4',
      },
      {
        Header: t('purchasedate'),
        accessor: 'col5',
      },
      {
        Header: t('dateofaccrual'),
        accessor: 'col6',
      },
      {
        Header: t('status'),
        accessor: 'col7',
      },
    ],
    []
  );

  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await response.refetch();
  };

  return (
    <Container>
      <DatePcker
        onChange={async (e: any) => {
          await setFilterValues({
            ...filterValues,
            dateFrom: e.slice(0, e.indexOf(' ~')),
            dateTo: e.slice(e.indexOf('~ ') + 2),
          });
          await response.refetch();
        }}
        margin='0 0 20px 0'
      />
      <Wrap>
        {response.isLoading || response.isFetching ? (
          <Spinner />
        ) : (
          <>
            <Table columns={columns} data={list} />
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
