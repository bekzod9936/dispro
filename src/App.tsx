import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route } from 'react-router-dom';
import { RenderAllRoutes } from './routes/Protection';
import Condition from 'pages/LoginPages/LoginPageModerator/Condition';
import Policy from 'pages/LoginPages/LoginPageModerator/Policy';
import useLocationPathName from 'services/hooks/useLocationPathName';
import useGetNotification from 'services/hooks/useGetNotification';
import SnackBar from 'components/Custom/NewSnack';
import { useAppSelector, useAppDispatch } from 'services/redux/hooks';
import { setNotifyOpen } from 'services/redux/Slices/firebase';

function App() {
  useGetNotification();
  useLocationPathName(window.location.pathname);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const language: string = localStorage.getItem('language') || '';
  const notifyOpen = useAppSelector((state) => state.firebaseSlice.notifyOpen);
  const info = useAppSelector((state) => state.firebaseSlice.info);

  useEffect(() => {
    if (language !== '') {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  return (
    <>
      <Switch>
        <Route exact path='/terms-and-conditions' component={Condition} />
        <Route exact path='/privacy-policy' component={Policy} />
        <RenderAllRoutes />
      </Switch>
      <SnackBar
        message={info.body}
        status='info'
        open={notifyOpen}
        autoHideDuration={5000}
        onClose={(e: any) => dispatch(setNotifyOpen(e))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </>
  );
}

export default App;
