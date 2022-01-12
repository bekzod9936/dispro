import { useState } from "react";
import { LoginPanel } from "../Loginpanel/index";
import { Left, LeftBack } from "assets/icons/LoginPage/LoginPageIcons";
import Button from "components/Custom/Buttons/Button";
import LangSelect from "components/LangSelect";
import Grid from "components/Custom/Grid";
import { PARTNER } from "services/interceptors/partner_interceptor/types";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { useHistory, useLocation } from "react-router";
import {
  setProceedAuth,
  setBackAddCompany,
} from "services/redux/Slices/authSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SamWalton from "assets/images/SamWalton.png";
import jackMa from "assets/images/JackMa.png";
import logo from "assets/images/logo.png";
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

const TestLoginpage = ({ children }: any) => {
  const { t } = useTranslation();
  const accessToken = localStorage.getItem(PARTNER.ACCESS_TOKEN);

  const location = useLocation();
  const history = useHistory();
  const proceedAuth = useAppSelector((state) => state.auth.proceedAuth);
  const backAddCompany = useAppSelector((state) => {
    return state.auth.backAddCompany;
  });
  const dispatch = useAppDispatch();
  const [display, setDisplay] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem(PARTNER.ACCESS_TOKEN);
    localStorage.removeItem(PARTNER.REFRESH_TOKEN);
    history.push("/");
  };

  const handleBack = () => {
    if (backAddCompany) {
      dispatch(setBackAddCompany(false));
    } else {
      if (location.pathname.includes("/partner/company")) {
        handleLogout();
      }
      if (proceedAuth) {
        dispatch(setProceedAuth(false));
      }
      if (location.pathname.includes("/partner/registration")) {
        handleLogout();
      }
    }
  };

  setTimeout(() => setDisplay(!display), 5000);

  return (
    <Container>
      <LeftSide>
        <Wrapper display={display}>
          <Img>
            <LazyLoadImage
              src={jackMa}
              alt="JackMa"
              width="100%"
              height="100%"
              effect="blur"
              style={{ borderRadius: "50%" }}
            />
          </Img>
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
          <Img>
            <LazyLoadImage
              src={SamWalton}
              alt="SamWalton"
              width="100%"
              height="100%"
              effect="blur"
              style={{ borderRadius: "50%" }}
            />
          </Img>
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
                <ImgLogo>
                  <LazyLoadImage
                    src={logo}
                    alt="logo"
                    width="100%"
                    height="100%"
                    effect="blur"
                  />
                </ImgLogo>
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
