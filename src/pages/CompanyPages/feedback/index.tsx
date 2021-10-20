import NavBar from 'components/Custom/NavBar';
import Title from 'components/Custom/Title';
import Input from 'components/Custom/Input';
import Spinner from 'components/Custom/Spinner';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useRouteMatch } from 'react-router';
import useFinanceRoute from './routes';
import {
  MainWrapper,
  WrapHeader,
  LeftHeader,
  SearchIcon,
  FilterWarp,
  Wrapper,
  RightSide,
} from './style';
import Filter from 'components/Custom/Filter/index';
import Grad from './components/Grad';

const FeedBack = () => {
  const { t } = useTranslation();
  const { menuItems } = useFinanceRoute();

  const handleFilterSubmit = async () => {};

  const onReset = async () => {};

  let match = useRouteMatch();
  console.log(match);
  return (
    <MainWrapper>
      <Wrapper>
        <WrapHeader className='ssss'>
          <LeftHeader>
            <Title>{t('feedbackPage')}</Title>
            {match.url === '/feedback' ? (
              <FilterWarp>
                <Input
                  IconStart={<SearchIcon />}
                  inputStyle={{
                    border: 'none',
                    shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
                    outpadding: '0 0 0 25px',
                    inpadding: '0 20px 0 10px',
                    height: {
                      desktop: 50,
                      laptop: 45,
                      planshet: 40,
                      mobile: 40,
                    },
                  }}
                  margin={{ laptop: '0 20px 0 0' }}
                  placeholder={t('searchbyclients')}
                />
                <Filter onSubmit={handleFilterSubmit} onReset={onReset} />
              </FilterWarp>
            ) : null}
            <NavBar list={menuItems} margin='10px 0' />
          </LeftHeader>
        </WrapHeader>
        {match.url === '/feedback' ? (
          <RightSide>
            <Grad />
          </RightSide>
        ) : null}
      </Wrapper>
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

export default FeedBack;
