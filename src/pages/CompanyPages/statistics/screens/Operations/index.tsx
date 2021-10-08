import { useTranslation } from 'react-i18next';
import { Container, Wrapper } from './style';
import Spinner from 'components/Custom/Spinner';
import {
  MoneyIcon,
  RatingIcon,
  CheckIcon,
  CashBackIcon,
  DiscountIcon,
  LaptopIcon,
  WrapInfo,
  WrapIcon,
  Content,
  Value,
  Title,
} from '../Clients/style';
import useOperationsHook from './useOperationsHook';

const Operations = () => {
  const { t } = useTranslation();
  const { response, data } = useOperationsHook();

  const list = [
    {
      title: t('totalSum'),
      value: data?.chequeSum,
      Icon: <LaptopIcon />,
    },
    {
      title: t('paidWithMoney'),
      value: data?.discountSum,
      Icon: <MoneyIcon />,
    },
    {
      title: t('paidWithPoint'),
      value: data?.cashbackSum,
      Icon: <RatingIcon />,
    },
    {
      title: t('chequeAvg'),
      value: data?.paidWithPoint,
      Icon: <CheckIcon />,
    },
    {
      title: t('cashbackSum'),
      value: data?.paidWithMoney,
      Icon: <CashBackIcon />,
    },
    {
      title: t('discountSum'),
      value: data?.chequeAvg,
      Icon: <DiscountIcon />,
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

export default Operations;
