import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Switch, Route } from "react-router-dom";
import NavBar from "src/components/Custom/NavBar";
import Spinner from "src/components/Custom/Spinner";
import Title from "src/components/Custom/Title";
import { Flex } from "../../../styles/BuildingBlocks";
import { PageWrapperFlex } from "../../../styles/CustomStyles";
import useSettingsRoute from "./routes";
import { SpinnerDiv } from "./styles";

const SettingsPage = () => {
  const { t } = useTranslation();
  const { menuItems } = useSettingsRoute();

  return (
    <PageWrapperFlex>
      <Title>{t("settings")}</Title>
      <Flex width="80%" alignItems="center" margin="0px">
        <NavBar list={menuItems} margin="20px 0" padding="0 10px 10px 0" />
      </Flex>

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
        </Suspense>
      </Switch>
    </PageWrapperFlex>
  );
};

export default SettingsPage;
