import { SaveButton } from "components/Custom/Buttons/Save";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import InputFormat from "components/Custom/InputFormat";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "services/redux/hooks";
import useReward from "./useReward";
import { rewardingSchema, IForm } from "./rewarding.schema";
import { TextArea } from "components/Custom/TextArea";
import {
  Container,
  Form,
  Title,
  Text,
  WrapSwitch,
  Box,
  LeftSide,
  RightSide,
  Wrap,
  DownSide,
  WrapperVip,
  IconWord,
  WrapDesc,
} from "./style";

const Rewarding = () => {
  const { t } = useTranslation();
  const { response, postReward, handleSave } = useReward();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(rewardingSchema),
    mode: "onChange",
  });

  const data: any = useAppSelector((state) => state.newsetting.reward);
  const switch1 = useWatch({ control, name: "rewardType1" });
  const switch2 = useWatch({ control, name: "rewardType2" });
  const switch3 = useWatch({ control, name: "rewardType3" });
  const switch4 = useWatch({ control, name: "rewardType4" });

  useEffect(() => {
    data?.rewards?.forEach((v: any) => {
      if (v?.rewardType === 1) {
        setValue("rewardType1", v?.isActive);
        setValue("amountType1", v?.amount === 0 ? null : v?.amount);
      } else if (v?.rewardType === 2) {
        setValue("rewardType2", v?.isActive);
        setValue("amountType2", v?.amount === 0 ? null : v?.amount);
        setValue("limitCountReward", v?.levels[0]?.limitCountReward);
      } else if (v?.rewardType === 3) {
        setValue("rewardType3", v?.isActive);
        setValue("amountType3", v?.amount === 0 ? null : v?.amount);
        setValue("beforeDay", v?.levels[0]?.beforeDay);
        setValue("congratulationText", v?.levels[0]?.congratulationText);
      } else if (v?.rewardType === 4) {
        setValue("rewardType4", v?.isActive);
        setValue("amountType4", v?.amount === 0 ? null : v?.amount);
        setValue("amountRequirements", v?.levels[0]?.requirements[0]?.amount);
      }
    });
    setValue("values", data);
  }, [data]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleSave)}>
        <Wrap>
          <LeftSide>
            <Box>
              <WrapSwitch>
                <Title>{t("welcomepoints")}</Title>
                <Controller
                  name="rewardType1"
                  control={control}
                  render={({ field }) => {
                    return <CustomToggle checked={field.value} {...field} />;
                  }}
                />
              </WrapSwitch>
              <Text>{t("creditingofpoints")}</Text>
              {switch1 && (
                <Controller
                  name="amountType1"
                  control={control}
                  render={({ field }) => {
                    return (
                      <InputFormat
                        field={field}
                        label={t("amountofremuneration")}
                        maxLength={11}
                        width={{ width: "calc(100% - 50px)" }}
                        message={t(`${errors.amountType1?.message}`, {
                          value: 1000,
                        })}
                        error={
                          errors.amountType1?.message !== undefined
                            ? true
                            : false
                        }
                      />
                    );
                  }}
                />
              )}
            </Box>
            <Box>
              <WrapSwitch>
                <Title>{t("pointsforrecommendation")}</Title>
                <Controller
                  name="rewardType2"
                  control={control}
                  render={({ field }) => {
                    return <CustomToggle checked={field.value} {...field} />;
                  }}
                />
              </WrapSwitch>
              <Text>{t("pointsforfriend")}</Text>
              {switch2 && (
                <>
                  <Controller
                    name="amountType2"
                    control={control}
                    render={({ field }) => {
                      return (
                        <InputFormat
                          field={field}
                          label={t("amountofremuneration")}
                          maxLength={11}
                          margin={{ laptop: "0 0 25px 0" }}
                          width={{ width: "calc(100% - 50px)" }}
                          message={t(`${errors.amountType2?.message}`, {
                            value: 1000,
                          })}
                          error={
                            errors.amountType2?.message !== undefined
                              ? true
                              : false
                          }
                        />
                      );
                    }}
                  />
                  <Controller
                    name="limitCountReward"
                    control={control}
                    render={({ field }) => {
                      return (
                        <InputFormat
                          field={field}
                          label={t("awardLimit")}
                          maxLength={11}
                          width={{ width: "calc(100% - 50px)" }}
                          message={t(`${errors.limitCountReward?.message}`, {
                            value: 1,
                          })}
                          error={
                            errors.limitCountReward?.message !== undefined
                              ? true
                              : false
                          }
                        />
                      );
                    }}
                  />
                </>
              )}
            </Box>
          </LeftSide>
          <RightSide>
            <Box>
              <WrapSwitch className="rightswitch">
                <Title>{t("birthdaypoints")}</Title>
                <Controller
                  name="rewardType3"
                  control={control}
                  render={({ field }) => {
                    return <CustomToggle checked={field.value} {...field} />;
                  }}
                />
              </WrapSwitch>
              <Text className="textswitch">{t("creditingofpoints")}</Text>
              {switch3 && (
                <WrapDesc>
                  <div>
                    <Controller
                      name="amountType3"
                      control={control}
                      render={({ field }) => {
                        return (
                          <InputFormat
                            field={field}
                            label={t("amountofremuneration")}
                            maxLength={11}
                            width={{ width: "calc(100% - 50px)" }}
                            message={t(`${errors.amountType3?.message}`, {
                              value: 1000,
                            })}
                            margin={{ laptop: "0 0 35px 0" }}
                            error={
                              errors.amountType3?.message !== undefined
                                ? true
                                : false
                            }
                          />
                        );
                      }}
                    />
                    <Text>{t("numberdaysbirthday")}</Text>
                    <Controller
                      name="beforeDay"
                      control={control}
                      render={({ field }) => {
                        return (
                          <InputFormat
                            field={field}
                            label={t("payfor")}
                            maxLength={11}
                            IconEnd={<IconWord>{t("days")}</IconWord>}
                            width={{ width: "calc(100% - 50px)" }}
                            message={t(`${errors.beforeDay?.message}`)}
                            error={
                              errors.beforeDay?.message !== undefined
                                ? true
                                : false
                            }
                          />
                        );
                      }}
                    />
                  </div>
                  <Controller
                    name="congratulationText"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextArea
                        {...field}
                        message={t(`${errors.congratulationText?.message}`)}
                        error={
                          errors.congratulationText?.message !== undefined
                            ? true
                            : false
                        }
                        minHeight={"200px"}
                        maxHeight={"350px"}
                        resize={"vertical"}
                        title={t("description")}
                        container={{ margin: "0" }}
                      />
                    )}
                  />
                </WrapDesc>
              )}
            </Box>
            <Box>
              <WrapSwitch className="rightswitch">
                <Title>{t("vippoints")}</Title>
                <Controller
                  name="rewardType4"
                  control={control}
                  render={({ field }) => {
                    return <CustomToggle checked={field.value} {...field} />;
                  }}
                />
              </WrapSwitch>
              <Text className="textswitch">{t("increaseloyalty")}</Text>
              {switch4 && (
                <WrapperVip>
                  <Controller
                    name="amountType4"
                    control={control}
                    render={({ field }) => {
                      return (
                        <InputFormat
                          field={field}
                          label={t("amountofremuneration")}
                          maxLength={11}
                          width={{ width: "calc(100% - 50px)" }}
                          message={t(`${errors.amountType4?.message}`, {
                            value: 1000,
                          })}
                          error={
                            errors.amountType4?.message !== undefined
                              ? true
                              : false
                          }
                        />
                      );
                    }}
                  />
                  <Controller
                    name="amountRequirements"
                    control={control}
                    render={({ field }) => {
                      return (
                        <InputFormat
                          field={field}
                          label={t("ifMoreThan")}
                          maxLength={11}
                          width={{ width: "calc(100% - 50px)" }}
                          IconEnd={<IconWord>UZS</IconWord>}
                          message={t(`${errors.amountRequirements?.message}`, {
                            value: 1000,
                          })}
                          error={
                            errors.amountRequirements?.message !== undefined
                              ? true
                              : false
                          }
                        />
                      );
                    }}
                  />
                </WrapperVip>
              )}
            </Box>
          </RightSide>
        </Wrap>
        <DownSide>
          <SaveButton disabled={response.isLoading || postReward.isLoading} />
        </DownSide>
      </Form>
    </Container>
  );
};
export default Rewarding;
