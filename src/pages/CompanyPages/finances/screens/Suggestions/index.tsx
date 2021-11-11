import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSuggestion from './useSuggestions';
import Spinner from 'components/Custom/Spinner';
import Pagination from 'components/Custom/Pagination';
import Table from '../../components/Table';
import moment from 'moment';
import { Container, WrapPag, Info } from './style';
import DatePcker from 'components/Custom/DatePicker';
import { useAppSelector } from 'services/redux/hooks';

interface intialFilterProps {
  page?: number;
  perPage?: number;
  dateFrom?: string;
  dateTo?: string;
}

const Suggestions = () => {
  const { t } = useTranslation();
  const companyId = localStorage.getItem('companyId');
  const data = useAppSelector((state) => state.finance.suggestionFinance.data);
  const totalCount = useAppSelector(
    (state) => state.finance.suggestionFinance.totalCount
  );
  const between = useAppSelector(
    (state) => state.finance.suggestionFinance.between
  );

  const intialFilter = {
    companyId: companyId,
    page: 1,
    perPage: 5,
    dateFrom: '',
    dateTo: '',
  };

  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response } = useSuggestion({
    filterValues: filterValues,
  });

  const list: any = data?.map((v: any) => {
    const date = moment(v?.payDate).format('DD.MM.YYYY');
    return {
      col1: date,
      col2: `${v?.firstName}  ${v?.lastName}`,
      col3: v?.amount,
      col4:
        v?.couponType === 1
          ? t('summoney')
          : v?.couponType === 2
          ? t('sale')
          : '-',
      col5: v?.amountPartner,
      col6: v?.disCommission,
      col7: v?.couponName,
    };
  });

  const columns: any = useMemo(
    () => [
      {
        Header: t('date'),
        accessor: 'col1',
      },
      {
        Header: t('customer'),
        accessor: 'col2',
      },
      {
        Header: t('purchaseamount'),
        accessor: 'col3',
      },
      {
        Header: t('type'),
        accessor: 'col4',
      },
      {
        Header: t('profit'),
        accessor: 'col5',
      },
      {
        Header: t('commission'),
        accessor: 'col6',
      },
      {
        Header: t('title'),
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

      {response.isLoading || response.isFetching ? (
        <Spinner />
      ) : (
        <Table columns={columns} data={list} />
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
    </Container>
  );
};

export default Suggestions;
