
import NavBar from 'components/Custom/NavBar';
import Title from 'components/Custom/Title';
import Spinner from 'components/Custom/Spinner';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {setQuery,setSelectedNews} from 'services/redux/Slices/news';
import useNewsRoute from './routes';
import Header from './components/Header'

import {
  MainWrapper,
  Flex,
  WrapHeader,
  LeftHeader,
  Wrap,
} from './style';



const News = () => {
  const { t } = useTranslation();
  const { menuItems ,newsPath} = useNewsRoute();
  const dispatch=useAppDispatch()
  const location = useLocation();
  const history = useHistory();
  const handleOpenNews = () => {
    history.push({
      pathname: '/news/create',
      state: { prevPage: location.pathname },
    })
    dispatch(setQuery(''));
  };

  
  return (
    <MainWrapper id='drawer-container'>
         {location.pathname !== '/news/create' && location.pathname !== '/news/detail' &&location.pathname !== '/news/repair' &&location.pathname !== '/news/showwaiting' &&location.pathname !== '/news/edit' &&
    <div>
      <WrapHeader>
        <LeftHeader>
            <>
          <Title>{t('News')}</Title>
          <Flex width='100%' height='85px' alignItems='flex-start' margin='0'>
            <NavBar list={newsPath} margin='20px 0' padding='0 10px 10px 0' />
          </Flex>
        </>
        </LeftHeader>
      </WrapHeader>

      <Header
            handleOpenNews={handleOpenNews}

          />
        </div>}

      <Switch>

        <Suspense fallback={<Spinner  />}>
          
                {" "}
          {menuItems.map((item) => {
            return <Route exact path={item.path} component={item.component} />;
          })}
    
        </Suspense>
      
      </Switch>
      
    </MainWrapper>
  );
};

export default News;
