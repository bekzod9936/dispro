import { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useCashBack from './useCashBack';
import Spinner from 'components/Custom/Spinner';
import Table from '../../components/Table';
import DatePcker from 'components/Custom/DatePicker';
import dayjs from 'dayjs';
import { countPagination, numberWithNew } from 'services/utils';
import { useAppSelector } from 'services/redux/hooks';
import useWindowWidth from 'services/hooks/useWindowWidth';
import MobileTable from '../../components/MobileTable';
import financeCashierDef from '../../../../../assets/images/financeCashierDef.png';
import {
  Container,
  CashBackIcon,
  WrapIcon,
  WalletIcon,
  DiscountIcon,
} from './style';
import {
  Label,
  RightHeader,
  TotalSum,
  WrapTotal,
  WrapTotalSum,
  WrapPag,
  Info,
  WrapSum,
  Img,
  WrapDef,
  TitleDef,
} from '../../style';
import { NewPagination } from 'components/Custom/NewPagination';

interface intialFilterProps {
  page?: number;
  perPage?: number;
  dateFrom?: string;
  dateTo?: string;
}

const Payment = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const data = useAppSelector((state) => state.finance.cashBackFinance.data);
  const total = useAppSelector((state) => state.finance.cashBackFinance.total);
  const between = useAppSelector(
    (state) => state.finance.cashBackFinance.between
  );
  const header = useAppSelector(
    (state) => state.finance.cashBackFinance.header
  );

  const intialFilter = {
    page: 1,
    perPage: 5,
  };

  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response, enable } = useCashBack({
    filterValues: filterValues,
  });

  const listdesktop = data?.map((v: any) => {
    const date1 = dayjs(v.date).format('DD.MM.YYYY');
    const date2 = dayjs(v.activateDate).format('DD.MM.YYYY');
    return {
      col1: v.operationType,
      col2: v.clientName ? v.clientName : '-',
      col3: numberWithNew({ number: v.amount }),
      col4: numberWithNew({ number: Math.round((v.amount / 100) * 100) / 100 }),
      col5: date1,
      col6: date2,
      col7: v.status,
    };
  });

  const listmobile = data.map((v: any) => {
    const date1 = dayjs(v.date).format('DD.MM.YYYY');
    const date2 = dayjs(v.activateDate).format('DD.MM.YYYY');

    const bodydata =
      v.operationType === 'cashback_account_top_up'
        ? [
            {
              title: t('typeoftransaction'),
              value:
                v.operationType === 'cashback_account_top_up'
                  ? t('depositcashbek')
                  : v.operationType === 'cashback_in'
                  ? t('cashbackaccrual')
                  : '-',
            },
            {
              title: t('dateofaccrual'),
              value: date2,
            },
            {
              title: t('status'),
              value:
                v.status === 'success'
                  ? t('accrued')
                  : v.status === 'pending'
                  ? t('pending')
                  : t('canceled'),
            },
          ]
        : [
            {
              title: t('typeoftransaction'),
              value:
                v.operationType === 'cashback_account_top_up'
                  ? t('depositcashbek')
                  : v.operationType === 'cashback_in'
                  ? t('cashbackaccrual')
                  : '-',
            },
            {
              title: t('customer'),
              value: v.clientName ? v.clientName : '-',
            },
            {
              title: t('cashbackUZS'),
              value: numberWithNew({ number: v?.amount }),
            },
            {
              title: t('commission/top-upamount'),
              value: numberWithNew({
                number: Math.round((v.amount / 100) * 100) / 100,
              }),
            },
            {
              title: t('purchasedate'),
              value: date1,
            },
            {
              title: t('dateofaccrual'),
              value: date2,
            },
            {
              title: t('status'),
              value:
                v.status === 'success'
                  ? t('accrued')
                  : v.status === 'pending'
                  ? t('pending')
                  : t('canceled'),
            },
          ];
    return {
      title:
        v.operationType === 'cashback_account_top_up'
          ? t('depositcashbek')
          : v.operationType === 'cashback_in'
          ? t('cashbackaccrual')
          : '-',
      value: numberWithNew({ number: v?.amount }),
      icon: (
        <WrapIcon>
          {v.operationType === 'cashback_account_top_up' ? (
            <WalletIcon />
          ) : v.operationType === 'cashback_in' ? (
            <CashBackIcon />
          ) : null}
        </WrapIcon>
      ),
      body: bodydata,
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
            ) : props?.value === 'cashback_in' ? (
              <CashBackIcon />
            ) : (
              '-'
            )}
            {props?.value === 'cashback_account_top_up'
              ? t('depositcashbek')
              : props?.value === 'cashback_in'
              ? t('cashbackaccrual')
              : '-'}
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
          }}
        />
        {width <= 600 ? (
          <WrapTotal>
            <WrapTotalSum>
              <DiscountIcon />
              <WrapSum>
                <Label>{header[0]?.title || t('totalpaidbyUZS')}</Label>
                <TotalSum>
                  {numberWithNew({ number: header[0]?.value, defaultValue: 0 })}
                </TotalSum>
              </WrapSum>
            </WrapTotalSum>
            <WrapTotalSum>
              <CashBackIcon mobile={true} />
              <WrapSum>
                <Label>{header[1]?.title || t('DISCommission')}</Label>
                <TotalSum>
                  {numberWithNew({ number: header[1]?.value, defaultValue: 0 })}
                </TotalSum>
              </WrapSum>
            </WrapTotalSum>
          </WrapTotal>
        ) : null}
        {response.isLoading || response.isFetching || !enable ? (
          <Spinner />
        ) : data.length === 0 ? (
          <WrapDef>
            <Img src={financeCashierDef} alt='finance' />
            <TitleDef>{t('therewillbeahistoryofcashback')}</TitleDef>
          </WrapDef>
        ) : width > 600 ? (
          <Table columns={columns} data={listdesktop} />
        ) : (
          <MobileTable
            data={{
              title: t('amountofpurchase'),
              info: listmobile,
            }}
            headertitle={t('cashbackSum')}
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
    </>
  );
};

export default Payment;
