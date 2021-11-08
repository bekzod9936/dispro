import NavBar from 'components/Custom/NavBar';
import Title from 'components/Custom/Title';
import Spinner from 'components/Custom/Spinner';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import useNewsRoute from './routes';
import Header from './components/Header'

import {
  MainWrapper,
  Flex,
  WrapHeader,
  LeftHeader,

} from './style';


const News = () => {
  const { t } = useTranslation();
  const { menuItems ,newsPath} = useNewsRoute();

  const location = useLocation();
  const history = useHistory();
  const handleOpenSetting = () => {
    history.push({
      pathname: '/news/create',
      state: { prevPage: location.pathname },
    });
  
  };
  return (
    <MainWrapper id='drawer-container'>
      
         {location.pathname !== '/news/create' &&
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
            handleOpenSetting={handleOpenSetting}
          />
        </div>}
    
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
