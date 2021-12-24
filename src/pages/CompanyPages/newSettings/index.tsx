import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from 'components/Custom/NavBar';
import Spinner from 'components/Custom/Spinner';
import Title from 'components/Custom/Title';
import useSettingsRoutes from './routes';
import {PageWrapperFlex, SpinnerDiv, WrapperNav, WrapperTitle } from './styles';

const Settings = () => {
    const { t } = useTranslation();
    const { menuItems } = useSettingsRoutes();
  
    return (
      <PageWrapperFlex>
        <WrapperTitle>
          <Title>{t('Настройки компании ')}</Title>
        </WrapperTitle>
        <WrapperNav>
          <NavBar list={menuItems} margin='20px 0 0' padding='0 10px 0 0' />
        </WrapperNav>
        <Switch>
          <Suspense
            fallback={
              <SpinnerDiv>
                <Spinner />
              </SpinnerDiv>
            }
          >
            {menuItems.map((item, i) => {
              return (
                <>
                  <Route exact path={item.path} component={item.component} />
                </>
              );
            })}
            <Route path='*' exact={true}>
              <Redirect to={menuItems[0].path} />
            </Route>
          </Suspense>
        </Switch>
      </PageWrapperFlex>
    );
  };
  
  export default Settings;
  