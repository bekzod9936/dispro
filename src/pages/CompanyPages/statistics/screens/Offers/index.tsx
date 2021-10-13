import { useMemo, useState } from 'react';
import { Container, Img, WrapIcon } from './style';
import useOffersHook from './useOffersHook';
import { useTranslation } from 'react-i18next';
import Spinner from 'components/Custom/Spinner';
import Table from '../../components/Table';
import coupon from 'assets/icons/StatistisPage/coupon.png';
import coupon1 from 'assets/icons/StatistisPage/coupon1.png';
import gift from 'assets/icons/StatistisPage/gift.png';
import DatePcker from 'components/Custom/DatePicker';

const Offers = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState({ startDate: '', endDate: '' });
  const { response, data } = useOffersHook({ filterValues: date });

  const list = data?.map((v: any) => {
    return {
      col1: v?.type,
      col2: v?.payedCount,
      col3: v?.activeCount,
      col4: v?.expireCount,
      col5: v?.usedCount,
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
        onChange={async (e: any) => {
          await setDate({
            startDate: e.slice(0, e.indexOf(' ~')),
            endDate: e.slice(e.indexOf('~ ') + 2),
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
    </Container>
  );
};

export default Offers;
