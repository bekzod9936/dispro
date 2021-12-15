import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useHistory from './hook/useHistory';
import Spinner from 'components/Custom/Spinner';
import Table from '../../components/Table';
import { Tr, Th } from '../../components/Table/style';
import dayjs from 'dayjs';
import { useAppSelector } from 'services/redux/hooks';
import { countPagination, numberWithNew } from 'services/utils';
import MobileTable from '../../components/MobileTable';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import financeCashierDef from '../../../../../assets/images/financeCashierDef.png';
import { NewPagination } from 'components/Custom/NewPagination';
import {
  Container,
  MoneyIcon,
  DiscountIcon,
  PinkIcon,
  CartIcon,
} from './style';
import {
  WrapPag,
  Info,
  TotalSum,
  WrapTotal,
  WrapTotalSum,
  WrapSum,
  Label,
  Img,
  WrapDef,
  TitleDef,
} from '../../style';
import FilterHistory from './components/FilterHistory';

interface intialFilterProps {
  page?: number;
  perPage?: number;
  cashierStaffId?: number | string;
  endDate?: string;
  startDate?: string;
  storeId?: number;
}

const Payment = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const data = useAppSelector((state) => state.finance.historyFinance.data);
  const total = useAppSelector((state) => state.finance.historyFinance.total);
  const between = useAppSelector(
    (state) => state.finance.historyFinance.between
  );

  const sum = useAppSelector((state) => state.finance.historyFinance.sum);

  const intialFilter = {
    startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD'),
    cashierStaffId: '',
    page: 1,
    perPage: 5,
  };

  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response } = useHistory({
    filterValues: filterValues,
  });

  const listdesktop = data?.map((v: any) => {
    const date = dayjs(v.chequeDate).format('DD.MM.YYYY');
    const time = dayjs(v.chequeDate).format('HH:mm:ss');
    return {
      col0: v.cashierLogo,
      col1: v.cashierName === 'No cashier name' ? t('p2p') : v.cashierName,
      col2: date,
      col3: time,
      col4: numberWithNew({ number: v.payInfo.amountTotal }),
      col5: numberWithNew({ number: v.payInfo.amountMinus }),
      col6: numberWithNew({ number: v.payInfo.amountPayed }),
      col7: v.clientName,
      col8:
        v.payInfo.isDiscount || v.payInfo.isCashback || v.payInfo.isPoints
          ? numberWithNew({ number: v.payInfo.value })
          : '-',
      col9:
        v.payInfo.isCoupon && v.payInfo.valueType === 'percent'
          ? `${numberWithNew({ number: v.payInfo.value })}%`
          : '-',
      col10:
        v.payInfo.isCoupon && v.payInfo.valueType === 'amount'
          ? numberWithNew({ number: v.payInfo.value })
          : '-',
    };
  });

  const listmobile = data.map((v: any) => {
    const date = dayjs(v.chequeDate).format('DD.MM.YYYY');
    const time = dayjs(v.chequeDate).format('HH:mm:ss');
    return {
      title: v.cashierName === 'No cashier name' ? t('p2p') : v.cashierName,
      value: numberWithNew({ number: v.payInfo.amountTotal }),
      avatar: v.cashierLogo,
      body: [
        {
          title: t('transactiondate'),
          value: date,
        },
        {
          title: t('transactiontime'),
          value: time,
        },
        {
          title: t('totalsum'),
          value: numberWithNew({ number: v.payInfo.amountTotal }),
        },
        {
          title: t('discountSum'),
          value: numberWithNew({ number: v.payInfo.amountMinus }),
        },
        {
          title: t('paid'),
          value: numberWithNew({ number: v.payInfo.amountPayed }),
        },
        { title: t('customer'), value: v.clientName },
        {
          title: t('loyaltypercentage'),
          value:
            v.payInfo.isDiscount || v.payInfo.isCashback || v.payInfo.isPoints
              ? numberWithNew({ number: v.payInfo.value })
              : '-',
        },
        {
          title: t('coupon'),
          value:
            v.payInfo.isCoupon && v.payInfo.valueType === 'percent'
              ? `${numberWithNew({ number: v.payInfo.value })}%`
              : '-',
        },
        {
          title: t('certificate'),
          value:
            v.payInfo.isCoupon && v.payInfo.valueType === 'amount'
              ? numberWithNew({ number: v.payInfo.value })
              : '-',
        },
      ],
    };
  });

  const columns: any = useMemo(
    () => [
      {
        Header: '',
        accessor: 'col0',
        Cell: (props: any) => {
          return props.value ? (
            <LazyLoadImage
              alt='avatar'
              height='40px'
              src={props.value}
              width='40px'
              effect='blur'
              style={{ objectFit: 'cover', borderRadius: '14px' }}
            />
          ) : (
            <PinkIcon />
          );
        },
      },
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
      <Th style={{ textAlign: 'center' }} colSpan={4}>
        {t('total')}
      </Th>
      <Th style={{ textAlign: 'center' }}>
        {numberWithNew({ number: sum.total })}
      </Th>
      <Th style={{ textAlign: 'center' }}>
        {numberWithNew({ number: sum.minus })}
      </Th>
      <Th style={{ textAlign: 'center' }}>
        {numberWithNew({ number: sum.paid })}
      </Th>
    </Tr>
  );

  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await response.refetch();
  };
  console.log(filterValues);
  return (
    <Container>
      {response.isLoading ? (
        <Spinner />
      ) : (
        <>
          <FilterHistory
            setFilterValues={setFilterValues}
            filterValues={filterValues}
            refetch={() => response.refetch()}
            intialFilter={intialFilter}
          />
          {width <= 600 ? (
            <WrapTotal>
              <WrapTotalSum>
                <MoneyIcon />
                <WrapSum>
                  <Label>{t('totalsum')}</Label>
                  <TotalSum>
                    {numberWithNew({ number: sum.total, defaultValue: 0 })}
                  </TotalSum>
                </WrapSum>
              </WrapTotalSum>
              <WrapTotalSum>
                <DiscountIcon />
                <WrapSum>
                  <Label>{t('sale')}</Label>
                  <TotalSum>
                    {numberWithNew({ number: sum.minus, defaultValue: 0 })}
                  </TotalSum>
                </WrapSum>
              </WrapTotalSum>
              <WrapTotalSum>
                <CartIcon />
                <WrapSum>
                  <Label>{t('paid')}</Label>
                  <TotalSum>
                    {numberWithNew({ number: sum.paid, defaultValue: 0 })}
                  </TotalSum>
                </WrapSum>
              </WrapTotalSum>
            </WrapTotal>
          ) : null}
          {response.isLoading || response.isFetching ? (
            <Spinner />
          ) : data.length === 0 ? (
            <WrapDef>
              <Img src={financeCashierDef} alt='finance' />
              <TitleDef>{t('therewillbeahistoryofcashiers')}</TitleDef>
            </WrapDef>
          ) : width > 600 ? (
            <Table header2={header2} columns={columns} data={listdesktop} />
          ) : (
            <MobileTable
              data={{
                title: t('totalsum'),
                info: listmobile,
              }}
              headertitle={t('byCashiers')}
              isAvatar={true}
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
              {!response.isFetching && (
                <NewPagination
                  onChange={handlechangePage}
                  currentPage={Number(filterValues.page)}
                  totalCount={Number(total?.count)}
                />
              )}
            </WrapPag>
          )}
        </>
      )}
    </Container>
  );
};

export default Payment;
