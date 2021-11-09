import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { SettingsWrapper } from "../../styles/SettingStyles";
import { Text } from "../../../../../styles/CustomStyles";
import { SaveIcon } from "../../../../../assets/icons/InfoPageIcons/InfoPageIcons";
import useSecurity from "./hooks/useSecurity";
import Button from "components/Custom/Button";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import { Break } from "../../styles";
import { Grid } from "@material-ui/core";
import { Form, UpSide, DownSide, UpRow } from "./styles";
import InputFormat from "components/Custom/InputFormat";

const SecuritySection = () => {
  const { t } = useTranslation();
  const { control, suspendedClient, suspendedSum, handleSubmit, onFormSubmit } =
    useSecurity();

  return (
    <div style={{ display: "flex", flexGrow: 1 }}>
      <SettingsWrapper>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container xs={12} direction="column">
            <UpSide>
              {/* Security row settings  */}
              <UpRow>
                <Grid
                  container
                  xs={7}
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  <Grid container direction="column" xs={10}>
                    <Grid item xs={12}>
                      <Text fontWeight={500} fontSize="18px">
                        Отслеживать подозрительных клиентов
                      </Text>
                    </Grid>
                    <Grid item xs={12}>
                      <Text fontWeight={300} fontSize="14px">
                        Оповестим, если какой-то клиент делает слишком много
                        покупок
                      </Text>
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Controller
                      name="suspendedClient"
                      control={control}
                      render={({ field }) => {
                        return (
                          <CustomToggle checked={field.value} {...field} />
                        );
                      }}
                    />
                  </Grid>
                </Grid>
                <Break height={25} />
                {suspendedClient && (
                  <Grid container xs={4}>
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
                  xs={7}
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  <Grid container direction="column" xs={10}>
                    <Grid item xs={12}>
                      <Text fontWeight={500} fontSize="18px">
                        Ограничить сумму счета
                      </Text>
                    </Grid>
                    <Grid item xs={12}>
                      <Text fontWeight={300} fontSize="14px">
                        Кассир не сможет провести операцию больше указанной
                        суммы
                      </Text>
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Controller
                      name="suspendedSum"
                      control={control}
                      render={({ field }) => {
                        return (
                          <CustomToggle checked={field.value} {...field} />
                        );
                      }}
                    />
                  </Grid>
                </Grid>
                <Break height={25} />
                {suspendedSum && (
                  <Grid xs={4}>
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
            </UpSide>

            {/* Button side  */}
            <DownSide>
              <Button startIcon={<SaveIcon />} type="submit">
                {t("save")}
              </Button>
            </DownSide>
          </Grid>
        </Form>
      </SettingsWrapper>
    </div>
  );
};

export default SecuritySection;
