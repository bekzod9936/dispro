import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route } from 'react-router-dom';
import { RenderAllRoutes } from './routes/Protection';
import { useAppDispatch } from './services/redux/hooks';
import Condition from 'pages/LoginPages/LoginPageModerator/Condition';
import Policy from 'pages/LoginPages/LoginPageModerator/Policy';
import { setCurrentPage } from './services/redux/Slices/partnerSlice';

function App() {
  const { i18n } = useTranslation();
  const language: string = localStorage.getItem('language') || '';
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (language !== '') {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  useEffect(() => {
    let path = window.location.pathname
      .split('')
      .filter((item: any) => item !== '/')
      .join('');
    dispatch(setCurrentPage(path));
  }, []);

  return (
    <>
      <Switch>
        <Route exact path='/terms-and-conditions' component={Condition} />
        <Route exact path='/privacy-policy' component={Policy} />
        <RenderAllRoutes />
      </Switch>
    </>
  );
}

export default App;
