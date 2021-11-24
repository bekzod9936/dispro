import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import Spinner from "components/Helpers/Spinner";
import Grid from "@material-ui/core/Grid";
import SaveButton from "pages/CompanyPages/settings/components/SaveButton";
import InputFormat from "components/Custom/InputFormat";
import Input from "components/Custom/Input";
import CustomToggle from "components/Custom/CustomToggleSwitch";

//assets and styles
import { Text } from "styles/CustomStyles";
import { Break, SpinnerDiv } from "../../styles";
import {
  AwardContainer,
  BottomAwardBtnContainer,
  Form,
  LeftAwardGrid,
  RightAwardGrid,
  ControlGrid,
  AwardGrid,
  RecomendationRow,
  TextAreaGrid,
  PayForGrid,
  UpSide,
  DownSide,
  Wrapper,
} from "./styles";
//hooks
import useAwards from "./hooks/useAwards";
import useScroll from "services/hooks/useScroll";
import useWindowWidth from "services/hooks/useWindowWidth";

const AwardingSection = () => {
  const { t } = useTranslation();
  const { height, handleScroll } = useScroll({
    initialHeight: 15,
    nextHeight: 0,
    scrollTop: 10,
  });
  const { width } = useWindowWidth();
  const bgInput = width < 1000 ? "transparent" : "#fff";

  const {
    control,
    handleSubmit,
    onFormSubmit,
    inviteCheck,
    recommendCheck,
    vipCheck,
    birthdayCheck,
    saveBonus,
    isLoading,
  } = useAwards();

  if (isLoading) {
    return (
      <SpinnerDiv>
        <Spinner />
      </SpinnerDiv>
    );
  }
  return (
    <Form
      pTop={height}
      onScroll={handleScroll}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <UpSide>
        <AwardContainer>
          <Wrapper>
            <LeftAwardGrid>
              <AwardGrid>
                <Grid
                  container
                  xs={12}
                  sm={12}
                  md={10}
                  lg={10}
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
                  <Grid container justifyContent="flex-end" xs={2}>
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
                <Break height={10} />
                {inviteCheck && (
                  <ControlGrid container xs={12} sm={12} md={8} lg={8}>
                    <Controller
                      control={control}
                      rules={{
                        min: 1,
                      }}
                      name="awardSizeFirst"
                      render={({ field }) => {
                        return (
                          <InputFormat
                            field={field}
                            width={{ width: "100%" }}
                            label={t("awardSize")}
                            maxLength={11}
                            inputStyle={{
                              bgcolor: bgInput,
                            }}
                          />
                        );
                      }}
                    />
                  </ControlGrid>
                )}
              </AwardGrid>
              <Break height={50} />

              <AwardGrid>
                <Grid
                  container
                  xs={12}
                  sm={12}
                  md={10}
                  lg={10}
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  <Grid xs={10}>
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
                  <Grid container justifyContent="flex-end" xs={2}>
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
                  <Grid container xs={12} sm={12} md={8} lg={8}>
                    <RecomendationRow>
                      <Controller
                        control={control}
                        name="awardSizeThird"
                        render={({ field }) => {
                          return (
                            <InputFormat
                              field={field}
                              label={t("awardSize")}
                              width={{ width: "100%" }}
                              maxLength={11}
                              inputStyle={{
                                bgcolor: bgInput,
                              }}
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
                            <InputFormat
                              field={field}
                              label={t("awardLimit")}
                              width={{ width: "100%" }}
                              maxLength={11}
                              inputStyle={{
                                bgcolor: bgInput,
                              }}
                            />
                          );
                        }}
                      />
                    </RecomendationRow>
                  </Grid>
                )}
              </AwardGrid>
            </LeftAwardGrid>

            <RightAwardGrid>
              <AwardGrid>
                <Grid
                  container
                  xs={12}
                  sm={12}
                  md={10}
                  lg={10}
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  <Grid xs={10}>
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
                  <Grid container justifyContent="flex-end" xs={2}>
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
                  <Grid container justifyContent="space-between" xs={12}>
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
                              <InputFormat
                                field={field}
                                label={t("awardSize")}
                                maxLength={11}
                                inputStyle={{
                                  bgcolor: bgInput,
                                }}
                              />
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
                              <InputFormat
                                field={field}
                                label={t("payfor")}
                                maxLength={11}
                                inputStyle={{
                                  bgcolor: bgInput,
                                }}
                                // aboveLabel="dayTillBirthday"
                              />
                            );
                          }}
                        />
                      </PayForGrid>
                    </Grid>
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
                                bgcolor: bgInput,
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

              <AwardGrid>
                <Grid
                  container
                  xs={12}
                  sm={12}
                  md={10}
                  lg={10}
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  <Grid xs={10}>
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
                  <Grid container justifyContent="flex-end" xs={2}>
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
                  <Grid container spacing={2} xs={12} direction="row">
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Controller
                        name="awardSizeFourth"
                        control={control}
                        render={({ field }) => {
                          return (
                            <InputFormat
                              field={field}
                              width={{ width: "100%" }}
                              label={t("awardSize")}
                              maxLength={11}
                              inputStyle={{
                                bgcolor: bgInput,
                              }}
                            />
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Controller
                        name="ifMoreThan"
                        control={control}
                        render={({ field }) => {
                          return (
                            <InputFormat
                              field={field}
                              width={{ width: "100%" }}
                              label={t("ifMoreThan")}
                              maxLength={11}
                              inputStyle={{
                                bgcolor: bgInput,
                              }}
                            />
                          );
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
              </AwardGrid>
            </RightAwardGrid>
          </Wrapper>
        </AwardContainer>
      </UpSide>
      <DownSide>
        <BottomAwardBtnContainer>
          <SaveButton
            type="submit"
            disabled={saveBonus.isLoading}
            text={t("save")}
          />
        </BottomAwardBtnContainer>
      </DownSide>
    </Form>
  );
};

export default AwardingSection;
