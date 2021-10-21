import NavBar from 'components/Custom/NavBar';
import Title from 'components/Custom/Title';
import Input from 'components/Custom/Input';
import Spinner from 'components/Custom/Spinner';
import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useRouteMatch } from 'react-router';
import useFinanceRoute from './routes';
import Filter from 'components/Custom/Filter/index';
import Grade from './components/Grade';
import feedDef from 'assets/images/feedback.png';
import {
  MainWrapper,
  WrapHeader,
  LeftHeader,
  SearchIcon,
  FilterWarp,
  Wrapper,
  RightSide,
  Rate,
  RateText,
  StarIcon,
  WrapStars,
  Content,
  Img,
  WrapDef,
} from './style';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import User from './components/User';

const FeedBack = () => {
  const { t } = useTranslation();
  const { menuItems } = useFinanceRoute();

  const handleFilterSubmit = async () => {};

  const onReset = async () => {};

  let match = useRouteMatch();
  const [state, setState] = useState('');
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
                  width={{ maxwidth: 280 }}
                  margin={{ laptop: '0 20px 0 0' }}
                  placeholder={t('searchbyclients')}
                />
                <Filter onSubmit={handleFilterSubmit} onReset={onReset} />
              </FilterWarp>
            ) : null}
            <NavBar list={menuItems} margin='10px 0' />
            {match.url === '/feedback' ? (
              <Content>
                <WrapDef>
                  {/* <Img src={feedDef} alt='feedback' />
                  {t('feeddef')} */}
                  <AnimateSharedLayout type='crossfade'>
                    <motion.div layoutId='1' onClick={() => setState('1')}>
                      <User />
                    </motion.div>
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <AnimatePresence>
                      {state === '1' ? (
                        <motion.div layoutId='1'>
                          <User />
                        </motion.div>
                      ) : null}
                      <User />
                      <User />
                      <User />
                      <User />
                      <User />
                    </AnimatePresence>
                  </AnimateSharedLayout>
                </WrapDef>
              </Content>
            ) : null}
          </LeftHeader>
        </WrapHeader>

        {match.url === '/feedback' ? (
          <RightSide>
            <Grade title={t('overallscore')} />
            <Grade title={t('totalratings')} />
            <Rate>{t('rate')}</Rate>
            <WrapStars>
              {[1, 2, 3, 4, 5].map(() => (
                <StarIcon />
              ))}
              <div>
                <RateText>&bull; 0% </RateText>
                <RateText>0 оценок</RateText>
              </div>
            </WrapStars>
            <WrapStars>
              {[1, 2, 3, 4].map(() => (
                <StarIcon />
              ))}
              <div>
                <RateText>&bull; 0% </RateText>
                <RateText>0 оценок</RateText>
              </div>
            </WrapStars>
            <WrapStars>
              {[1, 2, 3].map(() => (
                <StarIcon />
              ))}
              <div>
                <RateText>&bull; 0% </RateText>
                <RateText>0 оценок</RateText>
              </div>
            </WrapStars>
            <WrapStars>
              {[1, 2].map(() => (
                <StarIcon />
              ))}
              <div>
                <RateText>&bull; 0% </RateText>
                <RateText>0 оценок</RateText>
              </div>
            </WrapStars>
            <WrapStars>
              <StarIcon />
              <div>
                <RateText>&bull; 0% </RateText>
                <RateText>0 оценок</RateText>
              </div>
            </WrapStars>
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
