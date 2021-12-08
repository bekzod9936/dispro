import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "components/Custom/NavBar";
import Spinner from "components/Custom/Spinner";
import Title from "components/Custom/Title";
import { PageWrapperFlex } from "../../../styles/CustomStyles";
import useSettingsRoute from "./routes";
import { SpinnerDiv, WrapperNav, WrapperTitle } from "./styles";

const SettingsPage = () => {
  const { t } = useTranslation();
  const { menuItems } = useSettingsRoute();

  return (
    <PageWrapperFlex>
      <WrapperTitle>
        <Title>{t("settings")}</Title>
      </WrapperTitle>
      <WrapperNav>
        <NavBar list={menuItems} margin="20px 0" padding="0 10px 10px 0" />
      </WrapperNav>

      <Switch>
        <Suspense
          fallback={
            <SpinnerDiv>
              <Spinner />
            </SpinnerDiv>
          }
        >
          {menuItems.map((item) => {
            return <Route exact path={item.path} component={item.component} />;
          })}
          <Route path="*">
            <Redirect to={menuItems[0].path} />
          </Route>
        </Suspense>
      </Switch>
    </PageWrapperFlex>
  );
};

export default SettingsPage;
