import { Suspense } from 'react';
import { Container } from './style';
import { useTranslation } from 'react-i18next';
import { Switch, Route } from 'react-router-dom';
import NavBar from 'components/Custom/NavBar';
import Spinner from 'components/Custom/Spinner';
import Title from 'components/Custom/Title';
import useStatisticsRoute from './routes';
import useFcm from './useFcm';

const Statistics = () => {
  useFcm();
  const { t } = useTranslation();
  const { menuItems } = useStatisticsRoute();

  return (
    <Container>
      <Title>{t('statistics')}</Title>
      <NavBar list={menuItems} margin='10px 0' />

      <Switch>
        <Suspense fallback={<Spinner />}>
          {menuItems.map((item) => {
            return <Route exact path={item.path} component={item.component} />;
          })}
        </Suspense>
      </Switch>
    </Container>
  );
};

export default Statistics;
