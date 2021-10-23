import NavBar from 'components/Custom/NavBar';
import Title from 'components/Custom/Title';
import Input from 'components/Custom/Input';
import Spinner from 'components/Custom/Spinner';
import React, { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useRouteMatch } from 'react-router';
import useFeedBackRoute from './routes';
import Filter from 'components/Custom/Filter/index';
import Grade from './components/Grade';
import feedDef from 'assets/images/feedback.png';
import User from './components/User';
import MultiSelect from 'components/Custom/MultiSelect';
import CheckBox from 'components/Custom/CheckBox';
import useFeedBack from './hooks/useFeedBack';
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
  WrapChecks,
  WrapCheck,
  Label,
} from './style';
import { useAppSelector } from 'services/redux/hooks';

const FeedBack = () => {
  const { t } = useTranslation();
  const { menuItems } = useFeedBackRoute();
  const [page, setPage] = useState(1);

  const { resClients, resCashiers, resRatings } = useFeedBack({ page });
  const cashiers = useAppSelector((state) => state.feedbackPost.cashiers);

  const handleFilterSubmit = async () => {};

  const onReset = async () => {};

  let match = useRouteMatch();
  const [cashierStaffId, setCashierStaffId] = useState('');
  const [checked, setChecked] = useState(false);
  const filterList = [
    {
      title: t('bycashier'),
      content: (
        <MultiSelect
          label={t('chose_cashier')}
          options={[]}
          onChange={(e: any) => setCashierStaffId(e)}
          value={cashierStaffId}
          selectStyle={{ bgcolor: '#eff0fd' }}
        />
      ),
    },
    {
      title: t('byRating'),
      content: (
        <WrapCheck>
          <Label>{t('chose_status')}</Label>
          <WrapChecks>
            {[1, 2, 3, 4, 5]?.map((v: any) => (
              <CheckBox
                checkedIcon={<StarIcon checked={checked} margin='0 10px' />}
                icon={<StarIcon checked={checked} margin='0 10px' />}
                key={v}
                checked={checked}
                name={v}
                onChange={(e: any) => setChecked(e)}
              />
            ))}
          </WrapChecks>
        </WrapCheck>
      ),
    },
  ];

  return (
    <MainWrapper>
      <Wrapper>
        <WrapHeader>
          <LeftHeader>
            <Title>{t('feedbackPage')}</Title>
            <div style={{ display: 'flex' }}>
              <NavBar list={menuItems} margin='10px 0 0' />
            </div>
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
                <Filter
                  list={filterList}
                  onSubmit={handleFilterSubmit}
                  onReset={onReset}
                />
              </FilterWarp>
            ) : null}
            {match.url === '/feedback' ? (
              <Content>
                <WrapDef>
                  {/* <Img src={feedDef} alt='feedback' />
                  {t('feeddef')} */}
                  <User />
                  <User />
                  <User />
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
