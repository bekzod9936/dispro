import { useMemo, useEffect } from 'react';
import Table from '../../components/Table';
import useTrafficsHook from './useTrafficsHook';
import { useTranslation } from 'react-i18next';
import Spinner from 'components/Custom/Spinner';
import cashier from 'assets/icons/StatistisPage/cash.png';
import DatePcker from 'components/Custom/DatePicker';
import { numberWithNew } from 'services/utils';
import { useAppSelector } from 'services/redux/hooks';
import MobileTable from '../../components/MobileTable';
import useWindowWidth from 'services/hooks/useWindowWidth';
import notfoundsearch from 'assets/images/notfoundsearch.png';
import {
  Container,
  AppIcon,
  MobileIcon,
  WrapIcon,
  Img,
  Wrapper,
} from './style';
import { DefDiv, ImgDef, WrapDef } from '../../style';

const Traffics = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const data = useAppSelector((state) => state.statistics.traffics);
  const { response, setDate, date } = useTrafficsHook();

  useEffect(() => {
    response.refetch();
  }, [date]);

  const listdesktop = data?.map((v: any) => {
    return {
      col1: v?.source,
      col2: numberWithNew({ number: v?.clientCount }),
      col3: numberWithNew({ number: v?.clientPayedCount }),
      col4: numberWithNew({ number: v?.chequeCount }),
      col5: numberWithNew({ number: v?.receipts }),
    };
  });

  const listmobile = data?.map((v: any) => {
    return {
      title: v?.source,
      value: numberWithNew({ number: v?.receipts }),
      avatar:
        v?.source.toLowerCase() === 'app' ? (
          <AppIcon />
        ) : v?.source.toLowerCase() === 'mobile' ? (
          <MobileIcon />
        ) : v?.source.toLowerCase() === 'cashier' ? (
          <Img src={cashier} alt='cashier' />
        ) : (
          <AppIcon />
        ),
      body: [
        {
          title: t('clients'),
          value: numberWithNew({ number: v?.clientCount }),
        },
        {
          title: t('uniqueChequeClient'),
          value: numberWithNew({ number: v?.clientPayedCount }),
        },
        {
          title: t('purchuase_amount'),
          value: numberWithNew({ number: v?.chequeCount }),
        },
        {
          title: t('revenueuzs'),
          value: numberWithNew({ number: v?.receipts }),
        },
      ],
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
            ) : (
              <AppIcon />
            )}
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
        onChange={(e: any) => {
          setDate({
            startDate: e.slice(0, e.indexOf(' ~')),
            endDate: e.slice(e.indexOf('~ ') + 2),
          });
        }}
        margin='0 0 10px 0'
        maxDate={new Date()}
      />
      <Wrapper>
        {response.isLoading || response.isFetching ? (
          <Spinner />
        ) : data?.length !== 0 ? (
          width > 600 ? (
            <Table columns={columns} data={listdesktop} />
          ) : (
            <MobileTable
              data={{
                title: t('revenue'),
                info: listmobile,
              }}
              headertitle={t('traffic_providers')}
              isAvatar={true}
            />
          )
        ) : (
          <WrapDef>
            <ImgDef src={notfoundsearch} alt='defimage' />
            <DefDiv>{t('notfoundsearch')}</DefDiv>
          </WrapDef>
        )}
      </Wrapper>
    </Container>
  );
};

export default Traffics;
