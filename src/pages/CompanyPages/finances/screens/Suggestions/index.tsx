import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSuggestion from './useSuggestions';
import Spinner from 'components/Custom/Spinner';
import Pagination from 'components/Custom/Pagination';
import Table from '../../components/Table';
import dayjs from 'dayjs';
import { Container } from './style';
import DatePcker from 'components/Custom/DatePicker';
import { useAppSelector } from 'services/redux/hooks';
import { countPagination, numberWithNew } from 'services/utils';
import useWindowWidth from 'services/hooks/useWindowWidth';
import MobileTable from '../../components/MobileTable';
import { Info, WrapPag } from '../../style';

interface intialFilterProps {
  page?: number;
  perPage?: number;
  dateFrom?: string;
  dateTo?: string;
}

const Suggestions = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const companyId = localStorage.getItem('companyId');
  const data = useAppSelector((state) => state.finance.suggestionFinance.data);
  const total = useAppSelector(
    (state) => state.finance.suggestionFinance.total
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
    const date = dayjs(v?.payDate).format('DD.MM.YYYY');
    return {
      col1: date,
      col2: `${v?.firstName}  ${v?.lastName}`,
      col3: numberWithNew({ number: v?.amount }),
      col4:
        v?.couponType === 1
          ? t('summoney')
          : v?.couponType === 2
          ? t('sale')
          : '-',
      col5: numberWithNew({ number: v?.amountPartner }),
      col6: numberWithNew({ number: v?.disCommission }),
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
      />

      {response.isLoading || response.isFetching ? (
        <Spinner />
      ) : width > 600 ? (
        <Table columns={columns} data={list} />
      ) : (
        <MobileTable
          data={{
            title: t('amountofpurchase'),
            info: data.map((v: any) => {
              const date = dayjs(v?.payDate).format('DD.MM.YYYY');
              return {
                title: `${v?.firstName}  ${v?.lastName}`,
                value: numberWithNew({ number: v?.amount }),
                body: [
                  { title: t('date'), value: date },
                  {
                    title: t('customer'),
                    value: `${v?.firstName}  ${v?.lastName}`,
                  },
                  {
                    title: t('purchaseamount'),
                    value: numberWithNew({ number: v?.amount }),
                  },
                  {
                    title: t('type'),
                    value:
                      v?.couponType === 1
                        ? t('summoney')
                        : v?.couponType === 2
                        ? t('sale')
                        : '-',
                  },
                  {
                    title: t('profit'),
                    value: numberWithNew({ number: v?.amountPartner }),
                  },
                  {
                    title: t('commission'),
                    value: numberWithNew({ number: v?.disCommission }),
                  },
                  { title: t('title'), value: v?.couponName },
                ],
              };
            }),
          }}
          headertitle={t('proposals')}
        />
      )}
      {list.length > 0 ? (
        <WrapPag>
          <Info>
            {t('shown')}
            <span>{between}</span>
            {t('from1')} <span>{total.pages}</span>
            {countPagination({
              count: Number(total?.count),
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

export default Suggestions;
