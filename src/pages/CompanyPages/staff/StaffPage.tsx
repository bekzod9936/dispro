import { Suspense, useState } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavBar from "components/Custom/NavBar";
import { Title } from "components/Layout/Header/style";
import useStaffRoute from "./routes";
import { MainWrapper, Flex, SpinnerDiv } from "./style";
import Spinner from "components/Helpers/Spinner";
import Header from "./components/Header";
import CreateCashier from "./screens/CashierScreen/components/CreateCashier";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { setQuery } from "services/redux/Slices/staffs";
import CreateManager from "./screens/ManagerScreen/components/CreateManager";

const StaffPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();
  const { menuItems } = useStaffRoute();
  const openCash = useAppSelector((state) => state.staffs.openCash);

  const [openManager, setOpenManager] = useState(false);

  const [closeFun, setCloseFun] = useState<any>();
  const handleClose = (e: any) => {
    setCloseFun(e);
  };

  const handleOpen = () => {};

  const handleOpenSetting = () => {
    history.push({
      pathname: "/staff/setting",
      state: { prevPage: location.pathname },
    });
    dispatch(setQuery(""));
  };

  console.log(location.pathname, "pathName");

  return (
    <MainWrapper id="drawer-container">
      {location.pathname !== "/staff/setting" ? (
        <>
          <Title>{t("staff")}</Title>

          <Flex width="90%" height="85px" alignItems="flex-start" margin="0">
            <NavBar
              list={menuItems.filter((item) => item.path !== "/staff/setting")}
              margin="20px 0"
              padding="0 10px 10px 0"
            />
          </Flex>

          <Header
            closeFun={closeFun}
            handleOpen={handleOpen}
            handleOpenSetting={handleOpenSetting}
            handleClose={handleClose}
          />
        </>
      ) : null}

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

      {/* create new manager */}
      <CreateManager openManager={openManager} />
    </MainWrapper>
  );
};

export default StaffPage;
