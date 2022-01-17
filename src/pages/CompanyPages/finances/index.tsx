import { useRecoilState } from "recoil";
import { Suspense, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch } from "react-router";
//routes
import useFinanceRoute from "./routes";
import useLayout from "components/Layout/useLayout";
//styles
import {
  MainWrapper,
  WrapHeader,
  LeftHeader,
  Wrap,
  DepositIcon,
  ShieldIcon,
  TitleLimit,
  TextLimit,
  WrapLimit,
  MainLimit,
  SideDrawer,
} from "./style";
import { numberWithNew } from "services/utils";
//components
import NavBar from "components/Custom/NavBar";
import Title from "components/Custom/Title";
import Spinner from "components/Custom/Spinner";
//atoms
import { mainLimit, mainBalance } from "services/atoms/info";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { setSideDrawer } from "services/redux/Slices/finance";
import useWindowWidth from "services/hooks/useWindowWidth";

const Finance = () => {
  const { t } = useTranslation();
  const { menuItems } = useFinanceRoute();
  const companyId = localStorage.getItem("companyId");
  const dispatch = useAppDispatch();

  const accountsBalance = useRecoilState(mainBalance);
  const accountsLimit = useRecoilState(mainLimit);
  const sidedrawer = useAppSelector(
    (state) => state.finance.historyFinance.sidedrawer
  );

  const { width } = useWindowWidth();

  useLayout({ id: companyId });

  const ref: any = useRef(null);

  const handleClickOutside = (event: any) => {
    if (sidedrawer.openRow) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(setSideDrawer({ openRow: false, chosenRow: {} }));
      }
    }
  };

  useEffect(() => {
    if (width > 600) {
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }
  });

  return (
    <>
      <MainWrapper>
        <Wrap>
          <WrapHeader>
            <LeftHeader>
              <Title padding={{ planshet: "0" }}>{t("finances")}</Title>
              <MainLimit>
                <WrapLimit>
                  <DepositIcon />
                  <TitleLimit>
                    {t("deposit")}
                    <TextLimit>
                      {`${numberWithNew({
                        number: accountsBalance[0].balance,
                        defaultValue: 0,
                      })} UZS`}
                    </TextLimit>
                  </TitleLimit>
                </WrapLimit>
                <WrapLimit>
                  <ShieldIcon />
                  <TitleLimit>
                    {t("limit")}
                    <TextLimit>
                      {`${numberWithNew({
                        number: accountsLimit[0].limit,
                        defaultValue: 0,
                      })} UZS`}
                    </TextLimit>
                  </TitleLimit>
                </WrapLimit>
              </MainLimit>
              <NavBar list={menuItems} padding="0 15px 0 0" margin="10px 0" />
            </LeftHeader>
          </WrapHeader>
          <Switch>
            <Suspense fallback={<Spinner />}>
              {menuItems.map((item) => {
                return (
                  <Route exact path={item.path} component={item.component} />
                );
              })}
            </Suspense>
          </Switch>
        </Wrap>
        <SideDrawer ref={ref} open={sidedrawer.openRow}>
          {sidedrawer?.content}
        </SideDrawer>
      </MainWrapper>
    </>
  );
};

export default Finance;
