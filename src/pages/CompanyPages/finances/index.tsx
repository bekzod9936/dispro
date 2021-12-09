import { useRecoilState } from "recoil";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch, Redirect } from "react-router";
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
} from "./style";
import { numberWithNew } from "services/utils";
//components
import NavBar from "components/Custom/NavBar";
import Title from "components/Custom/Title";
import Spinner from "components/Custom/Spinner";
//atoms
import { mainLimit, mainBalance } from "services/atoms/info";

const Finance = () => {
  const { t } = useTranslation();
  const { menuItems } = useFinanceRoute();
  const companyId = localStorage.getItem("companyId");

  const accountsBalance = useRecoilState(mainBalance);
  const accountsLimit = useRecoilState(mainLimit);

  const { resLimit } = useLayout({ id: companyId });

  return (
    <MainWrapper>
      <Wrap>
        <WrapHeader>
          <LeftHeader>
            <Title>{t("finances")}</Title>
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
            <Route path="*">
              <Redirect to={menuItems[0].path} />
            </Route>
          </Suspense>
        </Switch>
      </Wrap>
    </MainWrapper>
  );
};

export default Finance;
