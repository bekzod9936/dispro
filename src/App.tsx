import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Switch, Route } from "react-router-dom";
import firebase from "./firebase/firebase";
import { RenderAllRoutes } from "./routes/Protection";
import Condition from "pages/LoginPages/LoginPageModerator/Condition";
import Policy from "pages/LoginPages/LoginPageModerator/Policy";
import useLocationPathName from "services/hooks/useLocationPathName";
import useFirebase from "services/hooks/useFirebase";

function App() {
  const { i18n } = useTranslation();
  const language: string = localStorage.getItem("language") || "";
  const pathName = useLocationPathName(window.location.pathname);
  const { messagingToken } = useFirebase();

  console.log(messagingToken, "token 1111");

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
    </>
  );
}

export default App;
