import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useMutation } from "react-query";
import { useForm, Controller } from "react-hook-form";
//utilities
import { inputPhoneNumber, inputSms } from "utilities/inputFormat";
//types
import { USERTYPE, FormProps, PropLog, PropSign } from "./types";
//queries
import { logIn, signIn } from "services/queries/loginQuery";
//hooks
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
//actions
import {
  setCompanyState,
  setLogIn,
  setProceedAuth,
} from "services/redux/Slices/authSlice";
//assets
import DisIcon from "assets/icons/DisIcon";
//styles
import {
  Container,
  MainWrap,
  Version,
  Header,
  Title,
  Body,
  Text,
  Message,
  WrapTime,
  Time,
  SmsNumber,
  Content,
  WrapContent,
  Form,
  WrapButton,
  LogInContentWrap,
  LogInWrap,
} from "./style";
//components
import Input from "components/Custom/Input";
import MultiSelect from "components/Custom/MultiSelect";
import SnackBar from "components/Custom/NewSnack";
import Button from "components/Custom/Button";

export const LoginPanel = () => {
  const { t } = useTranslation();
  const [disable, setDisable] = useState(true);

  const proceedAuth = useAppSelector((state) => {
    return state.auth.proceedAuth;
  });

  const refetchList = useAppSelector((state) => {
    return state.auth.refetch;
  });

  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState("");
  const history = useHistory();
  const [time, setTime] = useState(60);
  const [fetch, setFetch] = useState(false);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [errorSms, setErrorSms] = useState<boolean>(false);
  const [errorM, seterrorM] = useState("");
  const [errorCount, setErrorCount] = useState(3);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
    watch,
    reset,
  } = useForm<FormProps>({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const values = getValues();

  let startTimer = () => {
    if (time <= 0) {
      return;
    }
    const timer = setTimeout(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    if (fetch) {
      startTimer();
    }
  }, [time, fetch]);

  let checkPhone = inputPhoneNumber({
    value: values?.phoneNumber,
  });

  useEffect(() => {
    if (values?.phoneNumber === undefined) {
      setValue("phoneNumber", "");
    } else {
      if (checkPhone.newString !== "") {
        setValue("phoneNumber", checkPhone.newString);
      } else {
        setValue("phoneNumber", checkPhone.newString);
        setDisable(true);
      }
    }
  }, [checkPhone.check, watch("phoneNumber")]);

  let checkSms = inputSms({
    value: values?.smsCode,
  });

  useEffect(() => {
    if (values?.smsCode === undefined) {
      setValue("smsCode", "");
    } else {
      setValue("smsCode", checkSms.newString);
    }
  }, [checkSms.check, watch("smsCode")]);

  watch(["role", "phoneNumber"]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (
        value?.role?.value !== undefined &&
        value?.role?.value !== "" &&
        value?.phoneNumber?.length === 9
      ) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch(["role", "phoneNumber"])]);

  const logRes = useMutation((values: PropSign) =>
    signIn({
      role: Number(values?.role?.value),
      phoneNumber: values?.phoneNumber,
    })
  );

  const onSubmit = (values: any) => {
    logRes.mutate(values, {
      onSuccess: (data) => {
        dispatch(setProceedAuth(true));
        const number = data.data.data.telNumber;
        const privateNumber = `+${number.substr(0, 3)} ${number.substr(
          3,
          2
        )} *** ** ${number.substr(10, 2)}`;
        setPhone(privateNumber);
        setFetch(true);
      },
      onError: () => {
        setErrorOpen(true);
      },
    });
  };

  const smsRes = useMutation((values: PropLog) =>
    logIn({
      role: Number(values.role?.value),
      phoneNumber: values.phoneNumber,
      smsCode: values.smsCode,
    })
  );

  const onSubmitSms = (values: any) => {
    smsRes.mutate(values, {
      onSuccess: (data) => {
        const res = data.data.data;
        setTime(0);
        localStorage.setItem("partner_access_token", res.accessToken);
        localStorage.setItem("partner_refresh_token", res.refreshToken);
        localStorage.setItem("userType", res.userType);
        dispatch(setLogIn(res));
        refetchList();
        dispatch(setCompanyState(res.status));

        if (res.status === "old") {
          history.push("/partner/company");
        } else {
          history.push("/partner/registration");
        }
      },
      onError: (error: any) => {
        setErrorSms(true);
        setErrorCount(errorCount - 1);
        seterrorM(
          error?.response?.data?.error?.errMsg === t("warningsms")
            ? t("warningsms")
            : `${t("errorsmscode")}${errorCount - 1}`
        );
      },
    });
  };

  const handleBack = () => {
    dispatch(setProceedAuth(false));
    setTime(60);
    setFetch(false);
    setValue("phoneNumber", "");
    setValue("role", { value: "" });
    setValue("smsCode", "");
    setDisable(true);
    setError("smsCode", {
      message: t("requiredField"),
      type: "required",
    });
    reset();
    localStorage.removeItem("partner_access_token");
    localStorage.removeItem("partner_refresh_token");
  };

  const handleReSend = () => {
    logRes.mutate(
      {
        role: values?.role,
        phoneNumber: values?.phoneNumber,
      },
      {
        onSuccess: (data) => {
          const number = data.data.data.telNumber;
          const privateNumber = `+${number.substr(0, 3)} ${number.substr(
            3,
            2
          )} *** ** ${number.substr(10, 2)}`;
          setPhone(privateNumber);
          setFetch(true);
          setTime(60);
        },
      }
    );

    setFetch(false);
    setTime(0);
  };

  return (
    <Container>
      <MainWrap>
        <Header>
          <Version>v1.0.130</Version>
          <Title>
            <DisIcon />
            {proceedAuth ? t("disadmin") : t("discount")}
          </Title>
        </Header>
        <Body>
          <Text fontSize={22} weight="bold" marginB={10}>
            {proceedAuth ? t("enterAssertCode") : t("welcome")}
          </Text>
          {!proceedAuth && <Text marginB={20}> {t("enterData")}</Text>}
          <Form
            onSubmit={
              proceedAuth ? handleSubmit(onSubmitSms) : handleSubmit(onSubmit)
            }
          >
            {proceedAuth ? (
              <WrapContent>
                <Content>
                  <Controller
                    name="smsCode"
                    control={control}
                    rules={{
                      required: true,
                      maxLength: 4,
                      minLength: 4,
                    }}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        label={t("assertCode")}
                        error={errorSms || errors.smsCode ? true : false}
                        field={field}
                        margin={{
                          laptop: "20px 0 0",
                        }}
                        type="number"
                        IconEnd={
                          <WrapTime time={time}>
                            <Time time={time}>{time}</Time>
                          </WrapTime>
                        }
                        autoFocus={true}
                        maxLength={4}
                      />
                    )}
                  />
                  {errors.smsCode && <Message>{t("requiredField")}</Message>}
                  {time === 0 && <Message>{t("wrongsmscode")}</Message>}
                  {time === 0 && (
                    <Button
                      buttonStyle={{
                        color: "#3492FF",
                        bgcolor: "transparent",
                      }}
                      padding={{ laptop: "0" }}
                      onClick={handleReSend}
                      disabled={logRes.isLoading}
                    >
                      {t("resend")}
                    </Button>
                  )}
                  <SmsNumber time={time}>
                    {t("smsphone")}
                    {phone}
                  </SmsNumber>
                  <SnackBar
                    message={errorM}
                    status="error"
                    open={errorSms}
                    onClose={(e: any) => setErrorSms(e)}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  />
                  {errorSms || (smsRes.isError && time !== 0) ? (
                    <Message>{t("errorsms")}</Message>
                  ) : null}
                </Content>
                <Content>
                  <WrapButton>
                    <Button
                      buttonStyle={{
                        shadow: "0px 19px 30px rgba(96, 110, 234, 0.35)",
                        radius: 12,
                        fontSize: {
                          laptop: 17,
                          desktop: 18,
                          mobile: 16,
                          planshet: 16,
                        },
                        height: {
                          mobile: 45,
                          planshet: 45,
                          laptop: 50,
                          desktop: 60,
                        },
                      }}
                      type="submit"
                      data-cy="login"
                      disabled={smsRes.isLoading}
                      fullWidth={true}
                    >
                      {t("enter")}
                    </Button>
                  </WrapButton>
                  <Button
                    buttonStyle={{
                      bgcolor: "transparent",
                      color: "#606EEA",
                      fontSize: {
                        laptop: 17,
                        desktop: 18,
                        mobile: 16,
                        planshet: 16,
                      },
                    }}
                    onClick={handleBack}
                    width={{ width: "100%" }}
                  >
                    {t("back")}
                  </Button>
                </Content>
              </WrapContent>
            ) : (
              <LogInWrap>
                <LogInContentWrap>
                  <Controller
                    name="role"
                    control={control}
                    defaultValue={{ value: USERTYPE.ADMIN, label: t("admin") }}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <MultiSelect
                        label={t("staffRole")}
                        dataCy="staffRole"
                        defaultValue={USERTYPE.ADMIN}
                        options={[
                          { value: USERTYPE.ADMIN, label: t("admin") },
                          { value: USERTYPE.MANAGER, label: t("manager") },
                        ]}
                        field={field}
                        error={errors.role ? true : false}
                        message={t("requiredField")}
                        placeholder=""
                        isSearchable={false}
                      />
                    )}
                  />
                  <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{ required: true, maxLength: 9 }}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        label={t("phoneNumber")}
                        error={errors.phoneNumber ? true : false}
                        message={
                          <Message>
                            <div>{t("phoneLength")}</div>
                            <div>{t("tryagain")}</div>
                          </Message>
                        }
                        data-cy="phoneNumber"
                        type="tel"
                        field={field}
                        margin={{
                          planshet: "20px 0 0",
                          laptop: "20px 0 0",
                          desktop: "20px 0 40px",
                        }}
                        maxLength={9}
                        inputStyle={{ inpadding: "0 20px 0 0" }}
                        IconStart={<div className="inputstyle">+998</div>}
                      />
                    )}
                  />
                </LogInContentWrap>
                <Button
                  buttonStyle={{
                    radius: 12,
                    fontSize: {
                      laptop: 17,
                      desktop: 18,
                      mobile: 16,
                      planshet: 16,
                    },
                    shadow: "0px 19px 30px rgba(96, 110, 234, 0.35)",
                    height: {
                      mobile: 45,
                      planshet: 45,
                      laptop: 50,
                      desktop: 60,
                    },
                  }}
                  type="submit"
                  data-cy="sign-up"
                  disabled={disable || logRes.isLoading}
                  width={{ width: "100%" }}
                >
                  {t("next")}
                </Button>
              </LogInWrap>
            )}
          </Form>
        </Body>
      </MainWrap>
      <SnackBar
        message={t("usernotfind")}
        status="error"
        open={errorOpen}
        onClose={(e: any) => setErrorOpen(e)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Container>
  );
};
