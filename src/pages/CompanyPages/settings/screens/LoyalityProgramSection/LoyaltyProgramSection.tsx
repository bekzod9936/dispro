import {
  Checkbox,
  makeStyles,
  MenuItem,
  Select,
  Grid,
} from "@material-ui/core";
import { initialFields } from "./constants";
import Input from "components/Custom/Input";
import { useEffect, useState } from "react";
import { Flex } from "styles/BuildingBlocks";
import { LargePanel } from "../../styles/SettingStyles";
import { CustomButton, ModalComponent, Text } from "styles/CustomStyles";
import CustomInput from "components/Custom/CustomInput";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { SaveIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import partnerApi from "services/interceptors/companyInterceptor";
import {
  AddIconSettings,
  DeleteIcon,
} from "assets/icons/SettingsIcons/SettingsPageIcon";
import { COLORS, FONT_SIZE, FONT_WEIGHT } from "services/Types/enums";
import CustomModal from "components/Custom/CustomModal";
import { SyncIcon } from "assets/icons/FeedBackIcons.tsx/FeedbackIcons";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import useLoyality from "./hooks/useLoyality";
import {
  AddIconDiv,
  LeftGrid,
  LevelGrid,
  SelectGrid,
  ThirdContainer,
} from "./styles";
import { RippleDiv } from "components/Custom/RippleEffect/style";

const useStyles = makeStyles({
  select: {
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid " + COLORS.purple, // Semi-transparent underline
    },
    "& .MuiInput-underline": {
      color: COLORS.purple,
    },
  },
});

const LoyaltyProgramSection = () => {
  const classes = useStyles();
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
    append,
    remove,
  } = useLoyality();

  const [swithcState, setSwitchState] = useState("");
  const [switchChange, setSwitchChange] = useState(0);
  const [assertModalVisible, setAssertModalVisible] = useState<boolean>(false);

  const onFormSubmit = async (data: any) => {
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

  useEffect(() => {
    if (active === "cashback") {
      setRefetchCashback(refetchCashback + 1);
    } else if (active === "discount") {
      setRefetchDiscount(refetchDiscount + 1);
    } else if (active === "bonusPoints") {
      setRefetchBonusPoints(refetchBonusPoints + 1);
    }
  }, [active]);

  const onPercentChange = (e: any, item: any) => {
    let copy = [...fields];
    copy[item.id].percent = e.target.value;
    setFileds(copy);
  };

  const handleAddClick = (item: any, index: number) => {
    if (item.id === 0) {
      let copy = [...fields];
      let newObj = {
        id: item.id + 1,
        name: "",
        percent: 0,
        requirements: [
          { type: 1, amount: 0, unit: "UZS", condition: "", id: 1 },
        ],
      };
      copy.push(newObj);
      setFileds(copy);
    } else if (item.id > 0) {
      let existing = fields?.find((value) => item.id === value.id);
      if (existing) {
        let copy = [...fields];
        let newObj = {
          type: 1,
          amount: 0,
          unit: "UZS",
          condition: "and",
          id: item?.requirements.id + 1,
        };
        existing?.requirements.push(newObj);

        copy.splice(item.id, 1, existing);
        setFileds(copy);
      }
    }
  };

  const handleSwitchChange = (checked: boolean, key: any) => {
    if (checked) {
      setActive(key);
      setSwitchChange(switchChange + 1);
    } else if (!checked) {
      setSwitchState("");
    }
  };

  const handleSelectChange = (e: any, item: any, value: any) => {
    let copy = [...fields];

    if (copy[item.id]?.requirements[value.id]) {
      copy[item.id].requirements[value.id].type = e.target.value;
      setFileds(copy);
    }
  };

  const handleDeleteClick = (item: any, index: number) => {
    let finding = fields[item.id];
    let copy = [...fields];
    if (item.id === 0) {
      if (copy.length > 1) {
        copy.pop();
        setFileds(copy);
      }
    } else if (item.id > 0) {
      let reqs = copy[item.id].requirements;
      if (reqs.length > 1) {
        copy[item.id].requirements.pop();
        setFileds(copy);
      }
    }
  };

  const handleConditionChange = (e: any, item: any, value: any) => {
    if (isNaN(e.target.value)) {
      return;
    }
    let copy = [...fields];
    if (copy[item.id]?.requirements[value.id]) {
      copy[item.id].requirements[value.id].condition = e.target.value;
      setFileds(copy);
    }
  };

  const handleChange = (e: any, item: any) => {
    let copy = [...fields];
    if (copy[item.id]) {
      copy[item.id].name = e.target.value;
      setFileds(copy);
    }
  };

  const handleAmountChange = (
    e: any,
    item: any,
    value: any,
    index: number,
    smallIndex: number
  ) => {
    let copy = [...fields];
    if (copy[index]?.requirements[smallIndex]) {
      copy[index].requirements[smallIndex].amount = +e.target.value;
      setFileds(copy);
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

  const handleSaveClick = () => {
    setAssertModalVisible(true);
  };

  const handleChangeClick = () => {
    handleSubmit(onFormSubmit)();
    setAssertModalVisible(false);
  };

  console.log(dynamicFields, "fields");

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
        <LargePanel id="largePanel">
          <form>
            <div>
              {dynamicFields?.map((item: any, index: number) => {
                return (
                  <Grid container spacing={3} justifyContent="space-between">
                    {/* <Controller
                      name="main"
                      control={control}
                      render={({ field }) => {
                        return (
                          <CustomInput
                            onChange={(e: any) => handleChange(e, item)}
                            value={item.name}
                            valuePercent={item.percent}
                            handleAddClick={() => handleAddClick(item, index)}
                            onPercentChange={(e: any) =>
                              onPercentChange(e, item)
                            }
                            handleDeleteClick={() =>
                              handleDeleteClick(item, index)
                            }
                            style={{ width: "95%" }}
                            withPercent
                            label="status_name"
                            aboveInput={
                              item.id === 0 ? "client_statuses" : undefined
                            }
                            aboveLabel={
                              item.id === 0 ? "create_status" : undefined
                            }
                          />
                        );
                      }}
                    /> */}
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
                          name={`levels.${[index]}.name`}
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
                        xs={4}
                      >
                        <Controller
                          name={`levels.${[index]}.percent`}
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
                                laptop: "20px 0 10px",
                              }}
                              message={t("requiredField")}
                              // error={errors.telNumbers?.[index] ? true : false}

                              // maxLength={13}
                            />
                          )}
                        />
                      </LevelGrid>

                      <Grid item xs={2} direction="row" alignItems="flex-end">
                        <ThirdContainer>
                          <AddIconDiv>
                            <RippleDiv
                              onClick={() =>
                                append({
                                  requirements: {
                                    amount: 15000000,
                                    condition: "",
                                    type: 1,
                                    unit: "",
                                  },
                                })
                              }
                              marginLeft={0}
                              marginRight={0}
                            >
                              <AddIconSettings />
                            </RippleDiv>
                          </AddIconDiv>
                        </ThirdContainer>
                      </Grid>
                    </Grid>

                    {/* //Requirements section */}
                    {item?.requirements?.map(
                      (value: any, smallIndex: number) => {
                        return (
                          <Grid
                            container
                            spacing={3}
                            justifyContent="space-between"
                          >
                            <SelectGrid alignItems="flex-end" item xs={2}>
                              <Select
                                //  color={COLORS.purple}
                                className={classes.select}
                                style={{
                                  marginLeft: "15px",
                                  borderColor: COLORS.purple,
                                }}
                                value={
                                  fields[index]?.requirements[smallIndex]
                                    ?.condition
                                }
                                onChange={(e) =>
                                  handleConditionChange(e, item, value)
                                }
                              >
                                <MenuItem value="and">{t("and")}</MenuItem>
                                <MenuItem value="or">{t("or")}</MenuItem>
                                <MenuItem value="">{t("")}</MenuItem>
                              </Select>
                            </SelectGrid>
                            <SelectGrid alignItems="flex-end" item xs={4}>
                              <Select
                                style={{
                                  marginLeft: "15px",
                                  width: "140px",
                                  borderColor: COLORS.purple,
                                }}
                                className={classes.select}
                                value={
                                  fields[index]?.requirements[smallIndex]?.type
                                }
                                onChange={(e) =>
                                  handleSelectChange(e, item, value)
                                }
                              >
                                <MenuItem value={1}>
                                  {t("purchaseSum")}
                                </MenuItem>
                                <MenuItem value={2}>
                                  {t("companyVisits")}
                                </MenuItem>
                                <MenuItem value={3}>
                                  {t("recomendations")}
                                </MenuItem>
                              </Select>
                            </SelectGrid>

                            <Grid
                              item
                              xs={6}
                              direction="row"
                              justifyContent="center"
                            >
                              <div>{t("more")}</div>
                              <Input
                                name="base_level.name"
                                type="number"
                                variant="standard"
                                // value={
                                //   fields[index]?.requirements[smallIndex]
                                //     ?.amount
                                // }
                                // className={classes.select}
                                onChange={(e) =>
                                  handleAmountChange(
                                    e,
                                    item,
                                    value,
                                    index,
                                    smallIndex
                                  )
                                }
                                // style={{
                                //   width: "140px",
                                //   marginLeft: "15px",
                                //   borderColor: COLORS.purple,
                                // }}
                                // renderSuffix={() => <span></span>}
                              />
                            </Grid>
                          </Grid>
                        );
                      }
                    )}
                  </Grid>
                );
              })}
            </div>

            <div>
              <Controller
                name="max_percent"
                control={control}
                render={({ field }) => {
                  return (
                    <CustomInput
                      field={field}
                      label="max_percent"
                      style={{ width: "80%" }}
                    />
                  );
                }}
              />
              {active === "cashback" && (
                <div>
                  <div>
                    <Controller
                      name="give_cashback_after"
                      control={control}
                      render={({ field }) => {
                        return (
                          <CustomInput
                            field={field}
                            label="give_cashback_after"
                            style={{ width: "80%" }}
                          />
                        );
                      }}
                    />
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <div>
                      <Text marginLeft="5px">{t("p2p")}</Text>
                    </div>
                    <div>
                      <Checkbox />{" "}
                      <Text marginLeft="15px" fontSize="16px" fontWeight={400}>
                        {t("useLoyaltyProgram")}
                      </Text>
                    </div>
                    <div>
                      <Checkbox />
                      <Text marginLeft="15px" fontSize="16px" fontWeight={400}>
                        {t("substractingPoints")}
                      </Text>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
          <div style={{ marginTop: "20px" }}>
            <CustomButton type="button" onClick={handleSaveClick}>
              <SaveIcon />
              <Text marginLeft="10px" color="white">
                {t("save")}
              </Text>
            </CustomButton>
          </div>
        </LargePanel>
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
