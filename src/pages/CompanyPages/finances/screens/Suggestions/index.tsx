import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSuggestion from './useSuggestions';
import Spinner from 'components/Custom/Spinner';
import Table from '../../components/Table';
import dayjs from 'dayjs';
import { Container } from './style';
import DatePcker from 'components/Custom/DatePicker';
import { useAppSelector } from 'services/redux/hooks';
import { countPagination, numberWithNew } from 'services/utils';
import useWindowWidth from 'services/hooks/useWindowWidth';
import MobileTable from '../../components/MobileTable';
import financeCashierDef from '../../../../../assets/images/financeCashierDef.png';
import { Info, WrapPag, Img, WrapDef, TitleDef } from '../../style';
import { NewPagination } from 'components/Custom/NewPagination';

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

  const listdesktop: any = data?.map((v: any) => {
    const date = dayjs(v?.payDate).format('DD.MM.YYYY');
    const profit = `${numberWithNew({
      number: v?.amountPartner,
    })}  (${numberWithNew({
      number: 100 - v?.disCommission,
    })}%)`;
    const commission = `${numberWithNew({
      number: v?.amount - v?.amountPartner,
    })} (${numberWithNew({ number: v?.disCommission })}%)`;
    const type =
      v?.couponType === 1
        ? t('summoney')
        : v?.couponType === 2
        ? t('sale')
        : '-';
    const consumer = `${v?.firstName}  ${v?.lastName}`;
    return {
      col1: date,
      col2: consumer,
      col3: numberWithNew({ number: v?.amount }),
      col4: type,
      col5: profit,
      col6: commission,
      col7: v?.couponName,
    };
  });

  const listmobile: any = data.map((v: any) => {
    const date = dayjs(v?.payDate).format('DD.MM.YYYY');
    const profit = `${numberWithNew({
      number: v?.amountPartner,
    })}  (${numberWithNew({
      number: 100 - v?.disCommission,
    })}%)`;
    const commission = `${numberWithNew({
      number: v?.amount - v?.amountPartner,
    })} (${numberWithNew({ number: v?.disCommission })}%)`;
    const type =
      v?.couponType === 1
        ? t('summoney')
        : v?.couponType === 2
        ? t('sale')
        : '-';
    const consumer = `${v?.firstName}  ${v?.lastName}`;
    return {
      title: consumer,
      value: numberWithNew({ number: v?.amount }),
      body: [
        { title: t('date'), value: date },
        {
          title: t('customer'),
          value: consumer,
        },
        {
          title: t('purchaseamount'),
          value: numberWithNew({ number: v?.amount }),
        },
        {
          title: t('type'),
          value: type,
        },
        {
          title: t('profit'),
          value: profit,
        },
        {
          title: t('commission'),
          value: commission,
        },
        { title: t('title'), value: v?.couponName },
      ],
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
      ) : data.length === 0 ? (
        <WrapDef>
          <Img src={financeCashierDef} alt='finance' />
          <TitleDef>{t('therewillbeahistoryofsuggestions')}</TitleDef>
        </WrapDef>
      ) : width > 600 ? (
        <Table columns={columns} data={listdesktop} />
      ) : (
        <MobileTable
          data={{
            title: t('amountofpurchase'),
            info: listmobile,
          }}
          headertitle={t('proposals')}
        />
      )}
      {data.length === 0 ? null : (
        <WrapPag>
          <Info>
            {t('shown')}
            <span>{between}</span>
            {t('from1')} <span>{total.pages}</span>
            {countPagination({
              count: Number(total.pages),
              firstWord: t('operations1'),
              secondWord: t('operations23'),
            })}
          </Info>
          <NewPagination
            onChange={handlechangePage}
            currentPage={Number(filterValues.page)}
            totalCount={Number(total?.count)}
          />
        </WrapPag>
      )}
    </Container>
  );
};

export default Suggestions;
