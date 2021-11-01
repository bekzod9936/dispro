import NavBar from 'components/Custom/NavBar';
import Title from 'components/Custom/Title';
import Input from 'components/Custom/Input';
import Spinner from 'components/Custom/Spinner';
import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useRouteMatch } from 'react-router';
import useFeedBackRoute from './routes';
import Filter from 'components/Custom/Filter/index';
import Grade from './components/Grade';
import feedDef from 'assets/images/feedback.png';
import User from './components/User';
import MultiSelect from 'components/Custom/MultiSelect';
import CheckBox from 'components/Custom/CheckBox';
import { useAppSelector } from 'services/redux/hooks';
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
  WrapIconStart,
  WrapStartT,
  WrapDefPhoto,
} from './style';

interface CProps {
  value?: any;
  label?: any;
}

const FeedBack = () => {
  const { t } = useTranslation();
  const { menuItems } = useFeedBackRoute();
  const [page, setPage] = useState(1);
  const [cashierStaffId, setCashierStaffId] = useState<CProps>();
  const [checked, setChecked] = useState(false);
  const [filterValues, setFilterValues] = useState<any>('');

  const { resClients, resCashiers } = useFeedBack({ page, filterValues });

  const cashiers = useAppSelector((state) => state.feedbackPost.cashiers);
  const clients = useAppSelector((state) => state.feedbackPost.clients);
  const rate = useAppSelector((state) => state.feedbackPost.averageRating);
  const total = useAppSelector((state) => state.feedbackPost.totalRating);
  const ratings = useAppSelector((state) => state.feedbackPost.ratings);

  const handleFilterSubmit = async () => {
    await setFilterValues(cashierStaffId?.value);
    await await resClients.refetch();
  };

  const onReset = async () => {
    await setFilterValues('');
    await setCashierStaffId({});
    await resClients.refetch();
  };

  let match = useRouteMatch();

  const cashiersFilter = cashiers
    ?.filter((v: any) => v.firstName !== '' || v.lastName !== '')
    ?.map((v: any) => {
      return {
        value: v.cashierId,
        label: `${v.firstName} ${v.lastName}`,
      };
    });

  const filterList = [
    {
      title: t('bycashier'),
      content: (
        <MultiSelect
          label={t('chose_cashier')}
          options={cashiersFilter}
          onChange={(e: any) => setCashierStaffId(e)}
          value={cashierStaffId}
          selectStyle={{ bgcolor: '#eff0fd' }}
          isLoading={resCashiers.isLoading}
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
              resClients.isLoading || resClients.isFetching ? (
                <Spinner />
              ) : clients?.length === 0 ? (
                <WrapDefPhoto>
                  <Img src={feedDef} alt='feedback' />
                  {t('feeddef')}
                </WrapDefPhoto>
              ) : (
                <Content>
                  <WrapDef>
                    {clients?.map((v: any) => (
                      <User value={v} />
                    ))}
                  </WrapDef>
                </Content>
              )
            ) : null}
          </LeftHeader>
        </WrapHeader>
        {match.url === '/feedback' ? (
          <RightSide>
            <Grade title={t('overallscore')} rate={rate} />
            <Grade title={t('totalratings')} total={total} />
            <Rate>{t('rate')}</Rate>
            {[5, 4, 3, 2, 1].map((v: any, i: number) => {
              return (
                <WrapStars>
                  <WrapIconStart>
                    {Array(v)
                      .fill(1)
                      .map(() => (
                        <StarIcon />
                      ))}
                  </WrapIconStart>
                  <WrapStartT>
                    <RateText>
                      &bull;
                      {ratings?.length === i + 1
                        ? `${ratings[i]?.percentage}%`
                        : '0%'}
                    </RateText>
                    <RateText>
                      {ratings?.length === i + 1
                        ? `${ratings[i]?.amount} `
                        : '0 '}
                    </RateText>
                    <RateText>{t('evaluations')}</RateText>
                  </WrapStartT>
                </WrapStars>
              );
            })}
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
