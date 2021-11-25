import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useQueryErrorResetBoundary } from "react-query";
import { useTranslation } from "react-i18next";

// import { ErrorBoundary } from 'react-error-boundary';

//actions
import { setNotifyOpen } from "services/redux/Slices/firebase";
//components
import SnackBar from "components/Custom/NewSnack";
//screens
import Condition from "pages/LoginPages/LoginPageModerator/Condition";
import Policy from "pages/LoginPages/LoginPageModerator/Policy";
//routes
import { RenderAllRoutes } from "./routes/Protection";
//hooks
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import useLocationPathName from "services/hooks/useLocationPathName";
import useGetNotification from "services/hooks/useGetNotification";
import usePermimssions from "services/hooks/usePermimssions";

function App() {
  usePermimssions();
  useGetNotification();
  useLocationPathName(window.location.pathname);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const language: string = localStorage.getItem("language") || "";
  const notifyOpen = useAppSelector((state) => state.firebaseSlice.notifyOpen);
  const info = useAppSelector((state) => state.firebaseSlice.info);
  const { reset } = useQueryErrorResetBoundary();

  useEffect(() => {
    if (language !== "") {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  return (
    <>
      <Switch>
        <Route exact path="/terms-and-conditions" component={Condition} />
        <Route exact path="/privacy-policy" component={Policy} />
        <RenderAllRoutes />
      </Switch>
      <SnackBar
        message={info.body}
        status="info"
        open={notifyOpen}
        autoHideDuration={5000}
        onClose={(e: any) => dispatch(setNotifyOpen(e))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </>
  );
}

export default App;
