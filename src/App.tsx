import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from 'react-router-dom';
import { RenderAllRoutes } from './routes/Protection';
import { useAppDispatch } from './services/redux/hooks';
import { setSocket } from './services/redux/Slices/FeedbackSlice';

import { setCurrentPage } from './services/redux/Slices/partnerSlice';
// import i18n from "./services/localization/i18n";

function App() {
  //const match = useRouteMatch();
  const { i18n } = useTranslation();
  const language: string = localStorage.getItem('language') || '';
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (language !== '') {
      console.log(language, 'lang id');
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
        {/* <Route path="/" exact component={LoginPageModerator} /> */}
        <RenderAllRoutes />
      </Switch>
    </>
  );
}

export default App;
