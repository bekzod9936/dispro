import { Grid } from "@material-ui/core";
import { switchItems } from "./constants";
import Input from "components/Custom/Input";
import { useState } from "react";
import { Flex } from "styles/BuildingBlocks";
import { LargePanel } from "../../styles/SettingStyles";
import { CustomButton, ModalComponent, Text } from "styles/CustomStyles";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { SaveIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import partnerApi from "services/interceptors/companyInterceptor";
import { AddIconSettings } from "assets/icons/SettingsIcons/SettingsPageIcon";
import { ReactComponent as RemoveIconSettings } from "assets/icons/delete_level.svg";
import { ReactComponent as PercentIcon } from "assets/icons/percent_icon.svg";
import { FONT_SIZE, FONT_WEIGHT } from "services/Types/enums";
import CustomModal from "components/Custom/CustomModal";
import { SyncIcon } from "assets/icons/FeedBackIcons.tsx/FeedbackIcons";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import useLoyality, { FormProps } from "./hooks/useLoyality";
import { RippleDiv } from "components/Custom/RippleEffect/style";
import NestedArray from "./components/NestedArray";
import Checkbox from "components/Custom/CheckBox";
import {
  AddIconDiv,
  LeftGrid,
  LevelGrid,
  ProgramRow,
  ThirdContainer,
  RemoveIconDiv,
  HeaderGrid,
  PercentDiv,
  Form,
} from "./styles";
import Spinner from "components/Helpers/Spinner";
import { useMutation } from "react-query";
import Button from "components/Custom/Button";
import RippleEffect from "components/Custom/RippleEffect";

const LoyaltyProgramSection = () => {
  const { t } = useTranslation();
  const {
    control,
    active,
    setValue,
    handleSwitchChange,
    handleSubmit,
    dynamicFields,
    getValues,
    append,
    remove,
    isLoading,
    cashbackLoading,
    discountLoading,
    useProgram,
    usePoint,
    loayalityChange,
    onFormSubmit,
    loayalityPut,
  } = useLoyality();

  const [assertModalVisible, setAssertModalVisible] = useState<boolean>(false);
  const [switchKey, setSwitchKey] = useState("discount");

  //save loyality

  const onError = (errors: any, e: any) => console.log(errors, e);

  return (
    <Grid container spacing={3} justifyContent="space-between">
      <LeftGrid item xs={5}>
        <Flex
          flexDirection="column"
          justifyContent="start"
          margin="0px"
          alignItems="flex-start"
        >
          {switchItems.map((item) => {
            return (
              <Flex
                key={item.key}
                // width="100%"
                justifyContent="space-between"
                margin="0px 0px 35px 0px"
                alignItems="flex-start"
              >
                <Flex
                  flexDirection={"column"}
                  justifyContent="start"
                  alignItems="flex-start"
                  margin="0"
                >
                  <CustomToggle
                    checked={item.key === active}
                    disabled={item.key === active}
                    onChange={(checked: any) => {
                      console.log(item.key, "item key");
                      setAssertModalVisible(true);
                      setSwitchKey(item.key);
                    }}
                  />
                </Flex>

                <Flex
                  margin="0 0 0 20px"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <div style={{}}>
                    <Text fontSize="18px" fontWeight={500}>
                      {item.title}
                    </Text>
                  </div>
                  <div style={{ marginTop: "5px", width: "290px" }}>
                    <Text fontSize="14px" fontWeight={300}>
                      {item.text}
                    </Text>
                  </div>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </LeftGrid>

      <Grid item xs={7}>
        {!isLoading &&
        !cashbackLoading &&
        !discountLoading &&
        !loayalityChange.isLoading ? (
          <LargePanel id="largePanel">
            <Form onSubmit={handleSubmit(onFormSubmit, onError)}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={3}
                xs={12}
              >
                <HeaderGrid item xs={6}>
                  <Controller
                    name={`base_name`}
                    rules={{
                      required: false,
                    }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        label={t("status_name")}
                        type="string"
                        field={field}
                        message={t("requiredField")}
                      />
                    )}
                  />
                </HeaderGrid>

                <LevelGrid direction="row" alignItems="center" item xs={6}>
                  <Controller
                    name={`base_percent`}
                    rules={{
                      required: false,
                    }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        label={""}
                        type="string"
                        field={field}
                        width={{
                          width: "106px",
                        }}
                        margin={{
                          laptop: "20px 0 0",
                        }}
                        IconEnd={
                          <PercentDiv>
                            <PercentIcon />
                          </PercentDiv>
                        }
                        message={t("requiredField")}
                        // error={errors.telNumbers?.[index] ? true : false}

                        // maxLength={13}
                      />
                    )}
                  />
                  <ThirdContainer>
                    <AddIconDiv>
                      <RippleDiv
                        onClick={() => {
                          console.log(...getValues().levels, "levels get");
                          append({
                            name: "new_row",
                            percent: 15,
                            requirements: [
                              {
                                amount: 100,
                                condition: "",
                                type: 1,
                                unit: "UZS",
                              },
                            ],
                          });
                          // {
                          //   name: "",
                          //   percent: 0,
                          //   requirements: [
                          //     {
                          //       amount: 0,
                          //       condition: "or",
                          //       unit: 0,
                          //       type: 3,
                          //     },
                          //   ],
                          // }
                          // setValue("levels", [
                          //   {
                          //     name: "",
                          //     percent: 0,
                          //     requirements: [
                          //       {
                          //         amount: 0,
                          //         condition: "and",
                          //         unit: 0,
                          //         type: 3,
                          //       },
                          //     ],
                          //   },
                          //   ...getValues().levels,
                          // ]);
                        }}
                        marginLeft={0}
                        marginRight={0}
                      >
                        <AddIconSettings />
                      </RippleDiv>
                    </AddIconDiv>
                  </ThirdContainer>
                </LevelGrid>
              </Grid>
              <div style={{ height: "25px" }} />
              {dynamicFields?.length > 0 &&
                dynamicFields?.map((item: any, index: number) => {
                  return (
                    <ProgramRow
                      container
                      spacing={3}
                      key={index}
                      justifyContent="space-between"
                      alignItems="flex-end"
                    >
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={3}
                        xs={12}
                      >
                        <Grid item xs={6}>
                          <Controller
                            name={`levels.${index}.name`}
                            rules={{
                              required: false,
                            }}
                            defaultValue={item?.name || ""}
                            control={control}
                            render={({ field }) => (
                              <Input
                                label={t("status_name")}
                                type="string"
                                field={field}
                                margin={{
                                  laptop: "20px 0 10px",
                                }}
                                message={t("requiredField")}
                                // error={errors.telNumbers?.[index] ? true : false}

                                // maxLength={13}
                              />
                            )}
                          />
                        </Grid>

                        <LevelGrid
                          direction="row"
                          alignItems="flex-end"
                          item
                          xs={6}
                        >
                          <Controller
                            name={`levels.${index}.percent`}
                            rules={{
                              required: false,
                            }}
                            control={control}
                            defaultValue={item?.percent}
                            render={({ field }) => (
                              <Input
                                label={""}
                                type="string"
                                field={field}
                                width={{
                                  width: "106px",
                                }}
                                margin={{
                                  laptop: "30px 0 0",
                                }}
                                IconEnd={
                                  <PercentDiv>
                                    <PercentIcon />
                                  </PercentDiv>
                                }
                                message={t("requiredField")}
                                // error={errors.telNumbers?.[index] ? true : false}

                                // maxLength={13}
                              />
                            )}
                          />
                          <ThirdContainer>
                            <AddIconDiv bgContain={false}>
                              <RippleDiv
                                onClick={() => {
                                  append({
                                    name: "new_row",
                                    percent: 5,
                                    requirements: [
                                      {
                                        amount: 100,
                                        condition: "",
                                        type: 1,
                                        unit: "UZS",
                                      },
                                    ],
                                  });
                                  // {
                                  //   name: "new_level",
                                  //   percent: 0,
                                  //   requirements: [
                                  //     {
                                  //       amount: 0,
                                  //       condition: "and",
                                  //       unit: 0,
                                  //       type: 3,
                                  //     },
                                  //   ],
                                  // }
                                  // setValue("levels", [
                                  //   {
                                  //     name: "",
                                  //     percent: 0,
                                  //     requirements: [
                                  //       {
                                  //         amount: 0,
                                  //         condition: "and",
                                  //         unit: 0,
                                  //         type: 3,
                                  //       },
                                  //     ],
                                  //   },
                                  //   ...getValues().levels,
                                  // ]);
                                }}
                                marginLeft={0}
                                marginRight={0}
                              >
                                <AddIconSettings />
                              </RippleDiv>
                            </AddIconDiv>
                          </ThirdContainer>

                          <ThirdContainer>
                            <RemoveIconDiv
                              onClick={() => {
                                console.log(index, "index remove");
                                remove(index);
                                setValue(
                                  "levels",
                                  dynamicFields.filter(
                                    (item: any, indexV: number) =>
                                      indexV !== index
                                  )
                                );
                              }}
                            >
                              <RippleDiv>
                                <RemoveIconSettings />
                              </RippleDiv>
                            </RemoveIconDiv>
                          </ThirdContainer>
                        </LevelGrid>
                      </Grid>

                      {/* //Requirements section */}

                      <NestedArray
                        index={index}
                        control={control}
                        getValues={getValues}
                        setValue={setValue}
                      />
                    </ProgramRow>
                  );
                })}
              <div style={{ height: "25px" }} />
              <Grid
                container
                direction="column"
                alignItems="flex-start"
                justifyContent="space-between"
                spacing={3}
                xs={12}
              >
                <HeaderGrid item xs={6}>
                  <Controller
                    name="max_percent"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          label={t("max_percent")}
                          type="string"
                          field={field}
                          message={t("requiredField")}
                        />
                      );
                    }}
                  />
                </HeaderGrid>
                {active === "cashback" && (
                  <HeaderGrid item xs={6}>
                    <div>
                      <div>
                        <Controller
                          name="give_cashback_after"
                          control={control}
                          render={({ field }) => {
                            return (
                              <Input
                                field={field}
                                label={t("give_cashback_after")}
                                message={t("requiredField")}
                              />
                            );
                          }}
                        />
                      </div>
                    </div>
                  </HeaderGrid>
                )}
                <HeaderGrid>
                  <div style={{ marginTop: "20px" }}>
                    <div>
                      <Text marginLeft="5px">{t("p2p")}</Text>
                    </div>
                    <div>
                      <Controller
                        name="useProgram"
                        control={control}
                        defaultValue={useProgram}
                        render={({ field }) => (
                          <Checkbox
                            {...field}
                            checked={useProgram}
                            label={t("useLoyaltyProgram")}
                          />
                        )}
                      />{" "}
                    </div>
                    <div>
                      <Controller
                        name="usePoint"
                        control={control}
                        defaultValue={usePoint}
                        render={({ field }) => (
                          <Checkbox
                            {...field}
                            checked={usePoint}
                            label={t("substractingPoints")}
                          />
                        )}
                      />
                    </div>
                  </div>
                </HeaderGrid>
                <HeaderGrid item xs={6}>
                  <div style={{ marginTop: "20px" }}>
                    <Button
                      type="submit"
                      startIcon={<SaveIcon />}
                      disabled={loayalityPut.isLoading}
                      //  onClick={handleSaveClick}
                    >
                      <Text marginLeft="10px" color="white">
                        {t("save")}
                      </Text>
                    </Button>
                  </div>
                </HeaderGrid>
              </Grid>
            </Form>
          </LargePanel>
        ) : (
          <Spinner />
        )}

        <CustomModal open={assertModalVisible}>
          <ModalComponent>
            <div style={{ maxWidth: "370px" }}>
              <Text
                fontSize={FONT_SIZE.modalTitle}
                fontWeight={FONT_WEIGHT.modalTitle}
              >
                Вы действительно хотите поменять программу лояльности?
              </Text>
            </div>
            <div style={{ maxWidth: "370px" }}>
              <Text
                fontSize={FONT_SIZE.modalText}
                fontWeight={FONT_WEIGHT.modalText}
              >
                При изменении программы лояльности статусы ваших клиентов
                обнулятся, что может привести к негативной реакции.
              </Text>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                justifyContent: "flex-end",
                width: "100%",
                alignItems: "center",
              }}
            >
              <RippleEffect>
                <CustomButton
                  background="white"
                  onClick={() => {
                    setAssertModalVisible(false);
                  }}
                >
                  <CancelIcon />
                  <div style={{ width: "15px" }} />
                  <Text>{t("cancel")}</Text>
                </CustomButton>
              </RippleEffect>

              <Button
                onClick={() => {
                  console.log("clicked", switchKey);
                  handleSwitchChange(true, switchKey);
                  setAssertModalVisible(false);
                }}
                startIcon={<SyncIcon />}
                type="button"
              >
                <Text color="white">{t("change")}</Text>
              </Button>
            </div>
          </ModalComponent>
        </CustomModal>
      </Grid>
    </Grid>
  );
};

export default LoyaltyProgramSection;
