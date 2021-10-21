import useReferalData from "./hooks/useReferalData";
import { ReferalScroll, SmallPanel } from "../../styles/SettingStyles";
import { Text } from "styles/CustomStyles";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import Input from "components/Custom/Input";
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
} from "./styles";
import Button from "components/Custom/Button";
import RippleEffect from "components/Custom/RippleEffect";

const ReferalProgrammSection = () => {
  const forMap = new Array(10).fill(250);
  const { t } = useTranslation();
  const {
    checkedState,
    control,
    handleSave,
    handleSwitch,
    saving,
    fields,
    append,
    remove,
    handleSubmit,
  } = useReferalData();

  console.log(fields, "fields");

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

          <ReferalScroll>
            {fields
              ?.sort((a: any, b: any) => a.number - b.number)
              ?.map((item: any, index: number) => {
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
                        render={({ field }) => {
                          return (
                            <Input
                              width={{
                                maxwidth: 122,
                              }}
                              disabled={!checkedState}
                              label={`Уровень ${index + 1}`}
                              field={field}
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
                    {index === fields.length - 2 && (
                      <RippleEffect
                        onClick={() => {
                          if (checkedState) {
                            remove(index);
                          }
                        }}
                      >
                        <XIcon />
                      </RippleEffect>
                    )}
                    {index === fields.length - 1 && (
                      <RippleEffect
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
                        <AddIconSettings />
                      </RippleEffect>
                    )}
                  </ReferalCol>
                );
              })}
          </ReferalScroll>
          <BottomBtnContainer>
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
            {forMap.map((item, index) => {
              return (
                <LevelsRow key={index}>
                  <div>
                    <Text fontSize={FONT_SIZE.smallPlus} fontWeight={400}>
                      {index + 1 + " "} {t("level")}
                    </Text>
                  </div>
                  <div>
                    <Text color={COLORS.purple} fontSize={FONT_SIZE.smallPlus}>
                      {item}
                    </Text>
                  </div>
                </LevelsRow>
              );
            })}
          </LevelsColumn>
        </LevelsCard>
      </RightGrid>
    </GridContainer>
  );
};

export default ReferalProgrammSection;
