import useReferalData from "./hooks/useReferalData";
import { ReferalScroll, SmallPanel } from "../../styles/SettingStyles";
import { Text } from "styles/CustomStyles";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import CustomInput from "components/Custom/CustomInput";
import TwoUsers from "../../components/TwoUsers";
import { SaveIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import {
  AddIconSettings,
  XIcon,
} from "assets/icons/SettingsIcons/SettingsPageIcon";
import { ThreeHeadIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import { COLORS, FONT_SIZE } from "services/Types/enums";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import {
  BottomBtnContainer,
  GridContainer,
  LeftGrid,
  LevelsColumn,
  LevelsHead,
  LevelsRow,
  RightGrid,
  LevelsCard,
} from "./styles";
import Button from "components/Custom/Button";
import RippleEffect from "components/Custom/RippleEffect";

const ReferalProgrammSection = () => {
  const forMap = new Array(10).fill(250);
  const { t } = useTranslation();
  const {
    level,
    checkedState,
    control,
    handleChange,
    handleAddClick,
    handleSave,
    handleXClick,
    handleSwitch,
    saving,
  } = useReferalData();

  return (
    <GridContainer container spacing={3}>
      <LeftGrid item xs={7}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "start",
            marginBottom: "25px",
          }}
        >
          <div>
            <div>
              <Text fontWeight={500} fontSize="18px">
                Реферальная система
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
        </div>
        <ReferalScroll>
          <div>
            {level?.map((item: any, index: number) => {
              return (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <SmallPanel>
                    <form>
                      <div>
                        <Controller
                          name={item.name}
                          control={control}
                          render={({ field }) => {
                            return (
                              <CustomInput
                                specialCase
                                label={`Уровень ${index + 1}`}
                                field={field}
                                style={{ width: "120px" }}
                                onChange={(e: any) =>
                                  handleChange(e, item, index)
                                }
                              />
                            );
                          }}
                        />
                      </div>
                    </form>
                    <TwoUsers
                      name1="Саша"
                      name2="Егор"
                      name3={
                        item.number === 2
                          ? "Петя"
                          : item.number > 2
                          ? `${item.number - 1} people`
                          : null
                      }
                    />
                    <div style={{ width: "140px", textAlign: "start" }}>
                      <Text fontSize="14px" fontWeight={300}>
                        1 клиент получает
                        {" " + item.percent}% с каждой покупки
                        {" " + +(item.number + 1)} Клиентa
                      </Text>
                    </div>
                  </SmallPanel>
                  {index === level.length - 2 && (
                    <RippleEffect onClick={() => handleXClick()}>
                      <XIcon />
                    </RippleEffect>
                  )}
                  {index === level.length - 1 && (
                    <RippleEffect onClick={() => handleAddClick(item)}>
                      <AddIconSettings />
                    </RippleEffect>
                  )}
                </div>
              );
            })}
          </div>
        </ReferalScroll>
        <BottomBtnContainer>
          <Button
            disabled={saving}
            loading={saving}
            loadingColor="#fff"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            {t("save")}
          </Button>
        </BottomBtnContainer>
      </LeftGrid>

      <RightGrid item xs={4}>
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
