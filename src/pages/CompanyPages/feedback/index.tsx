import NavBar from 'components/Custom/NavBar';
import Title from 'components/Custom/Title';
import Input from 'components/Custom/Input';
import Spinner from 'components/Custom/Spinner';
import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useRouteMatch } from 'react-router';
import useFeedBackRoute from './routes';
import Filter from 'components/Custom/Filter/index';
import feedDef from 'assets/images/feedback.png';
import User from './components/User';
import MultiSelect from 'components/Custom/MultiSelect';
import CheckBox from 'components/Custom/CheckBox';
import { useAppSelector } from 'services/redux/hooks';
import useFeedBack from './hooks/useFeedBack';
import Pagination from 'components/Custom/Pagination';
import { countPagination } from 'services/utils';
import {
  MainWrapper,
  WrapHeader,
  LeftHeader,
  SearchIcon,
  FilterWarp,
  Wrapper,
  StarIcon,
  Content,
  Img,
  WrapDef,
  WrapChecks,
  WrapCheck,
  Label,
  WrapDefPhoto,
  NoResult,
  Info,
  WrapPag,
} from './style';
import Stars from './components/Stars';
import { formatPagination } from './utils';

interface CProps {
  value?: any;
  label?: any;
}

interface intialFilterProps {
  page?: number;
  cashierStaffId?: number | string;
  perPage?: number;
}

const FeedBack = () => {
  const intialFilter = {
    page: 1,
    cashierStaffId: '',
    perPage: 6,
  };
  const { t } = useTranslation();
  const { menuItems } = useFeedBackRoute();
  const [cashierStaffId, setCashierStaffId] = useState<CProps>();
  const [checked, setChecked] = useState(false);
  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);
  const [inpuSearch, setInpuSearch] = useState<string>('');
  const [searchRes, setSearchRes] = useState<any[]>([]);
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const { resClients, resCashiers, between, totalCount } = useFeedBack({
    filterValues,
  });

  const cashiers = useAppSelector((state) => state.feedbackPost.cashiers);
  const clients: any = useAppSelector((state) => state.feedbackPost.clients);

  const handleFilterSubmit = async () => {
    await setFilterValues(cashierStaffId?.value);
    await await resClients.refetch();
  };

  const onReset = async () => {
    await setFilterValues({ ...filterValues, cashierStaffId: '' });
    await setCashierStaffId({});
    await resClients.refetch();
  };

  const handleSearch = (e: any) => {
    setInpuSearch(e.target.value);

    const searchResult: any = clients.filter((v: any) => {
      return (
        v.clientFirstName
          .toLowerCase()
          .includes(e.target.value?.toLowerCase()) ||
        v.clientLastName.toLowerCase().includes(e.target.value?.toLowerCase())
      );
    });

    setSearchRes(searchResult);
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

  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await resClients.refetch();
  };

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
      <Wrapper isPosts={match.url === '/feedback/reviews' ? false : true}>
        <WrapHeader>
          <LeftHeader>
            <Title>{t('feedbackPage')}</Title>
            <div style={{ display: 'flex' }}>
              <NavBar list={menuItems} margin='10px 0 0' />
            </div>
            {match.url === '/feedback/reviews' ? (
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
                  type='search'
                  onChange={handleSearch}
                  width={{ maxwidth: 280 }}
                  margin={{ laptop: '0 20px 0 0' }}
                  placeholder={t('searchbyclients')}
                  onFocus={() => setSearchFocus(true)}
                  onBlur={() =>
                    inpuSearch === '' ? setSearchFocus(false) : null
                  }
                  value={inpuSearch}
                />
                <Filter
                  list={filterList}
                  onSubmit={handleFilterSubmit}
                  onReset={onReset}
                />
              </FilterWarp>
            ) : null}
            {match.url === '/feedback/reviews' ? (
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
                    {!searchFocus || inpuSearch === '' ? (
                      clients?.map((v: any) => <User value={v} />)
                    ) : searchRes?.length === 0 ? (
                      <NoResult>{t('noresult')}</NoResult>
                    ) : (
                      searchRes?.map((v: any) => <User value={v} />)
                    )}
                  </WrapDef>
                  {clients.length > 0 ? (
                    <WrapPag>
                      <Info>
                        {t('shown')}
                        <span>{between}</span>
                        {t('from1')} <span>{totalCount}</span>
                        {formatPagination({
                          count: totalCount,
                          firstWord: t('review1'),
                          secondWord: t('review23'),
                        })}
                      </Info>
                      <Pagination
                        page={filterValues.page}
                        count={totalCount / intialFilter.perPage}
                        onChange={handlechangePage}
                        disabled={resClients.isLoading || resClients.isFetching}
                      />
                    </WrapPag>
                  ) : null}
                </Content>
              )
            ) : null}
          </LeftHeader>
        </WrapHeader>
        {match.url === '/feedback/reviews' ? <Stars /> : null}
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
