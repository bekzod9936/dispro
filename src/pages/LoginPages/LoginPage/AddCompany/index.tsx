import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../../../../components/Custom/Buttons/Button";
import { useHistory } from "react-router";
import Input from "../../../../components/Custom/Input";
import MultiSelect from "components/Custom/MultiSelect";
import { useMutation } from "react-query";
import { fetchAddCompanList } from "services/queries/partnerQuery";
import {
  setBackAddCompany,
  setRegFilled,
} from "services/redux/Slices/authSlice";
import { useAppDispatch } from "services/redux/hooks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "assets/images/logo.png";
import {
  Container,
  Header,
  Title,
  Version,
  MainWrap,
  WrapGrid,
  Content,
  Form,
  CountryWrap,
  WrapImg,
} from "./style";

interface FormProps {
  companyName: string;
  companyType: { value?: any; label?: any };
}

const AddCompany = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const resPostCompany = useMutation(
    (v: any) => {
      return fetchAddCompanList(v);
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("companyId", data.data.data.companyId);
        localStorage.setItem("companyToken", data.data.data.accessToken);
        history.push("/info/about");
        dispatch(setBackAddCompany(false));
        dispatch(
          setRegFilled({
            filled: false,
            filledAddress: false,
          })
        );
      },
    }
  );
  const onSubmit = (e: any) => {
    const values = {
      name: e.companyName,
      type: e.companyType.value,
    };
    resPostCompany.mutate(values);
  };

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
        <Content>
          <WrapGrid>
            <Title>{t("addingcompany")}</Title>
          </WrapGrid>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
                    message={t("requiredField")}
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
                    isSearchable={false}
                  />
                )}
              />
              <CountryWrap>
                <span>{t("arrivalCountry")}</span>
                <div>{t("Uzbekistan")}</div>
              </CountryWrap>
            </div>
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
                laptop: "0 0 30px 0",
              }}
              type="submit"
              disabled={resPostCompany.isLoading}
            >
              {t("create")}
            </Button>
          </Form>
        </Content>
      </MainWrap>
    </Container>
  );
};

export default AddCompany;
