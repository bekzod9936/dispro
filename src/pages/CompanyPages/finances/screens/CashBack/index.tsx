import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useCashBack from './useCashBack';
import Spinner from 'components/Custom/Spinner';
import Pagination from 'components/Custom/Pagination';
import Table from '../../components/Table';
import DatePcker from 'components/Custom/DatePicker';
import moment from 'moment';
import {
  Container,
  Wrap,
  WrapPag,
  Info,
  CashBackIcon,
  WrapIcon,
  WalletIcon,
} from './style';
import {
  Label,
  RightHeader,
  TotalSum,
  WrapTotal,
  WrapTotalSum,
} from '../../style';
interface intialFilterProps {
  page?: number;
  perPage?: number;
  dateFrom?: string;
  dateTo?: string;
}
const companyId = localStorage.getItem('companyId');
const intialFilter = {
  accountId: companyId,
  page: 1,
  perPage: 5,
};

const Payment = () => {
  const { t } = useTranslation();
  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response, data, totalCount, between, header } = useCashBack({
    filterValues: filterValues,
  });

  const list = data?.map((v: any) => {
    const date1 = moment(v.date).format('DD.MM.YYYY');
    const date2 = moment(v.activateDate).format('DD.MM.YYYY');
    return {
      col1: v.operationType,
      col2: v.clientName,
      col3: v.amount,
      col4: v.amountCommission,
      col5: date1,
      col6: date2,
      col7: v.status,
    };
  });

  const columns: any = useMemo(
    () => [
      {
        Header: t('typeoftransaction'),
        accessor: 'col1',
        Cell: (props: any) => (
          <WrapIcon>
            {props?.value === 'cashback_account_top_up' ? (
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
        Cell: (props: any) => (
          <>
            {props?.value === 'success'
              ? t('accrued')
              : props?.value === 'pending'
              ? t('pending')
              : t('canceled')}
          </>
        ),
      },
    ],
    []
  );

  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await response.refetch();
  };

  return (
    <>
      <RightHeader>
        <WrapTotal>
          {header.map((v: any) => (
            <WrapTotalSum>
              <Label>{v.title || ''}</Label>
              <TotalSum>{v.value || 0}</TotalSum>
            </WrapTotalSum>
          ))}
        </WrapTotal>
      </RightHeader>
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
    </>
  );
};

export default Payment;
