import { Suspense, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavBar from "components/Custom/NavBar";
import { Title } from "components/Layout/Header/style";
import useStaffRoute from "./routes";
import { MainWrapper, Flex, SpinnerDiv } from "./style";
import Spinner from "components/Helpers/Spinner";
import Header from "./components/Header";
import CreateCashier from "./screens/CashierScreen/components/CreateCashier";
import { useAppSelector } from "services/redux/hooks";

const StaffPage = () => {
  const { t } = useTranslation();
  const { menuItems } = useStaffRoute();
  const openCash = useAppSelector((state) => state.staffs.openCash);

  const [closeFun, setCloseFun] = useState<any>();
  const handleClose = (e: any) => {
    setCloseFun(e);
  };

  const handleOpen = () => {};

  return (
    <MainWrapper id="drawer-container">
      <Title>{t("staff")}</Title>

      <Flex width="90%" height="85px" alignItems="flex-start" margin="0">
        <NavBar list={menuItems} margin="20px 0" padding="0 10px 10px 0" />
      </Flex>

      <Header
        closeFun={closeFun}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
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

      {/* create new cashier  */}
      <CreateCashier openCash={openCash} />
    </MainWrapper>
  );
};

export default StaffPage;
