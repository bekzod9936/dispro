import { Suspense } from 'react';
import { Container, WrapNav } from './style';
import { useTranslation } from 'react-i18next';
import { Switch, Route } from 'react-router-dom';
import NavBar from 'components/Custom/NavBar';
import Spinner from 'components/Custom/Spinner';
import Title from 'components/Custom/Title';
import useStatisticsRoute from './routes';
import useFcm from './useFcm';
import Grid from 'components/Custom/Grid';

const Statistics = () => {
  useFcm();
  const { t } = useTranslation();
  const { menuItems } = useStatisticsRoute();

  return (
    <Container>
      <Title padding={{ planshet: '0' }}>{t('statistics')}</Title>
      <WrapNav>
        <Grid style={{ width: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
          <NavBar list={menuItems} margin='0' padding='0' />
        </Grid>
      </WrapNav>
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
