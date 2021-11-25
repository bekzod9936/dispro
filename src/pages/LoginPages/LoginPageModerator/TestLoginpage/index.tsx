import { useState } from "react";
import {
  Container,
  LeftSide,
  RightSide,
  Img,
  Wrapper,
  Text,
  TextWrap,
  WrapSelect,
  ImgLogo,
  Title,
  WrapButton,
  WButton,
  WLogo,
} from "./style";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { useHistory, useRouteMatch } from "react-router";
import {
  setProceedAuth,
  setBackAddCompany,
} from "services/redux/Slices/authSlice";
import SamWalton from "assets/images/SamWalton.png";
import jackMa from "assets/images/JackMa.png";
import { LoginPanel } from "../Loginpanel/index";
import { Left, LeftBack } from "assets/icons/LoginPage/LoginPageIcons";
import logo from "assets/icons/logo_mobile.svg";
import Button from "components/Custom/Button";
import LangSelect from "components/LangSelect";
import Grid from "components/Custom/Grid";

const TestLoginpage = ({ children }: any) => {
  const { t } = useTranslation();
  const accessToken = localStorage.getItem("partner_access_token");
  const match = useRouteMatch();
  const history = useHistory();
  const proceedAuth = useAppSelector((state) => state.auth.proceedAuth);
  const backAddCompany = useAppSelector((state) => {
    return state.auth.backAddCompany;
  });
  const dispatch = useAppDispatch();
  const [display, setDisplay] = useState(false);

  const handleBack = () => {
    if (backAddCompany) {
      dispatch(setBackAddCompany(false));
    } else {
      if (match.path.includes("/partner/company")) {
        localStorage.removeItem("partner_access_token");
        localStorage.removeItem("partner_refresh_token");
        history.push("/");
      }
      if (proceedAuth) {
        dispatch(setProceedAuth(false));
      }
      if (match.path.includes("/partner/registration")) {
        localStorage.removeItem("partner_access_token");
        localStorage.removeItem("partner_refresh_token");
        history.push("/");
      }
    }
  };

  setTimeout(() => setDisplay(!display), 5000);

  return (
    <Container>
      <LeftSide>
        <Wrapper display={display}>
          <Img src={jackMa} alt="JackMa" />
          <Text fontSize={25}>{t("JackMaWords")}</Text>
          <TextWrap>
            <div>
              <Text fontSize={18} weight="bold">
                &mdash; {t("JackMa")}
              </Text>
            </div>
            <div>
              <Text weight="300">{t("JackMaInfo")}</Text>
            </div>
          </TextWrap>
        </Wrapper>
        <Wrapper display={!display}>
          <Img src={SamWalton} alt="SamWalton" />
          <Text fontSize={25}>{t("SamWaltonWords")}</Text>
          <TextWrap>
            <div>
              <Text fontSize={18} weight="bold">
                &mdash; {t("SamWalton")}
              </Text>
            </div>
            <div>
              <Text weight="300">{t("SamWaltonInfo")}</Text>
            </div>
          </TextWrap>
        </Wrapper>
      </LeftSide>
      <RightSide>
        <Grid style={{ width: "100%" }}>
          <WrapSelect justify={accessToken ? true : false}>
            <WLogo>
              {accessToken !== null && (
                <>
                  <WButton onClick={handleBack}>
                    <LeftBack />
                  </WButton>
                  <WrapButton>
                    <Button
                      onClick={handleBack}
                      buttonStyle={{
                        color: "#223367",
                        radius: "70px 14px 14px 14px",
                        weight: 500,
                        bgcolor: "rgba(96, 110, 234, 0.1)",
                      }}
                    >
                      <Left /> {t("back")}
                    </Button>
                  </WrapButton>
                </>
              )}
              <Title>
                <ImgLogo src={logo} alt="logo" />
                {t("discount")}
              </Title>
            </WLogo>
            <LangSelect />
          </WrapSelect>
        </Grid>
        {children ? children : <LoginPanel />}
      </RightSide>
    </Container>
  );
};

export default TestLoginpage;
