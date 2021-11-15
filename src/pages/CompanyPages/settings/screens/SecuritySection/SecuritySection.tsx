import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text } from "../../../../../styles/CustomStyles";
import useSecurity from "./hooks/useSecurity";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import { Break, SpinnerDiv } from "../../styles";
import { Grid } from "@material-ui/core";
import { Form, UpSide, DownSide, UpRow, UpWrapper, Wrapper } from "./styles";
import InputFormat from "components/Custom/InputFormat";
import SaveButton from "pages/CompanyPages/settings/components/SaveButton";
import Spinner from "components/Helpers/Spinner";

const SecuritySection = () => {
  const { t } = useTranslation();
  const {
    control,
    suspendedClient,
    suspendedSum,
    handleSubmit,
    onFormSubmit,
    isLoading,
  } = useSecurity();

  if (isLoading) {
    return (
      <SpinnerDiv>
        <Spinner />
      </SpinnerDiv>
    );
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <UpSide>
        <UpWrapper>
          {/* Security row settings  */}
          <UpRow>
            <Grid
              container
              xs={12}
              sm={12}
              md={7}
              lg={7}
              direction="row"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Grid
                container
                justifyContent="flex-start"
                alignItems="flex-start"
                direction="column"
                xs={10}
              >
                <Grid item xs={12}>
                  <Text fontWeight={500} fontSize="18px">
                    Отслеживать подозрительных клиентов
                  </Text>
                </Grid>
                <Grid item xs={12}>
                  <Text fontWeight={300} fontSize="14px">
                    Оповестим, если какой-то клиент делает слишком много покупок
                  </Text>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end" xs={2}>
                <Controller
                  name="suspendedClient"
                  control={control}
                  render={({ field }) => {
                    return <CustomToggle checked={field.value} {...field} />;
                  }}
                />
              </Grid>
            </Grid>
            <Break height={25} />
            {suspendedClient && (
              <Grid container xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="first"
                  control={control}
                  render={({ field }) => {
                    return (
                      <InputFormat
                        field={field}
                        label={t("operations_per_day")}
                      />
                    );
                  }}
                />
              </Grid>
            )}
          </UpRow>

          <Break height={50} />

          {/* Security row suspended client count */}

          <UpRow>
            <Grid
              container
              xs={12}
              sm={12}
              md={7}
              lg={7}
              direction="row"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Grid
                container
                justifyContent="flex-start"
                alignItems="flex-start"
                direction="column"
                xs={10}
              >
                <Grid item xs={12}>
                  <Text fontWeight={500} fontSize="18px">
                    Ограничить сумму счета
                  </Text>
                </Grid>
                <Grid item xs={12}>
                  <Text fontWeight={300} fontSize="14px">
                    Кассир не сможет провести операцию больше указанной суммы
                  </Text>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end" xs={2}>
                <Controller
                  name="suspendedSum"
                  control={control}
                  render={({ field }) => {
                    return <CustomToggle checked={field.value} {...field} />;
                  }}
                />
              </Grid>
            </Grid>
            <Break height={25} />
            {suspendedSum && (
              <Grid xs={12} sm={12} md={4} lg={4}>
                <Controller
                  name="second"
                  control={control}
                  render={({ field }) => {
                    return (
                      <InputFormat
                        width={{
                          width: "100%",
                        }}
                        field={field}
                        label={t("enterSum")}
                      />
                    );
                  }}
                />
              </Grid>
            )}
          </UpRow>
        </UpWrapper>
      </UpSide>

      {/* Button side  */}
      <DownSide>
        <Wrapper>
          <SaveButton type="submit" text={t("save")} />
        </Wrapper>
      </DownSide>
    </Form>
  );
};

export default SecuritySection;
