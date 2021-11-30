import { useMemo, useEffect } from 'react';
import { Container, Img, WrapIcon, Wrapper } from './style';
import useOffersHook from './useOffersHook';
import { useTranslation } from 'react-i18next';
import Spinner from 'components/Custom/Spinner';
import Table from '../../components/Table';
import coupon from 'assets/icons/StatistisPage/coupon.png';
import coupon1 from 'assets/icons/StatistisPage/coupon1.png';
import gift from 'assets/icons/StatistisPage/gift.png';
import DatePcker from 'components/Custom/DatePicker';
import { useAppSelector } from 'services/redux/hooks';
import MobileTable from '../../components/MobileTable';
import useWindowWidth from 'services/hooks/useWindowWidth';

const Offers = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const data = useAppSelector((state) => state.statistics.offers);
  const { response, date, setDate } = useOffersHook();

  useEffect(() => {
    response.refetch();
  }, [date]);

  const listdesktop = data?.map((v: any) => {
    return {
      col1: v?.type,
      col2: v?.payedCount,
      col3: v?.activeCount,
      col4: v?.expireCount,
      col5: v?.usedCount,
    };
  });

  const listmobile = data?.map((v: any) => {
    return {
      title:
        v?.type === 2
          ? t('Купон')
          : v?.type === 1
          ? t('certificate')
          : v?.type === 3
          ? t('subscription')
          : null,
      value: v?.payedCount,
      avatar:
        v?.type === 2 ? (
          <Img src={coupon} alt='coupon' />
        ) : v?.type === 1 ? (
          <Img src={gift} alt='gift' />
        ) : v?.type === 3 ? (
          <Img src={coupon1} alt='coupon1' />
        ) : null,
      body: [
        {
          title: t('bought'),
          value: v?.payedCount,
        },
        {
          title: t('active'),
          value: v?.activeCount,
        },
        {
          title: t('overdue'),
          value: v?.expireCount,
        },
        {
          title: t('used'),
          value: v?.usedCount,
        },
      ],
    };
  });

  const columns: any = useMemo(
    () => [
      {
        Header: t('type'),
        accessor: 'col1',
        Cell: (props: any) => (
          <WrapIcon>
            {props?.value === 2 ? (
              <>
                <Img src={coupon} alt='coupon' />
                {t('Купон')}
              </>
            ) : props?.value === 1 ? (
              <>
                <Img src={gift} alt='gift' />
                {t('certificate')}
              </>
            ) : props?.value === 3 ? (
              <>
                <Img src={coupon1} alt='coupon1' />
                {t('subscription')}
              </>
            ) : null}
          </WrapIcon>
        ),
      },
      {
        Header: t('bought'),
        accessor: 'col2',
      },
      {
        Header: t('active'),
        accessor: 'col3',
      },
      {
        Header: t('overdue'),
        accessor: 'col4',
      },
      {
        Header: t('used'),
        accessor: 'col5',
      },
    ],
    []
  );

  return (
    <Container>
      <DatePcker
        onChange={(e: any) => {
          setDate({
            startDate: e.slice(0, e.indexOf(' ~')),
            endDate: e.slice(e.indexOf('~ ') + 2),
          });
        }}
        margin='0 0 20px 0'
      />
      <Wrapper>
        {response.isLoading || response.isFetching ? (
          <Spinner />
        ) : width > 600 ? (
          <Table columns={columns} data={listdesktop} />
        ) : (
          <MobileTable
            data={{
              title: t('bought'),
              info: listmobile,
            }}
            headertitle={t('proposals')}
            isAvatar={true}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default Offers;
