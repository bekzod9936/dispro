import Spinner from 'components/Custom/Spinner';
import { useTranslation } from 'react-i18next';
import {
  Container,
  AgeIcon,
  CartIcon,
  CashBackIcon,
  CheckIcon,
  CouponIcon,
  DiscountIcon,
  ManIcon,
  WomanIcon,
  MoneyIcon,
  QuistionIcon,
  RatingIcon,
  ScoreIcon,
  SertificateIcon,
  UsersIcon,
  CalendarIcon,
  Title,
  Value,
  Content,
  WrapInfo,
  Wrapper,
  WrapIcon,
} from './style';
import useClientsHook from './useClientsHook';

const Clients = () => {
  const { t } = useTranslation();
  const { response, data } = useClientsHook();

  const list = [
    {
      title: t('totalClients'),
      value: data?.clientCount,
      Icon: <UsersIcon />,
    },
    {
      title: t('maleCount'),
      value: data?.maleCount,
      Icon: <ManIcon />,
    },
    {
      title: t('femaleCount'),
      value: data?.femaleCount,
      Icon: <WomanIcon />,
    },
    {
      title: t('ageAvg'),
      value: data?.ageAvg,
      Icon: <AgeIcon />,
    },
    {
      title: t('uniqueChequeClient'),
      value: data?.uniqueChequeClient,
      Icon: <CalendarIcon />,
    },
    {
      title: t('chequeCount'),
      value: data?.chequeCount,
      Icon: <CartIcon />,
    },
    {
      title: t('paidWithMoney'),
      value: data?.paidWithMoney,
      Icon: <MoneyIcon />,
    },
    {
      title: t('paidWithPoint'),
      value: data?.paidWithPoint,
      Icon: <RatingIcon />,
    },
    {
      title: t('pointSum'),
      value: data?.pointSum,
      Icon: <ScoreIcon />,
    },
    {
      title: t('chequeAvg'),
      value: data?.chequeAvg,
      Icon: <CheckIcon />,
    },
    {
      title: t('cashbackSum'),
      value: data?.cashbackSum,
      Icon: <CashBackIcon />,
    },
    {
      title: t('discountSum'),
      value: data?.discountSum,
      Icon: <DiscountIcon />,
    },
    {
      title: t('couponAmountSum'),
      value: data?.couponAmountSum,
      Icon: <QuistionIcon />,
    },
    {
      title: t('couponDiscountSum'),
      value: data?.couponDiscountSum,
      Icon: <CouponIcon />,
    },
  ];

  return (
    <Container>
      {response.isLoading ? (
        <Spinner />
      ) : (
        <Wrapper>
          {list.map((v: any) => (
            <WrapInfo key={v.title}>
              <WrapIcon>{v.Icon}</WrapIcon>

              <Content>
                <Title>{v.title}</Title>
                <Value>{v.value}</Value>
              </Content>
            </WrapInfo>
          ))}
        </Wrapper>
      )}
    </Container>
  );
};

export default Clients;
