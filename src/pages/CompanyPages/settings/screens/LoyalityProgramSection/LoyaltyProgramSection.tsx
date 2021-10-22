import { Grid, IconButton } from "@material-ui/core";
import { switchItems } from "./constants";
import Input from "components/Custom/Input";
import { useState } from "react";
import { Flex } from "styles/BuildingBlocks";
import { LargePanel } from "../../styles/SettingStyles";
import { CustomButton, ModalComponent, Text } from "styles/CustomStyles";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { SaveIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import { AddIconSettings } from "assets/icons/SettingsIcons/SettingsPageIcon";
import { ReactComponent as RemoveIconSettings } from "assets/icons/delete_level.svg";
import { ReactComponent as PercentIcon } from "assets/icons/percent_icon.svg";
import { ReactComponent as Close } from "assets/icons/IconsInfo/close.svg";
import { FONT_SIZE, FONT_WEIGHT } from "services/Types/enums";
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
  PercentDiv,
  Form,
  ModalTitle,
  ModalBody,
  LoyalDiv,
  BtnContainer,
  CloseBtn,
} from "./styles";
import Spinner from "components/Helpers/Spinner";
import Button from "components/Custom/Button";
import RippleEffect from "components/Custom/RippleEffect";
import NotifySnack from "components/Custom/Snackbar";
import { useAppSelector } from "services/redux/hooks";
import MFormatInput from "components/Custom/MoneyInput";
import { numberWith } from "services/utils";
import Modal from "components/Custom/Modal";
import Radio from "components/Custom/Radio";

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
    loayalityChange,
    onFormSubmit,
    loayalityPut,
    onSuccesSave,
    setOnSuccessSave,
    onErrorSave,
    setOnErrorSave,
    errors,
    alertName,
    checkL,
    setCheckL,
    modified,
    setModified,
    activeCheck,
    setActiveCheck,
    availCheck,
  } = useLoyality();

  console.log("active", active);

  const base_loyality = useAppSelector((state) => state.settings.base_loyality);
  const usePoint: boolean = useAppSelector(
    (state) => state.loyalitySlice.usePoint
  );
  const useProgram: boolean = useAppSelector(
    (state) => state.loyalitySlice.useProgram
  );

  const [assertModalVisible, setAssertModalVisible] = useState<boolean>(false);
  const [switchKey, setSwitchKey] = useState("discount");

  //save loyality

  const onError = (errors: any, e: any) => console.log(errors, e);

  return (
    <Grid container spacing={3} justifyContent="space-between">
      <LeftGrid item xs={12} sm={5}>
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
                      if (availCheck) {
                        setAssertModalVisible(true);
                        setSwitchKey(item.key);
                      } else {
                        setActiveCheck(item?.key);
                      }
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

      {active === "" && activeCheck === "" ? (
        <Grid item xs={12} sm={7}>
          Vibrite programma loyalnost
        </Grid>
      ) : (
        <Grid item xs={12} sm={7}>
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
                        required: true,
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
                        max: 100,
                        min: 0,
                      }}
                      defaultValue={base_loyality?.base_percent}
                      control={control}
                      render={({ field }) => (
                        <MFormatInput
                          label={""}
                          type="string"
                          defaultValue={base_loyality?.base_percent}
                          {...field}
                          onChange={(e: any) => {
                            field.onChange(e.target.value);
                          }}
                          maxLength={3}
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
                          error={errors.base_percent}

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
                                required: true,
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
                                  error={
                                    errors.levels?.[index]?.name ? true : false
                                  }

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
                                max: 100,
                                min: 0,
                              }}
                              control={control}
                              defaultValue={numberWith(item?.percent, " ")}
                              render={({ field }) => (
                                <MFormatInput
                                  label={""}
                                  defaultValue={numberWith(item?.percent, " ")}
                                  type="string"
                                  {...field}
                                  value={field?.value?.textmask}
                                  onChange={(e) => {
                                    field.onChange(e.target.value);
                                  }}
                                  maxLength={3}
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
                                  message={
                                    errors.levels?.[index]?.percent?.type ===
                                    "max"
                                      ? "maksimal 100%"
                                      : t("requiredField")
                                  }
                                  error={
                                    errors.levels?.[index]?.percent
                                      ? true
                                      : false
                                  }

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
                      rules={{
                        required: true,
                      }}
                      defaultValue={base_loyality?.max_percent}
                      render={({ field }) => {
                        return (
                          <MFormatInput
                            label={t("max_percent")}
                            defaultValue={base_loyality?.max_percent}
                            type="string"
                            {...field}
                            value={field.value}
                            message={t("requiredField")}
                            error={errors.max_percent?.type === "required"}
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
                            rules={{
                              required: true,
                            }}
                            defaultValue={base_loyality?.give_cashback_after}
                            render={({ field }) => {
                              return (
                                <MFormatInput
                                  field={field}
                                  label={t("give_cashback_after")}
                                  defaultValue={
                                    base_loyality?.give_cashback_after
                                  }
                                  error={
                                    errors.give_cashback_after?.type ===
                                    "required"
                                  }
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
        </Grid>
      )}
      <Modal open={assertModalVisible}>
        <ModalComponent>
          <ModalTitle>
            <Text fontSize={FONT_SIZE.large} fontWeight={FONT_WEIGHT.bold}>
              Выберите тип замены программы лояльности?
            </Text>

            <IconButton
              onClick={() => {
                setAssertModalVisible(false);
              }}
            >
              <Close />
            </IconButton>
          </ModalTitle>
          <ModalBody>
            <Text
              fontSize={FONT_SIZE.mediumPlus}
              fontWeight={FONT_WEIGHT.modalText}
              marginBottom={"25px"}
            >
              При изменении программы лояльности Вы можете обнулить статусы
              ваших клиентов или заменить программу лояльности, сохранив статусы
              клиентов.
            </Text>
            <LoyalDiv>
              <Radio
                flexDirection="column"
                list={[
                  {
                    value: "1",
                    label: `Обнулить статусы клиентов при замене лояльности`,
                  },
                  {
                    value: "2",
                    label: `Сохранить статусы клиентов при замене лояльности`,
                  },
                ]}
                title={""}
                onChange={(v: any) => setModified(v)}
                value={modified}
              />
            </LoyalDiv>
          </ModalBody>
          <BtnContainer>
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
              disabled={modified === "0"}
              startIcon={<SyncIcon />}
              type="button"
            >
              <Text color="white">{t("change")}</Text>
            </Button>
          </BtnContainer>
        </ModalComponent>
      </Modal>
      <NotifySnack
        open={checkL}
        error={true}
        vertical="bottom"
        horizontal="right"
        message={alertName}
        handleClose={() => {
          setCheckL(false);
        }}
      />
      <NotifySnack
        open={onSuccesSave}
        vertical="top"
        horizontal="center"
        message="Сохранено"
        handleClose={() => {
          setOnSuccessSave(false);
        }}
      />
      <NotifySnack
        open={onErrorSave}
        vertical="bottom"
        horizontal="right"
        message="Error"
        handleClose={() => {
          setOnErrorSave(false);
        }}
      />
    </Grid>
  );
};

export default LoyaltyProgramSection;
