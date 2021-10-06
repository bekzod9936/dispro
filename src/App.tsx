import { useEffect } from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import { RenderAllRoutes } from "./routes/Protection";
import FallbackOnLazyLoad from "./pages/Fallbacks/FallbackOnLazyLoad";
import { ReactQueryDevtools } from "react-query/devtools";
import { useAppDispatch } from "./services/redux/hooks";
import { setSocket } from "./services/redux/Slices/FeedbackSlice";
import { StepConnector } from "@material-ui/core";

import { setCurrentPage } from "./services/redux/Slices/partnerSlice";
import i18n from "./services/localization/i18n";

const io = require("socket.io-client");

function App() {
  //const match = useRouteMatch();
  const language: string = localStorage.getItem("language") || "";
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (language !== "") {
      console.log(language, "lang id");
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);
  useEffect(() => {
    let path = window.location.pathname
      .split("")
      .filter((item: any) => item !== "/")
      .join("");
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
