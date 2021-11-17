import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import usePayment from './usePayment';
import Spinner from 'components/Custom/Spinner';
import Pagination from 'components/Custom/Pagination';
import Table from '../../components/Table';
import dayjs from 'dayjs';
import DatePcker from 'components/Custom/DatePicker';
import { countPagination, numberWithNew } from 'services/utils';
import { useAppSelector } from 'services/redux/hooks';
import useWindowWidth from 'services/hooks/useWindowWidth';
import MobileTable from '../../components/MobileTable';
import { Container, MoneyIcon, DiscountIcon } from './style';
import {
  Label,
  RightHeader,
  TotalSum,
  WrapTotal,
  WrapTotalSum,
  WrapPag,
  Info,
  WrapSum,
} from '../../style';

interface intialFilterProps {
  page?: number;
  perPage?: number;
  dateFrom?: string;
  dateTo?: string;
}

const Payment = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const data = useAppSelector((state) => state.finance.paymentFinance.data);
  const total = useAppSelector((state) => state.finance.paymentFinance.total);
  const between = useAppSelector(
    (state) => state.finance.paymentFinance.between
  );
  const header = useAppSelector((state) => state.finance.paymentFinance.header);

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

  const { response } = usePayment({
    filterValues: filterValues,
  });

  const listdesktop = data?.map((v: any) => {
    const date = dayjs(v?.payDate).format('DD.MM.YYYY HH:mm');
    const pay: number = v?.amount - v?.amountPartner;
    return {
      col1: date,
      col2: `${v?.firstName}  ${v?.lastName}`,
      col3: v?.cardNumber,
      col4: numberWithNew({ number: v?.amount }),
      col5: `${numberWithNew({ number: v?.amountPartner })} (99%)`,
      col6: `${numberWithNew({ number: pay })} (1%)`,
    };
  });

  const listmobile = data.map((v: any) => {
    const date = dayjs(v?.payDate).format('DD.MM.YYYY HH:mm');
    const pay: number = v?.amount - v?.amountPartner;
    return {
      title: `${v?.firstName}  ${v?.lastName}`,
      value: numberWithNew({ number: v?.amount }),
      body: [
        { title: t('dateandtime'), value: date },
        {
          title: t('customer'),
          value: `${v?.firstName}  ${v?.lastName}`,
        },
        {
          title: t('cardnumber'),
          value: v?.cardNumber,
        },
        {
          title: t('UZSamount'),
          value: numberWithNew({ number: v?.amount }),
        },
        {
          title: t('Profit (99%)'),
          value: `${numberWithNew({ number: v?.amountPartner })} (99%)`,
        },
        {
          title: t('DIS Commission (1%)'),
          value: `${numberWithNew({ number: pay })} (1%)`,
        },
      ],
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
          {header.map((v: any) => {
            return (
              <WrapTotalSum>
                <Label>{v.title}</Label>
                <TotalSum>
                  {numberWithNew({
                    number: +v.value,
                    defaultValue: 0,
                  })}
                </TotalSum>
              </WrapTotalSum>
            );
          })}
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
        />
        {width <= 600 ? (
          <WrapTotal>
            <WrapTotalSum>
              <MoneyIcon />
              <WrapSum>
                <Label>{header[0]?.title || t('totalpaidbyUZS')}</Label>
                <TotalSum>
                  {numberWithNew({ number: header[0]?.value, defaultValue: 0 })}
                </TotalSum>
              </WrapSum>
            </WrapTotalSum>
            <WrapTotalSum>
              <DiscountIcon />
              <WrapSum>
                <Label>{header[1]?.title || t('DISCommission')}</Label>
                <TotalSum>
                  {numberWithNew({ number: header[1]?.value, defaultValue: 0 })}
                </TotalSum>
              </WrapSum>
            </WrapTotalSum>
          </WrapTotal>
        ) : null}
        {response.isLoading || response.isFetching ? (
          <Spinner />
        ) : width > 600 ? (
          <Table columns={columns} data={listdesktop} />
        ) : (
          <MobileTable
            data={{
              title: t('amountofpurchase'),
              info: listmobile,
            }}
            headertitle={t('p2p')}
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
            <Pagination
              page={filterValues.page}
              count={total.count}
              onChange={handlechangePage}
              disabled={response.isLoading || response.isFetching}
              siblingCount={0}
            />
          </WrapPag>
        )}
      </Container>
    </>
  );
};

export default Payment;
