import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Input from "components/Custom/Input";
import { Flex } from "../../../../../styles/BuildingBlocks";
import { SettingsWrapper } from "../../styles/SettingStyles";
import { Text } from "../../../../../styles/CustomStyles";
import { SaveIcon } from "../../../../../assets/icons/InfoPageIcons/InfoPageIcons";
import useSecurity from "./hooks/useSecurity";
import Button from "components/Custom/Button";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import { Break } from "../../styles";
import { Grid } from "@material-ui/core";
import { Form } from "./styles";

const SecuritySection = () => {
  const { t } = useTranslation();
  const { control, suspendedClient, suspendedSum, handleSubmit, onFormSubmit } =
    useSecurity();

  // const handleSwitch = (checked: boolean, item: any, index: number) => {
  //   let exist = switchStates?.includes(item.key);
  //   if (!exist && checked) {
  //     setSwitchStates([...switchStates, item.key]);
  //   } else if (!checked && exist) {
  //     let filtered = [...switchStates];
  //     let searchingIndex = filtered.findIndex(
  //       (value: any) => value === item.key
  //     );
  //     filtered.splice(searchingIndex, 1);
  //     setSwitchStates([...filtered]);
  //   }
  // };

  return (
    <div style={{ display: "flex", flexGrow: 1 }}>
      <SettingsWrapper>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <Flex
            margin="0px"
            flexDirection="column"
            justifyContent="start"
            alignItems="flex-start"
          >
            {/* Security row settings  */}
            <Grid
              xs={7}
              container
              justifyContent="flex-start"
              alignItems="flex-start"
              direction="column"
            >
              <Grid
                container
                xs={10}
                direction="row"
                alignItems="flex-start"
                justifyContent="flex-start"
                style={{
                  marginBottom: "15px",
                }}
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
                      return <CustomToggle checked={field.value} {...field} />;
                    }}
                  />
                </Grid>
              </Grid>

              {suspendedClient && (
                <div style={{ width: "70%" }}>
                  <Controller
                    name="first"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input field={field} label={t("operations_per_day")} />
                      );
                    }}
                  />
                </div>
              )}
            </Grid>

            <Break height={50} />

            {/* Security row suspended client count */}

            <Grid
              xs={7}
              container
              justifyContent="flex-start"
              alignItems="flex-start"
              direction="column"
            >
              <Grid
                container
                xs={10}
                direction="row"
                alignItems="flex-start"
                justifyContent="flex-start"
                style={{
                  marginBottom: "15px",
                }}
              >
                <Grid container direction="column" xs={10}>
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
                <Grid item xs={2}>
                  <Controller
                    name="suspendedSum"
                    control={control}
                    render={({ field }) => {
                      return <CustomToggle checked={field.value} {...field} />;
                    }}
                  />
                </Grid>
              </Grid>
              {suspendedSum && (
                <div style={{ width: "70%" }}>
                  <Controller
                    name="second"
                    control={control}
                    render={({ field }) => {
                      return <Input field={field} label={t("enterSum")} />;
                    }}
                  />
                </div>
              )}
            </Grid>
          </Flex>
          <div style={{ position: "fixed", bottom: "10px", width: "100%" }}>
            <Button type="submit">
              <SaveIcon />
              <Text marginLeft="15px" color="white">
                {t("save")}
              </Text>
            </Button>
          </div>
        </Form>
      </SettingsWrapper>
    </div>
  );
};

export default SecuritySection;
