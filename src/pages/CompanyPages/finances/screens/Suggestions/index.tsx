import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSuggestion from './useSuggestions';
import Spinner from 'components/Custom/Spinner';
import Pagination from 'components/Custom/Pagination';
import Table from '../../components/Table';
import moment from 'moment';
import { Container, Wrap, WrapPag, Info } from './style';

const Suggestions = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const { response, data, totalCount, between } = useSuggestion({ page: page });

  const list = data?.map((v: any) => {
    const date = moment(v?.payDate).format('DD.MM.YYYY');
    return {
      col1: date,
      col2: v?.firstName + v?.lastName,
      col3: v?.amount,
      col4: v?.couponName,
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

  const handlechangePage = (e: any) => {
    setPage(e);
  };
  console.log(list.length);
  return (
    <Container>
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
              page={page}
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

export default Suggestions;
