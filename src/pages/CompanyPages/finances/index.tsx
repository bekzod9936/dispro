import NavBar from 'components/Custom/NavBar';
import Title from 'components/Custom/Title';
import Spinner from 'components/Custom/Spinner';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useRouteMatch } from 'react-router';
import useFinanceRoute from './routes';
import {
  MainWrapper,
  WrapTotalSum,
  TotalSum,
  Label,
  WrapTotal,
  WrapHeader,
  LeftHeader,
  RightHeader,
} from './style';
import usePayment from './screens/Payment/usePayment';

const Finance = () => {
  const { t } = useTranslation();
  const { menuItems } = useFinanceRoute();
  const { header } = usePayment({ filterValues: '' });
  let match = useRouteMatch();
  console.log(match);
  return (
    <MainWrapper>
      <WrapHeader>
        <LeftHeader>
          <Title>{t('finances')}</Title>
          <NavBar list={menuItems} margin='10px 0' />
        </LeftHeader>
      </WrapHeader>
      <Switch>
        <Suspense fallback={<Spinner />}>
          {menuItems.map((item) => {
            return <Route exact path={item.path} component={item.component} />;
          })}
        </Suspense>
      </Switch>
    </MainWrapper>
  );
};

export default Finance;
