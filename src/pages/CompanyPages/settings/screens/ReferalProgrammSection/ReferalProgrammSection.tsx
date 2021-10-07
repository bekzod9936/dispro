import { Flex } from "styles/BuildingBlocks";

import useReferalData from "./hooks/useReferalData";
import {
  LeftPanel,
  Levels,
  ReferalScroll,
  RightPanel,
  SmallPanel,
} from "../../styles/SettingStyles";
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
import { BottomBtnContainer } from "./styles";
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
    <>
      <Flex
        flexGrow="1"
        justifyContent="start"
        alignItems="flex-start"
        margin="0px"
      >
        <LeftPanel flexDirection="column">
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
        </LeftPanel>
        <RightPanel>
          <Levels>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "10px 0px",
              }}
            >
              <ThreeHeadIcon />
              <div>
                <Text marginLeft="15px" fontSize={FONT_SIZE.mediumPlus}>
                  Клиентов по уровням
                </Text>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {forMap.map((item, index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "15px",
                    }}
                  >
                    <div>
                      <Text fontSize={FONT_SIZE.smallPlus} fontWeight={400}>
                        {index + 1 + " "} {t("level")}
                      </Text>
                    </div>
                    <div>
                      <Text
                        color={COLORS.purple}
                        fontSize={FONT_SIZE.smallPlus}
                      >
                        {item}
                      </Text>
                    </div>
                  </div>
                );
              })}
            </div>
          </Levels>
        </RightPanel>
      </Flex>
    </>
  );
};

export default ReferalProgrammSection;
