import NavBar from 'components/Custom/NavBar';
import Title from 'components/Custom/Title';
import Spinner from 'components/Custom/Spinner';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useRouteMatch } from 'react-router';
import useFeedBackRoute from './routes';
import Stars from './components/Stars';
import { MainWrapper, Wrapper, WrapReview } from './style';

const FeedBack = () => {
  const { t } = useTranslation();
  const { menuItems } = useFeedBackRoute();

  let match = useRouteMatch();

  return (
    <MainWrapper reviews={match.url === '/feedback/reviews'}>
      {match.url === '/feedback/reviews' ? (
        <div className='review'>
          <Wrapper reviews={match.url === '/feedback/reviews'}>
            <Title>{t('feedbackPage')}</Title>
            <NavBar list={menuItems} margin='10px 0 0' />

            <Switch>
              <Suspense fallback={<Spinner height='100%' />}>
                {menuItems.map((item) => {
                  return (
                    <Route exact path={item.path} component={item.component} />
                  );
                })}
              </Suspense>
            </Switch>
          </Wrapper>
          {match.url === '/feedback/reviews' ? <Stars /> : null}
        </div>
      ) : (
        <>
          <WrapReview>
            <Title>{t('feedbackPage')}</Title>
            <NavBar list={menuItems} margin='10px 0 0' />
          </WrapReview>

          <Switch>
            <Suspense fallback={<Spinner height='100%' />}>
              {menuItems.map((item) => {
                return (
                  <Route exact path={item.path} component={item.component} />
                );
              })}
            </Suspense>
          </Switch>
        </>
      )}
    </MainWrapper>
  );
};

export default FeedBack;
