import { useMemo, useState } from 'react';
import Table from '../../components/Table';
import useTrafficsHook from './useTrafficsHook';
import { useTranslation } from 'react-i18next';
import Spinner from 'components/Custom/Spinner';
import cashier from 'assets/icons/StatistisPage/cash.png';
import DatePcker from 'components/Custom/DatePicker';
import {
  Container,
  AppIcon,
  MobileIcon,
  WrapIcon,
  Img,
  Wrapper,
} from './style';

const Traffics = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState({ startDate: '', endDate: '' });

  const { response, data } = useTrafficsHook({ filterValues: date });

  const list = data?.map((v: any) => {
    return {
      col1: v?.source,
      col2: v?.clientCount,
      col3: v?.clientPayedCount,
      col4: v?.chequeCount,
      col5: v?.receipts,
    };
  });

  const columns: any = useMemo(
    () => [
      {
        Header: t('traffic_provider'),
        accessor: 'col1',
        Cell: (props: any) => (
          <WrapIcon>
            {props?.value.toLowerCase() === 'app' ? (
              <AppIcon />
            ) : props?.value.toLowerCase() === 'mobile' ? (
              <MobileIcon />
            ) : props?.value.toLowerCase() === 'cashier' ? (
              <Img src={cashier} alt='cashier' />
            ) : null}
            {props?.value}
          </WrapIcon>
        ),
      },
      {
        Header: t('clients'),
        accessor: 'col2',
      },
      {
        Header: t('uniqueChequeClient'),
        accessor: 'col3',
      },
      {
        Header: t('purchuase_amount'),
        accessor: 'col4',
      },
      {
        Header: t('revenueuzs'),
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
      <Wrapper>
        {response.isLoading || response.isFetching ? (
          <Spinner />
        ) : (
          <Table columns={columns} data={list} />
        )}
      </Wrapper>
    </Container>
  );
};

export default Traffics;
