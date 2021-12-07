import { Suspense, useState } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { Switch, Route } from "react-router-dom";
import Title from "components/Custom/Title";
import Modal from "components/Custom/Modal";
import Button from "components/Custom/Button";
import NavBar from "components/Custom/NavBar";
import { useRouteMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { setCompanyInfo } from "services/redux/Slices/partnerSlice";
import ExitButton from "./components/Buttons/ExitButton";
import useInfoRoute from "./routers";
import Spinner from "components/Custom/Spinner";
import Grid from "components/Custom/Grid";
import {
  Container,
  ModelContent,
  ModalWrap,
  ModelTitle,
  LogOutIcon,
  CloseIcon,
  Warn,
  WrapNav,
} from "./style";
import { setExitModal } from "services/redux/Slices/info/info";
import CancelButton from "./components/Buttons/CancelButton";

const Infopage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const infoPageSlice = useAppSelector((state) => state.infoSlice.addressAdd);
  const { menuItems } = useInfoRoute();

  const infoData = useAppSelector((state) => state.info.data);
  const open = useAppSelector((state) => state.info.exitmodal);
  const addressAdding = useAppSelector((state) => state.info.addressAdding);
  const regFilled = useAppSelector((state) => {
    return state.auth.regFilled;
  });
  const fill =
    (infoData?.filled && infoData?.filledAddress) ||
    (regFilled?.filled && regFilled?.filledAddress);

  let match = useRouteMatch();

  return (
    <Container
      bgcolor={
        match?.url === "/info/about" || !infoPageSlice || addressAdding
          ? "white"
          : "transparent"
      }
      photosectionpadding={match?.url === "/info/photos" ? true : false}
    >
      <Title padding={{ mobile: "0 0 0 15px" }}>{t("info")}</Title>
      <WrapNav>
        <Grid style={{ width: "100%", overflowY: "auto", overflowX: "hidden" }}>
          <NavBar list={menuItems} padding="0" margin="0" />
        </Grid>
        {fill ? null : (
          <ExitButton
            onClick={() => dispatch(setExitModal(true))}
            mobile={false}
          />
        )}
      </WrapNav>
      <Modal onClose={(v: boolean) => dispatch(setExitModal(v))} open={open}>
        <ModelContent>
          <ModelTitle>{t("sureleave")}</ModelTitle>
          <Warn>{t("warningcompanyinfo")}</Warn>
          <ModalWrap>
            <CancelButton onClick={() => dispatch(setExitModal(false))} />
            <Button
              buttonStyle={{
                color: "white",
                bgcolor: "#FF5E68",
                weight: 500,
              }}
              onClick={() => {
                dispatch(setExitModal(false));
                localStorage.removeItem("companyId");
                localStorage.removeItem("companyToken");
                history.push("/partner/company");
                dispatch(setCompanyInfo({}));
                window.location.replace("/partner/company");
              }}
            >
              {t("logout")}
              <LogOutIcon />
            </Button>
          </ModalWrap>
        </ModelContent>
      </Modal>
      <Switch>
        <Suspense fallback={<Spinner />}>
          {menuItems.map((item) => {
            return <Route exact path={item.path} component={item.component} />;
          })}
        </Suspense>
      </Switch>
    </Container>
  );
};

export default Infopage;
