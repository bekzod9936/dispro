import { useMemo } from 'react';
import { Container, Img, WrapIcon } from './style';
import useOffersHook from './useOffersHook';
import { useTranslation } from 'react-i18next';
import Spinner from 'components/Custom/Spinner';
import Table from '../../components/Table';
import coupon from 'assets/icons/StatistisPage/coupon.png';
import coupon1 from 'assets/icons/StatistisPage/coupon1.png';
import gift from 'assets/icons/StatistisPage/gift.png';

const Offers = () => {
  const { t } = useTranslation();
  const { response, data } = useOffersHook();

  const list = useMemo(
    () => [
      {
        col1: 'Купон',
        col2: 15,
        col3: 10,
        col4: 35,
        col5: 430,
      },
      {
        col1: 'Сертификат',
        col2: 11,
        col3: 5,
        col4: 20,
        col5: 2750,
      },
      {
        col1: 'Подписка',
        col2: 5,
        col3: 3,
        col4: 15,
        col5: 112500,
      },
    ],
    []
  );

  const columns: any = useMemo(
    () => [
      {
        Header: t('type'),
        accessor: 'col1',
        Cell: (props: any) => (
          <WrapIcon>
            {props?.value === 'Купон' ? (
              <Img src={coupon} alt='coupon' />
            ) : props?.value === 'Сертификат' ? (
              <Img src={coupon1} alt='coupon1' />
            ) : props?.value === 'Подписка' ? (
              <Img src={gift} alt='gift' />
            ) : null}
            {props?.value}
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
      {response.isLoading || response.isFetching ? (
        <Spinner />
      ) : (
        <Table columns={columns} data={list} />
      )}
    </Container>
  );
};

export default Offers;
