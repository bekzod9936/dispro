import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import usePayment from './usePayment';
import Spinner from 'components/Custom/Spinner';
import Pagination from 'components/Custom/Pagination';
import Table from '../../components/Table';
import moment from 'moment';
import { Container, Wrap, WrapPag, Info } from './style';
import DatePcker from 'components/Custom/DatePicker';
import {
  Label,
  RightHeader,
  TotalSum,
  WrapTotal,
  WrapTotalSum,
} from '../../style';
import { numberWith } from 'services/utils';

interface intialFilterProps {
  page?: number;
  perPage?: number;
  dateFrom?: string;
  dateTo?: string;
}

const Payment = () => {
  const { t } = useTranslation();
  const companyId = localStorage.getItem('companyId');
  const intialFilter = {
    companyId: companyId,
    page: 1,
    perPage: 5,
    dateFrom: '',
    dateTo: '',
  };
  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response, data, totalCount, between, header } = usePayment({
    filterValues: filterValues,
  });

  const list = data?.map((v: any) => {
    const date = moment(v?.payDate).format('DD.MM.YYYY HH:mm');
    const pay: number = v?.amount - v?.amountPartner;
    return {
      col1: date,
      col2: `${v?.firstName}  ${v?.lastName}`,
      col3: v?.cardNumber,
      col4: v?.amount,
      col5: v?.amountPartner,
      col6: pay.toFixed(2)?.replace(/\.0+$/, ''),
    };
  });

  const columns: any = useMemo(
    () => [
      {
        Header: t('dateandtime'),
        accessor: 'col1',
      },
      {
        Header: t('customer'),
        accessor: 'col2',
      },
      {
        Header: t('cardnumber'),
        accessor: 'col3',
      },
      {
        Header: t('UZSamount'),
        accessor: 'col4',
      },
      {
        Header: t('Profit (99%)'),
        accessor: 'col5',
      },
      {
        Header: t('DIS Commission (1%)'),
        accessor: 'col6',
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
              <TotalSum>{numberWith(v.value, ' ', '0')}</TotalSum>
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
