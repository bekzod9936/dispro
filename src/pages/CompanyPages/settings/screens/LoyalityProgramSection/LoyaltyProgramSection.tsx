import { Grid } from "@material-ui/core";
import { initialFields } from "./constants";
import Input from "components/Custom/Input";
import { useEffect, useState } from "react";
import { Flex } from "styles/BuildingBlocks";
import { LargePanel } from "../../styles/SettingStyles";
import { CustomButton, ModalComponent, Text } from "styles/CustomStyles";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { SaveIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import partnerApi from "services/interceptors/companyInterceptor";
import { AddIconSettings } from "assets/icons/SettingsIcons/SettingsPageIcon";
import { ReactComponent as RemoveIconSettings } from "assets/icons/delete_level.svg";
import { FONT_SIZE, FONT_WEIGHT } from "services/Types/enums";
import CustomModal from "components/Custom/CustomModal";
import { SyncIcon } from "assets/icons/FeedBackIcons.tsx/FeedbackIcons";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import useLoyality from "./hooks/useLoyality";
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
} from "./styles";
import Spinner from "components/Helpers/Spinner";

const LoyaltyProgramSection = () => {
  const { t } = useTranslation();
  const {
    control,
    fields,
    active,
    refetchBonusPoints,
    refetchCashback,
    refetchDiscount,
    setValue,
    setRefetchCashback,
    setRefetchDiscount,
    setRefetchBonusPoints,
    setFileds,
    handleSubmit,
    setActive,
    dynamicFields,
    getValues,
    append,
    prepend,
    remove,
    isLoading,
  } = useLoyality();

  const [swithcState, setSwitchState] = useState("");
  const [switchChange, setSwitchChange] = useState(0);
  const [assertModalVisible, setAssertModalVisible] = useState<boolean>(false);

  const onFormSubmit = async (data: any) => {
    console.log(data, "data");
    let copy = [...fields];
    copy.splice(0, 1);
    try {
      if (active === "discount") {
        const res = await partnerApi.put("/bonus/discounts", {
          cashbackReturnedDay: 0,
          description: "",
          isActive: true,
          levels: copy,
          maxAmount: data.max_percent,
          name: fields[0].name,
          percent: fields[0].percent,
        });
      } else if (active === "cashback") {
        const res = await partnerApi.put("/bonus/cashbacks", {
          cashbackReturnedDay: data.give_cashback_after || 0,
          description: "",
          isActive: true,
          levels: copy,
          maxAmount: data.max_percent,
          name: fields[0].name,
          percent: fields[0].percent,
        });
      } else if (active === "bonusPoints") {
        const res = await partnerApi.put("/bonus/bonuspoints", {
          cashbackReturnedDay: 0,
          description: "",
          isActive: true,
          levels: copy,
          maxAmount: data.max_percent,
          name: fields[0].name,
          percent: fields[0].percent,
        });
      }
      //alert("Goood");
    } catch (err) {
      alert(err);
    }
  };

  const onError = (errors: any, e: any) => console.log(errors, e);

  useEffect(() => {
    if (active === "cashback") {
      setRefetchCashback(refetchCashback + 1);
    } else if (active === "discount") {
      setRefetchDiscount(refetchDiscount + 1);
    } else if (active === "bonusPoints") {
      setRefetchBonusPoints(refetchBonusPoints + 1);
    }
  }, [active]);

  const handleSwitchChange = (checked: boolean, key: any) => {
    if (checked) {
      setActive(key);
      setSwitchChange(switchChange + 1);
    } else if (!checked) {
      setSwitchState("");
    }
  };

  useEffect(() => {
    if (switchChange > 0) {
      setFileds(initialFields);
      setValue("max_percent", "");
    }
  }, [switchChange]);

  const switchItems = [
    {
      title: "Предоставление скидки",
      text: "Клиент получает скидку при каждой покупке в размере определенного %",
      key: "discount",
    },
    {
      title: "Предоставление кешбэка",
      text: "Клиент получает кешбэк в виде реальных денег после каждой покупки",
      key: "cashback",
    },
    {
      title: "Предоставление баллов",
      text: "Клиент получает баллы после каждой покупки которые может потратить только у вас в компании",
      key: "bonusPoints",
    },
  ];

  const handleChangeClick = () => {
    handleSubmit(onFormSubmit)();
    setAssertModalVisible(false);
  };

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
                    onChange={(checked: any) => {
                      handleSwitchChange(checked.target.checked, item.key);
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
        {!isLoading ? (
          <LargePanel id="largePanel">
            <form onSubmit={handleSubmit(onFormSubmit, onError)}>
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
                      required: true,
                      maxLength: 13,
                      minLength: 13,
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
                      required: true,
                      maxLength: 13,
                      minLength: 13,
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
                          prepend(
                            {
                              name: "",
                              percent: 0,
                              requirements: [
                                {
                                  amount: 0,
                                  condition: "or",
                                  unit: 0,
                                  type: 3,
                                },
                              ],
                            },
                            { focusIndex: 0 }
                          );
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
                              required: true,
                              maxLength: 13,
                              minLength: 13,
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
                              required: true,
                              maxLength: 13,
                              minLength: 13,
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
                                  laptop: "30px 0 0",
                                }}
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
                                  prepend(
                                    {
                                      name: "",
                                      percent: 0,
                                      requirements: [
                                        {
                                          amount: 0,
                                          condition: "and",
                                          unit: 0,
                                          type: 3,
                                        },
                                      ],
                                    },
                                    { focusIndex: 0 }
                                  );
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
                        name="useProgramLoyality"
                        control={control}
                        render={({ field }) => (
                          <Checkbox {...field} label={t("useLoyaltyProgram")} />
                        )}
                      />{" "}
                    </div>
                    <div>
                      <Checkbox
                        name="useBonus"
                        label={t("substractingPoints")}
                      />
                    </div>
                  </div>
                </HeaderGrid>
                <HeaderGrid item xs={6}>
                  <div style={{ marginTop: "20px" }}>
                    <CustomButton
                      type="submit"
                      //  onClick={handleSaveClick}
                    >
                      <SaveIcon />
                      <Text marginLeft="10px" color="white">
                        {t("save")}
                      </Text>
                    </CustomButton>
                  </div>
                </HeaderGrid>
              </Grid>
            </form>
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
              <CustomButton
                background="white"
                onClick={() => setAssertModalVisible(false)}
              >
                <CancelIcon />
                <Text>{t("cancel")}</Text>
              </CustomButton>

              <CustomButton type="button">
                <SyncIcon />
                <Text color="white" onClick={handleChangeClick}>
                  {t("change")}
                </Text>
              </CustomButton>
            </div>
          </ModalComponent>
        </CustomModal>
      </Grid>
    </Grid>
  );
};

export default LoyaltyProgramSection;
