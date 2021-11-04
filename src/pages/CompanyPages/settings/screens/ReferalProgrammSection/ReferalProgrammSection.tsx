import useReferalData from "./hooks/useReferalData";
import { ReferalScroll, SmallPanel } from "../../styles/SettingStyles";
import { Text } from "styles/CustomStyles";
import { useTranslation } from "react-i18next";
import { Controller, useFieldArray } from "react-hook-form";
import TwoUsers from "../../components/TwoUsers";
import { SaveIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import {
  AddIconSettings,
  XIcon,
} from "assets/icons/SettingsIcons/SettingsPageIcon";
import { ThreeHeadIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import { COLORS, FONT_SIZE } from "services/Types/enums";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import { BottomBtnContainer } from "../../styles/index";
import {
  GridContainer,
  LeftGrid,
  LevelsColumn,
  LevelsHead,
  LevelsRow,
  RightGrid,
  LevelsCard,
  Form,
  ReferalCol,
  TextDiv,
  HeaderReferal,
  ActDiv,
  AddDiv,
} from "./styles";
import Button from "components/Custom/Button";
import RippleEffect from "components/Custom/RippleEffect";
import NotifySnack from "components/Custom/Snackbar";
import InputFormat from "components/Custom/InputFormat";

const ReferalProgrammSection = () => {
  const { t } = useTranslation();
  const {
    checkedState,
    control,
    handleSave,
    handleSwitch,
    saving,
    handleSubmit,
    errors,
    errorRef,
    referalError,
    setErrorRef,
    setValue,
    levelsRef,
  } = useReferalData();

  //form field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "referals",
  });

  return (
    <GridContainer container spacing={3}>
      <LeftGrid item xs={12} sm={7}>
        <Form onSubmit={handleSubmit(handleSave)}>
          <HeaderReferal>
            <div>
              <div>
                <Text fontWeight={500} fontSize="18px">
                  Реферальная система
                  <br />
                </Text>
              </div>
              <div style={{ maxWidth: "370px" }}>
                <Text fontWeight={300} fontSize="14px">
                  Начисление баллов рекомендателю в размере процента от суммы
                  счета приглашенных друзей
                </Text>
              </div>
            </div>
            <div style={{ margin: "10px 0px 10px 20px" }}>
              <CustomToggle
                checked={checkedState}
                onChange={(e: any) => {
                  handleSwitch(e.target.checked);
                }}
              />
            </div>
          </HeaderReferal>
          {/* ?.sort((a: any, b: any) => a.number - b.number) */}

          <ReferalScroll>
            {fields?.map((item: any, index: number) => {
              return (
                <ReferalCol
                  onClick={(e: any) => {
                    if (!checkedState) {
                      e.stopPropagation();
                    }
                  }}
                  deactivated={!checkedState}
                  key={index}
                >
                  <SmallPanel>
                    <Controller
                      name={`referals.${[index]}.percent`}
                      control={control}
                      defaultValue={item?.percent}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => {
                        return (
                          <InputFormat
                            width={{
                              maxwidth: 122,
                            }}
                            disabled={!checkedState}
                            label={`Уровень ${index + 1}`}
                            field={field}
                            max="100"
                            message={""}
                            error={
                              errors?.referals?.[index]?.percent ? true : false
                            }
                          />
                        );
                      }}
                    />

                    <TwoUsers
                      name1="Саша"
                      name2="Егор"
                      name3={
                        item.number === 2
                          ? "Петя"
                          : item.number > 2
                          ? `${index - 1} ${t("people")}`
                          : null
                      }
                    />
                    <TextDiv>
                      <Text fontSize="14px" fontWeight={300}>
                        1 клиент получает
                        {" " + item.percent}% с каждой покупки
                        {" " + +(item.number + 1)} Клиентa
                      </Text>
                    </TextDiv>
                  </SmallPanel>
                  {index === fields.length - 2 && index !== 0 && (
                    <RippleEffect
                      onClick={() => {
                        console.log(index, "index prev");
                        if (checkedState) {
                          remove(index);
                          setValue(
                            "referals",
                            fields.filter((item, ind) => ind !== index)
                          );
                        }
                      }}
                    >
                      <XIcon />
                    </RippleEffect>
                  )}
                  {index === fields.length - 1 && (
                    <ActDiv>
                      <RippleEffect
                        onClick={() => {
                          console.log(index, "index next");
                          if (checkedState) {
                            remove(index);
                          }
                        }}
                      >
                        <XIcon />
                      </RippleEffect>
                      <RippleEffect
                        padding={0}
                        onClick={() => {
                          if (checkedState) {
                            append({
                              name: `${fields.length + 1}`,
                              number: fields.length + 1,
                              percent: 0,
                            });
                          }
                        }}
                      >
                        <AddDiv>
                          <AddIconSettings />
                        </AddDiv>
                      </RippleEffect>
                    </ActDiv>
                  )}
                </ReferalCol>
              );
            })}
          </ReferalScroll>
          <BottomBtnContainer>
            {/* || !checkedState */}
            <Button
              disabled={saving}
              loadingColor="#fff"
              startIcon={<SaveIcon />}
              type="submit"
            >
              {t("save")}
            </Button>
          </BottomBtnContainer>
        </Form>
      </LeftGrid>

      <RightGrid item xs={12} sm={4}>
        <LevelsCard>
          <LevelsHead>
            <ThreeHeadIcon />
            <div>
              <Text marginLeft="15px" fontSize={FONT_SIZE.mediumPlus}>
                Клиентов по уровням
              </Text>
            </div>
          </LevelsHead>
          <LevelsColumn>
            {levelsRef?.map((item, index) => {
              return (
                <LevelsRow key={index}>
                  <div>
                    <Text fontSize={FONT_SIZE.smallPlus} fontWeight={400}>
                      {item.levelNumber} {t("level")}
                    </Text>
                  </div>
                  <div>
                    <Text color={COLORS.purple} fontSize={FONT_SIZE.smallPlus}>
                      {item.count}
                    </Text>
                  </div>
                </LevelsRow>
              );
            })}
          </LevelsColumn>
        </LevelsCard>
      </RightGrid>
      <NotifySnack
        open={errorRef}
        error={true}
        vertical="bottom"
        horizontal="right"
        message={referalError}
        handleClose={() => {
          setErrorRef(false);
        }}
      />
    </GridContainer>
  );
};

export default ReferalProgrammSection;
