import NavBar from 'components/Custom/NavBar';
import Title from 'components/Custom/Title';
import Spinner from 'components/Custom/Spinner';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useRouteMatch } from 'react-router';
import useNewsRoute from './routes';
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


const Finance = () => {
  const { t } = useTranslation();
  const { menuItems } = useNewsRoute();
  
  let match = useRouteMatch();
  return (
    <MainWrapper>
      <WrapHeader>
        <LeftHeader>
          <Title>{t('News')}</Title>
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
