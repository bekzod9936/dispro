import NavBar from 'components/Custom/NavBar';
import Title from 'components/Custom/Title';
import Spinner from 'components/Custom/Spinner';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import useNewsRoute from './routes';
import Header from './components/Header'
import { setQuery } from 'services/redux/Slices/staffs';
import {
  MainWrapper,
  Flex,
  WrapHeader,
  LeftHeader,

} from './style';


const News = () => {
  const { t } = useTranslation();
  const { menuItems } = useNewsRoute();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useHistory();
  const handleOpenSetting = () => {
    history.push({
      pathname: '/staff/setting',
      state: { prevPage: location.pathname },
    });
    dispatch(setQuery(''));
  };
  return (
    <MainWrapper>
      <WrapHeader>
        <LeftHeader>
            <>
          <Title>{t('News')}</Title>
          <Flex width='100%' height='85px' alignItems='flex-start' margin='0'>
            <NavBar list={menuItems} margin='20px 0' padding='0 10px 10px 0' />
          </Flex>
        </>
        </LeftHeader>
      </WrapHeader>

      <Header
            handleOpenSetting={handleOpenSetting}
          />
       
    
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

export default News;
