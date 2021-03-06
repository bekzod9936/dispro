import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../../../../components/Custom/Buttons/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { createCompany } from "../../../../services/queries/partnerQuery";
import { useMutation } from "react-query";
import { useAppSelector } from "../../../../services/redux/hooks";
import { useHistory } from "react-router";
import Input from "../../../../components/Custom/Input";
import logo from "assets/images/logo.png";
import {
  Container,
  Header,
  Title,
  Text,
  Version,
  MainWrap,
  WrapStep,
  LStep,
  MStep,
  WrapGrid,
  Content,
  Form,
  RLink,
  Label,
  WrapCheck,
  CountryWrap,
  WrapImg,
} from "./style";
import MultiSelect from "../../../../components/Custom/MultiSelect";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface FormProps {
  email: string;
  lastName: string;
  firstName: string;
  readPolice: boolean;
  applicationOnConditions: boolean;
  companyName: string;
  companyType: { value?: any; label?: any };
}

interface Props {
  companyName: string;
  companyType: { value?: any; label?: any };
}

const Registrationpanel = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [step1, setStep1Values] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [disable, setDisable] = useState(true);
  const history = useHistory();
  const company: any = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormProps>({
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      if (
        value?.firstName !== undefined &&
        value?.firstName !== "" &&
        value?.lastName !== undefined &&
        value?.lastName !== "" &&
        value?.email !== undefined &&
        value?.email !== "" &&
        value?.readPolice === true &&
        value?.applicationOnConditions === true
      ) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [
    watch("firstName"),
    watch("lastName"),
    watch("readPolice"),
    watch("applicationOnConditions"),
    watch("email"),
  ]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (
        value?.companyName !== undefined &&
        value?.companyName !== "" &&
        value?.companyType !== undefined
      ) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch("companyName"), watch("companyType")]);

  const onSubmitStep1 = (v: any) => {
    setStep1Values(v);
    setStep(step + 1);
    setDisable(true);
    reset();
  };

  const res = useMutation((values: Props) => {
    const v = {
      companyId: company.companyId,
      email: step1.email,
      firstName: step1.firstName,
      lastName: step1.lastName,
      countryId: 1,
      companyName: values.companyName,
      companyType: values.companyType.value,
    };
    return createCompany(v);
  });

  const onSubmitStep2 = (values: any) => {
    res.mutate(values, {
      onSuccess: (data) => {
        localStorage.setItem("companyId", data.data.data.companyId);
        localStorage.setItem("companyToken", data.data.data.accessToken);
        history.push("/info/about");
      },
    });
  };
  console.log(errors, "sjsjjs");
  return (
    <Container>
      <MainWrap>
        <Header>
          <Version>v1.0.130</Version>
          <Title>
            <WrapImg>
              <LazyLoadImage
                src={logo}
                alt="logo"
                effect="blur"
                width="100%"
                height="100%"
              />
            </WrapImg>
            {t("disadmin")}
          </Title>
        </Header>
        <WrapGrid>
          <WrapStep activeStep={step}>
            {[1, 2].map((v) => (
              <MStep key={v}>
                <LStep></LStep>
              </MStep>
            ))}
          </WrapStep>
          <Title>{t("registration")}</Title>
          <Text> {t("fillAllPlease")}</Text>
        </WrapGrid>
        <Content>
          <Form
            onSubmit={handleSubmit(step === 0 ? onSubmitStep1 : onSubmitStep2)}
          >
            {step === 0 ? (
              <div>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{
                    required: true,
                    pattern: /^[a-zA-Z??-????-??-????]*$/,
                  }}
                  render={({ field }) => (
                    <Input
                      label={t("your_name")}
                      error={errors.firstName ? true : false}
                      type="string"
                      field={field}
                      margin={{
                        laptop: "20px 0 0",
                      }}
                      message={
                        errors.firstName?.type === "required"
                          ? t("requiredField")
                          : t("onlyletters")
                      }
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  rules={{
                    required: true,
                    pattern: /^[a-zA-Z??-????-??-????]*$/,
                  }}
                  render={({ field }) => (
                    <Input
                      label={t("your_lastName")}
                      error={errors.lastName ? true : false}
                      type="string"
                      field={field}
                      margin={{
                        laptop: "20px 0 0",
                      }}
                      message={
                        errors.firstName?.type === "required"
                          ? t("requiredField")
                          : t("onlyletters")
                      }
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  }}
                  render={({ field }) => (
                    <Input
                      label={t("email")}
                      error={errors.email ? true : false}
                      type="email"
                      field={field}
                      margin={{
                        laptop: "20px 0 30px",
                      }}
                      message={
                        errors.firstName?.type === "required"
                          ? t("requiredField")
                          : t("email")
                      }
                    />
                  )}
                />

                <WrapCheck>
                  <Controller
                    name="readPolice"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} color="primary" />
                    )}
                  />
                  <Label htmlFor="readPolice">
                    {t("read")}
                    <RLink href="/privacy-policy" target="_blank">
                      {t("policy", { policy: "????????????????" })}
                    </RLink>
                    {t("agree")}
                  </Label>
                </WrapCheck>
                <WrapCheck>
                  <Controller
                    name="applicationOnConditions"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} color="primary" />
                    )}
                  />
                  <Label>
                    {t("applicationApply")}
                    <RLink href="/terms-and-conditions" target="_blank">
                      {t("conditions")}
                    </RLink>
                  </Label>
                </WrapCheck>
              </div>
            ) : (
              <div>
                <Controller
                  name="companyName"
                  control={control}
                  rules={{ required: true, minLength: 4 }}
                  render={({ field }) => (
                    <Input
                      label={t("companyName")}
                      error={errors.companyName ? true : false}
                      type="string"
                      field={field}
                      margin={{
                        laptop: "20px 0 25px",
                      }}
                      message={
                        errors.companyName?.type === "minLength"
                          ? t("minValue4")
                          : t("requiredField")
                      }
                    />
                  )}
                />
                <Controller
                  name="companyType"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <MultiSelect
                      label={t("companyType")}
                      options={[
                        { value: 1, label: t("Other") },
                        { value: 2, label: t("park") },
                      ]}
                      field={field}
                      error={errors.companyType ? true : false}
                      message={t("requiredField")}
                    />
                  )}
                />
                <CountryWrap>
                  <span>{t("arrivalCountry")}</span>
                  <div>{t("Uzbekistan")}</div>
                </CountryWrap>
              </div>
            )}
            <Button
              fullWidth={true}
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
              margin={{
                laptop: "10px 0 30px 0",
              }}
              type="submit"
              disabled={
                disable ||
                res.isLoading ||
                errors.firstName?.type === "pattern" ||
                errors.lastName?.type === "pattern" ||
                errors.email?.type === "pattern"
              }
            >
              {step === 0 ? t("next") : t("enter")}
            </Button>
          </Form>
        </Content>
      </MainWrap>
    </Container>
  );
};

export default Registrationpanel;
