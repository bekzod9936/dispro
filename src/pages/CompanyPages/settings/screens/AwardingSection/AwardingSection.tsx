import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Flex } from "styles/BuildingBlocks";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import Input from "components/Custom/Input";
import { Text } from "styles/CustomStyles";
import CustomTextArea from "../../../info/CustomTextArea";
import { Controller, useForm } from "react-hook-form";
import { SaveIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import { useTranslation } from "react-i18next";
import partnerApi from "services/interceptors/companyInterceptor";
import { useQuery } from "react-query";
import { fetchRewards } from "services/queries/PartnerQueries";
import { SettingsWrapper } from "../../styles/SettingStyles";
import {
  AwardContainer,
  BottomAwardBtnContainer,
  Form,
  LeftAwardGrid,
  RightAwardGrid,
} from "./styles";
import Button from "components/Custom/Button";

interface IForm {
  awardLimit: number | null;
  awardSizeFirst: number | null;
  awardSizeFourth: number | null;
  awardSizeSecond: number | null;
  awardSizeThird: number | null;
  description: string | null;
  ifMoreThan: string | null;
  payfor: string | null;
}
interface ITotal {
  amount: number;
  isActive: boolean;
  levels: any[];
  rewardType: number;
  userType: 1 | 2;
}

const AwardingSection = () => {
  const TOTAL_FIELDS_PATTERN: ITotal[] = [
    {
      amount: 0,
      isActive: false,
      levels: [],
      rewardType: 1,
      userType: 1,
    },
    {
      amount: 0,
      isActive: false,
      levels: [],
      rewardType: 2,
      userType: 1,
    },
    {
      amount: 0,
      isActive: false,
      levels: [{ beforeDay: "5", congratulationText: "qwertyu" }],
      rewardType: 3,
      userType: 1,
    },
    {
      amount: 0,
      isActive: false,
      levels: [
        {
          requirements: [
            { id: 0, type: "1", unit: "UZS", amount: "", condition: "" },
          ],
        },
      ],
      rewardType: 4,
      userType: 1,
    },
    {
      amount: 0,
      isActive: false,
      levels: [],
      rewardType: 5,
      userType: 2,
    },
    {
      amount: 0,
      isActive: false,
      levels: [],
      rewardType: 6,
      userType: 2,
    },
    {
      amount: 0,
      isActive: false,
      levels: [{ beforeDay: "", congratulationText: "" }],
      rewardType: 3,
      userType: 2,
    },
  ];

  const [switchStates, setSwitchStates] = useState<any>([]);
  const { control, handleSubmit, setValue } = useForm<IForm>();
  const { t } = useTranslation();
  const companyId: any = localStorage.getItem("companyId");

  const { refetch } = useQuery(["rewards"], () => fetchRewards(), {
    retry: 0,
    refetchOnWindowFocus: false,

    onSuccess: (data) => {
      data.data.data.rewards.forEach((element: any) => {
        if (element.isActive) {
          if (element.rewardType === 1) {
            setSwitchStates([...switchStates, "first"]);
          }
          if (element.rewardType === 2) {
            setSwitchStates([...switchStates, "second"]);
          }
          if (element.rewardType === 3) {
            setSwitchStates([...switchStates, "third"]);
          }
          if (element.rewardType === 4) {
            setSwitchStates([...switchStates, "fourth"]);
          }
        }
      });
      let result = data?.data?.data?.rewards;
      let forFirst = result.find((item: any) => item?.rewardType === 1);
      let forSecond = result.find((item: any) => item?.rewardType === 2);
      let forThird = result.find((item: any) => item?.rewardType === 3);
      let forFourth = result.find((item: any) => item?.rewardType === 4);
      let forCongrat = result.find(
        (item: any) => item?.levels[0]?.congratulationText
      );
      let forBeforeDay = result.find((item: any) => item?.levels[0]?.beforeDay);
      //let forDescription = result.find((item:any)=>item.)  ;
      // let forMoreThan :any = result.find((item: any) => item?.levels[0]?.requirements[0]?.amount);
      // setValue("ifMoreThan", forMoreThan?.levels[0]?.requirements[0]?.amount);
      setValue("awardSizeFirst", forFirst?.amount);
      setValue("awardSizeThird", forThird?.amount);
      setValue("awardSizeFourth", forFourth?.amount);
      setValue("description", forCongrat?.levels[0]?.congratulationText);
      setValue("payfor", forBeforeDay?.levels[0]?.beforeDay);
    },
  });
  const handleSwitch = (checked: boolean, item: any, index: number) => {
    let exist = switchStates?.includes(item.key);
    if (!exist && checked) {
      setSwitchStates([...switchStates, item.key]);
    } else if (!checked && exist) {
      let filtered = [...switchStates];
      let searchingIndex = filtered.findIndex(
        (value: any) => value === item.key
      );
      filtered.splice(searchingIndex, 1);
      setSwitchStates([...filtered]);
    }
  };

  const renderUnderSwitchFirst = () => {
    return (
      <div style={{ width: "100%" }}>
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
      </div>
    );
  };
  const renderSwitchThird = () => {
    return (
      <div style={{ width: "100%" }}>
        <div>
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
        </div>
        <div>
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
        </div>
      </div>
    );
  };
  const renderSwitchSecond = () => {
    return (
      <Grid container xs={12}>
        <Grid item xs={12} sm={6}>
          <div>
            <Controller
              control={control}
              name="awardSizeSecond"
              render={({ field }) => {
                return <Input field={field} label={t("awardSize")} />;
              }}
            />
          </div>
          <div>
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
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => {
              return (
                <CustomTextArea
                  field={field}
                  fullWidth
                  style={{
                    minHeight: "170px",
                    background: "transparent",
                    width: "100%",
                    outline: "none",
                    padding: "10px",
                  }}
                  label="description"
                />
              );
            }}
          />
        </Grid>
      </Grid>
    );
  };
  const onFormSubmit = async (data: IForm) => {
    let temp = TOTAL_FIELDS_PATTERN;

    if (data.awardSizeFirst) {
      TOTAL_FIELDS_PATTERN[0].amount = +data.awardSizeFirst;
      if (switchStates.includes("first")) {
        TOTAL_FIELDS_PATTERN[0].isActive = true;
      }
    }
    if (data.awardSizeSecond) {
      TOTAL_FIELDS_PATTERN[1].amount = +data.awardSizeSecond;
      if (switchStates?.includes("second")) {
        TOTAL_FIELDS_PATTERN[1].isActive = true;
      }
    }
    if (data.awardSizeThird) {
      TOTAL_FIELDS_PATTERN[2].amount = +data.awardSizeThird;
      if (switchStates?.includes("third")) {
        TOTAL_FIELDS_PATTERN[2].isActive = true;
      }
    }
    if (data.awardSizeFourth) {
      TOTAL_FIELDS_PATTERN[3].amount = +data.awardSizeFourth;
      if (switchStates?.includes("fourth")) {
        TOTAL_FIELDS_PATTERN[3].isActive = true;
      }
    }
    if (data.description) {
      TOTAL_FIELDS_PATTERN[2].levels[0].congratulationText = data.description;
    }
    if (data.ifMoreThan) {
      TOTAL_FIELDS_PATTERN[3].levels[0].requirements[0].amount =
        data.ifMoreThan;
    }
    if (data.payfor) {
      TOTAL_FIELDS_PATTERN[2].levels[0].beforeDay = data.payfor;
    }

    try {
      await partnerApi.post("/bonus/rewards", {
        companyId: Number(companyId),
        rewards: TOTAL_FIELDS_PATTERN,
      });
      refetch();
    } catch (err) {}
  };

  const renderSwitchFourth = () => {
    return (
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
    );
  };

  //Switches
  const switchesFirstline = [
    {
      title: "Приветственные баллы",
      key: "first",
      description:
        "Единоразовое начисление баллов клиенту за присоединение к компании",
      renderRest: renderUnderSwitchFirst,
      rewardType: 1,
    },
    {
      title: "Баллы ко дню рождения",
      key: "third",
      description:
        "Автоматическое начисление баллов клиенту ко дню его рождения",
      renderRest: renderSwitchThird,
      rewardType: 3,
    },
  ];
  const switchesSecond = [
    {
      title: "Баллы за рекомендацию",
      key: "second",
      description:
        "Вознаграждение баллами клиента за друга, пришедшего по рекомендации. Начисляются   после первой операции.",
      renderRest: renderSwitchSecond,
      rewardType: 2,
    },

    {
      title: "VIP баллы",
      key: "fourth",
      description:
        "Баллы, которые можно добавить постоянным   пользователям для повышения лояльности.",
      renderRest: renderSwitchFourth,
      rewardType: 4,
    },
  ];

  return (
    <>
      <Flex flexGrow="1" margin="0px">
        <SettingsWrapper
          style={{
            width: "97%",
            padding: "30px 10px 20px 45px",
            boxSizing: "border-box",
          }}
        >
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            <AwardContainer container spacing={3}>
              <LeftAwardGrid item xs={6}>
                {switchesFirstline.map((item: any, index: number) => {
                  return (
                    <Flex
                      key={index}
                      width="100%"
                      margin="0px 0px 20px 0px"
                      justifyContent="start"
                      alignItems="flex-start"
                      flexDirection="column"
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "start",
                          marginBottom: "15px",
                        }}
                      >
                        <div>
                          <div>
                            <Text fontWeight={500} fontSize="18px">
                              {item.title}
                            </Text>
                          </div>
                          <div style={{ maxWidth: "340px", minWidth: "340px" }}>
                            <Text fontWeight={300} fontSize="14px">
                              {item.description}
                            </Text>
                          </div>
                        </div>
                        <div style={{ margin: "10px 0px 10px 20px" }}>
                          <CustomToggle
                            checked={switchStates.includes(item.key)}
                            onChange={(e: any) =>
                              handleSwitch(e.target.checked, item, index)
                            }
                          />
                        </div>
                      </div>
                      {switchStates.includes(item.key) && (
                        <div style={{ width: "100%" }}>{item.renderRest()}</div>
                      )}
                    </Flex>
                  );
                })}
                <BottomAwardBtnContainer>
                  <Button type="submit">
                    <SaveIcon />
                    <Text marginLeft="15px" color="white">
                      {t("save")}
                    </Text>
                  </Button>
                </BottomAwardBtnContainer>
              </LeftAwardGrid>

              <RightAwardGrid item xs={6}>
                {switchesSecond.map((item: any, index: number) => {
                  return (
                    <Flex
                      key={index}
                      width="100%"
                      margin="0px 0px 20px 0px"
                      justifyContent="start"
                      alignItems="flex-start"
                      flexDirection="column"
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "start",
                          marginBottom: "15px",
                        }}
                      >
                        <div>
                          <div>
                            <Text fontWeight={500} fontSize="18px">
                              {item.title}
                            </Text>
                          </div>
                          <div style={{ maxWidth: "340px", minWidth: "340px" }}>
                            <Text fontWeight={300} fontSize="14px">
                              {item.description}
                            </Text>
                          </div>
                        </div>
                        <div style={{ margin: "10px 0px 10px 20px" }}>
                          <CustomToggle
                            checked={switchStates.includes(item.key)}
                            onChange={(e: any) =>
                              handleSwitch(e.target.checked, item, index)
                            }
                          />
                        </div>
                      </div>
                      {switchStates.includes(item.key) && (
                        <div style={{ width: "100%" }}>{item.renderRest()}</div>
                      )}
                    </Flex>
                  );
                })}
              </RightAwardGrid>
            </AwardContainer>
          </Form>
        </SettingsWrapper>
      </Flex>
    </>
  );
};

export default AwardingSection;
