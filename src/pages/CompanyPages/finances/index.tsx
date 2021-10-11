import NavBar from 'components/Custom/NavBar';
import Title from 'components/Custom/Title';
import Spinner from 'components/Custom/Spinner';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router';
import useFinanceRoute from './routes';
import { MainWrapper } from './style';

const Finance = () => {
  const { t } = useTranslation();
  const { menuItems } = useFinanceRoute();

  return (
    <MainWrapper>
      <Title>{t('statistics')}</Title>
      <NavBar list={menuItems} margin='10px 0' />

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
