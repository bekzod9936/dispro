import Grid from "@material-ui/core/Grid";
import { Flex } from "styles/BuildingBlocks";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import Input from "components/Custom/Input";
import { Text } from "styles/CustomStyles";
import { Controller } from "react-hook-form";
import { SaveIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import { useTranslation } from "react-i18next";

import {
  AwardContainer,
  BottomAwardBtnContainer,
  Form,
  LeftAwardGrid,
  RightAwardGrid,
  AwardWrapper,
  ControlGrid,
  AwardGrid,
  RecomendationRow,
  TextAreaGrid,
  PayForGrid,
} from "./styles";
import Button from "components/Custom/Button";
import useAwards from "./hooks/useAwards";
import { Break } from "../../styles";

const AwardingSection = () => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    onFormSubmit,
    inviteCheck,
    recommendCheck,
    vipCheck,
    birthdayCheck,
    saveBonus,
  } = useAwards();

  return (
    <Flex flexGrow="1" margin="0px">
      <AwardWrapper>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <AwardContainer container spacing={3}>
            <LeftAwardGrid item xs={12} sm={5}>
              {/* Invite Settings  */}
              <AwardGrid container direction="column" xs={12}>
                <Grid container xs={12} direction="row">
                  <Grid xs={9}>
                    <div>
                      <Text fontWeight={500} fontSize="18px">
                        Приветственные баллы
                      </Text>
                    </div>
                    <div style={{ maxWidth: "340px", minWidth: "340px" }}>
                      <Text fontWeight={300} fontSize="14px">
                        Единоразовое начисление баллов клиенту за присоединение
                        к компании
                      </Text>
                    </div>
                  </Grid>
                  <Grid xs={3}>
                    <Controller
                      name="inviteCheck"
                      control={control}
                      render={({ field }) => {
                        return (
                          <CustomToggle checked={field.value} {...field} />
                        );
                      }}
                    />
                  </Grid>
                </Grid>
                {inviteCheck && (
                  <ControlGrid item xs={12}>
                    <Controller
                      control={control}
                      name="awardSizeFirst"
                      render={({ field }) => {
                        return (
                          <Input
                            field={field}
                            width={{ width: "70%" }}
                            label={t("awardSize")}
                          />
                        );
                      }}
                    />
                  </ControlGrid>
                )}
              </AwardGrid>
              <Break height={50} />

              {/* Recomendation balls */}
              <AwardGrid>
                <Grid container xs={12} direction="row">
                  <Grid xs={9}>
                    <div>
                      <Text fontWeight={500} fontSize="18px">
                        Баллы за рекомендацию
                      </Text>
                    </div>
                    <div style={{ maxWidth: "340px", minWidth: "340px" }}>
                      <Text fontWeight={300} fontSize="14px">
                        Вознаграждение баллами клиента за друга, пришедшего по
                        рекомендации. Начисляются после первой операции.
                      </Text>
                    </div>
                  </Grid>
                  <Grid xs={3}>
                    <Controller
                      name="recommendCheck"
                      control={control}
                      render={({ field }) => {
                        return (
                          <CustomToggle checked={field.value} {...field} />
                        );
                      }}
                    />
                  </Grid>
                </Grid>
                <Break height={15} />
                {recommendCheck && (
                  <Grid item xs={12}>
                    <RecomendationRow>
                      <Controller
                        control={control}
                        name="awardSizeThird"
                        render={({ field }) => {
                          return (
                            <Input
                              field={field}
                              label={t("awardSize")}
                              width={{ width: "70%" }}
                            />
                          );
                        }}
                      />

                      <Break height={20} />
                      <Controller
                        control={control}
                        name="awardLimit"
                        render={({ field }) => {
                          return (
                            <Input
                              field={field}
                              label={t("awardLimit")}
                              width={{ width: "70%" }}
                            />
                          );
                        }}
                      />
                    </RecomendationRow>
                  </Grid>
                )}
              </AwardGrid>
            </LeftAwardGrid>

            <RightAwardGrid item xs={12} sm={7}>
              {/* Birthday invite balls */}
              <AwardGrid>
                <Grid container xs={12} direction="row">
                  <Grid xs={9}>
                    <div>
                      <Text fontWeight={500} fontSize="18px">
                        Баллы ко дню рождения
                      </Text>
                    </div>
                    <div style={{ maxWidth: "340px", minWidth: "340px" }}>
                      <Text fontWeight={300} fontSize="14px">
                        Автоматическое начисление баллов клиенту ко дню его
                        рождения
                      </Text>
                    </div>
                  </Grid>
                  <Grid xs={3}>
                    <Controller
                      name="birthdayCheck"
                      control={control}
                      render={({ field }) => {
                        return (
                          <CustomToggle checked={field.value} {...field} />
                        );
                      }}
                    />
                  </Grid>
                </Grid>
                <Break height={15} />
                {birthdayCheck && (
                  <Grid container xs={12} direction="row">
                    <Grid
                      container
                      justifyContent="space-between"
                      xs={12}
                      md={4}
                      sm={4}
                    >
                      <Grid item xs={12}>
                        <Controller
                          control={control}
                          name="awardSizeSecond"
                          render={({ field }) => {
                            return (
                              <Input field={field} label={t("awardSize")} />
                            );
                          }}
                        />
                      </Grid>

                      <PayForGrid item xs={12}>
                        <Controller
                          control={control}
                          name="payfor"
                          render={({ field }) => {
                            return (
                              <Input
                                field={field}
                                label={t("payfor")}
                                // aboveLabel="dayTillBirthday"
                              />
                            );
                          }}
                        />
                      </PayForGrid>
                    </Grid>
                    <Grid item sm="auto" md={1} lg={1}></Grid>
                    <TextAreaGrid item xs={12} md={7} sm={7}>
                      <Controller
                        name="description"
                        control={control}
                        render={({ field }) => {
                          return (
                            <Input
                              fullWidth
                              multiline={true}
                              type="textarea"
                              inputStyle={{
                                height: {
                                  mobile: 70,
                                  laptop: 140,
                                  desktop: 190,
                                },
                              }}
                              field={field}
                              label={t("description")}
                            />
                          );
                        }}
                      />
                    </TextAreaGrid>
                  </Grid>
                )}
              </AwardGrid>
              <Break height={40} />

              {/* VIP Ball  */}
              <AwardGrid>
                <Grid container xs={12} direction="row">
                  <Grid xs={9}>
                    <div>
                      <Text fontWeight={500} fontSize="18px">
                        VIP баллы
                      </Text>
                    </div>
                    <div style={{ maxWidth: "340px", minWidth: "340px" }}>
                      <Text fontWeight={300} fontSize="14px">
                        Баллы, которые можно добавить постоянным пользователям
                        для повышения лояльности.
                      </Text>
                    </div>
                  </Grid>
                  <Grid xs={3}>
                    <Controller
                      name="vipCheck"
                      control={control}
                      render={({ field }) => {
                        return (
                          <CustomToggle checked={field.value} {...field} />
                        );
                      }}
                    />
                  </Grid>
                </Grid>
                <Break height={15} />
                {vipCheck && (
                  <Grid container xs={12} direction="row">
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ width: "48%" }}>
                        <Controller
                          name="awardSizeFourth"
                          control={control}
                          render={({ field }) => {
                            return (
                              <Input
                                field={field}
                                width={{ width: "100%" }}
                                label={t("awardSize")}
                              />
                            );
                          }}
                        />
                      </div>
                      <div style={{ width: "48%" }}>
                        <Controller
                          name="ifMoreThan"
                          control={control}
                          render={({ field }) => {
                            return (
                              <Input
                                field={field}
                                width={{ width: "100%" }}
                                label={t("ifMoreThan")}
                              />
                            );
                          }}
                        />
                      </div>
                    </div>
                  </Grid>
                )}
              </AwardGrid>
            </RightAwardGrid>

            <BottomAwardBtnContainer>
              <Button disabled={saveBonus.isLoading} type="submit">
                <SaveIcon />
                <Text marginLeft="15px" color="white">
                  {t("save")}
                </Text>
              </Button>
            </BottomAwardBtnContainer>
          </AwardContainer>
        </Form>
      </AwardWrapper>
    </Flex>
  );
};

export default AwardingSection;
