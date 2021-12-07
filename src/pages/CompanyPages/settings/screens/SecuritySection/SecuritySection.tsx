import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
//styles
import { Text } from "../../../../../styles/CustomStyles";
import { Break, SpinnerDiv } from "../../styles";
import { Form, UpSide, DownSide, UpRow, UpWrapper, Wrapper } from "./styles";
//components
import Grid from "@material-ui/core/Grid/index";
import InputFormat from "components/Custom/InputFormat";
import SaveButton from "pages/CompanyPages/settings/components/SaveButton";
import Spinner from "components/Helpers/Spinner";
import CustomToggle from "components/Custom/CustomToggleSwitch";
//hooks
import useWindowWidth from "services/hooks/useWindowWidth";
import useSecurity from "./hooks/useSecurity";

const SecuritySection = () => {
  const { t } = useTranslation();
  const {
    control,
    suspendedClient,
    handleSubmit,
    onFormSubmit,
    isLoading,
  } = useSecurity();
  const { width } = useWindowWidth();
  const bgInput = width < 1000 ? "transparent" : "#fff";

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
                  defaultValue={suspendedClient}
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
                        maxLength={11}
                        inputStyle={{
                          bgcolor: bgInput,
                        }}
                      />
                    );
                  }}
                />
              </Grid>
            )}
          </UpRow>

          <Break height={50} />
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
