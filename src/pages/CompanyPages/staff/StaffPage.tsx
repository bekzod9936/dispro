import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavBar from "components/Custom/NavBar";
import { Title } from "components/Layout/Header/style";
import useStaffRoute from "./routes";
import { MainWrapper, Flex, SpinnerDiv } from "./style";
import Spinner from "components/Helpers/Spinner";
import { AddIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import Button from "components/Custom/Button";

const StaffPage = () => {
  const { t } = useTranslation();
  const { menuItems } = useStaffRoute();

  const handleOpen = () => {};

  return (
    <MainWrapper>
      <Title>{t("staff")}</Title>

      <Flex width="90%" alignItems="center" margin="0px">
        <NavBar list={menuItems} margin="20px 0" padding="0 10px 10px 0" />
      </Flex>

      <Button
        onClick={handleOpen}
        buttonStyle={{
          bgcolor: "#FFFFFF",
          color: "#223367",
          weight: 500,
          height: { desktop: 60 },
        }}
        margin={{
          desktop: "0 25px 0 0",
          laptop: "0 25px 0 0",
          planshet: "0 0 20px 0",
        }}
        startIcon={<AddIcon />}
      >
        {t("create")}
      </Button>

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
    </MainWrapper>
  );
};

export default StaffPage;
