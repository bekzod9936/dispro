import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../../../components/Custom/CustomInput";
import { Flex } from "../../../../styles/BuildingBlocks";
import { SettingsWrapper } from "../SettingStyles";
import { CustomButton, Text } from "../../../../styles/CustomStyles";
import { SaveIcon } from "../../../../assets/icons/InfoPageIcons/InfoPageIcons";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { fetchSafeties } from "../../../../services/queries/PartnerQueries";
import partnerApi from "../../../../services/interceptors/companyInterceptor";
import { StyledSwitch } from "../../../../components/Custom/CustomSwitch";

const SecuritySection = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue } = useForm();
  const [switchStates, setSwitchStates] = useState<any>([]);
  const [refetch, setRefetch] = useState(0);

  const response = useQuery(["safeties", refetch], fetchSafeties, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      setValue("first", data.data.data.safeties.daily_purchase_limit);
    },
  });
  const renderFirst = () => {
    return (
      <div style={{ width: "70%" }}>
        <Controller
          name="first"
          control={control}
          render={({ field }) => {
            return <CustomInput field={field} label="operations_per_day" />;
          }}
        />
      </div>
    );
  };
  const renderSecond = () => {
    return (
      <div style={{ width: "70%" }}>
        <Controller
          name="second"
          control={control}
          render={({ field }) => {
            return <CustomInput field={field} label="enterSum" />;
          }}
        />
      </div>
    );
  };

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

  const onFormSubmit = async (data: any) => {
    await partnerApi.put("/core/company-safeties", {
      safeties: {
        daily_purchase_limit: +data.first,
      },
    });
    setRefetch(refetch + 1);
  };
  const switchList = [
    {
      title: "Отслеживать подозрительных клиентов",
      key: "first",
      description:
        "Оповестим, если какой-то клиент делает слишком много покупок",
      renderRest: renderFirst,
    },
    {
      title: "Ограничить сумму счета",
      key: "second",
      description: "Кассир не сможет провести операцию больше указанной суммы",
      renderRest: renderSecond,
    },
  ];
  return (
    <div style={{ display: "flex", flexGrow: 1 }}>
      <SettingsWrapper>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Flex
            margin="0px"
            flexDirection="column"
            justifyContent="start"
            alignItems="flex-start"
          >
            {switchList.map((item, index) => {
              return (
                <Flex
                  width="49%"
                  margin="20px 0px 0px 0px "
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
                      <StyledSwitch
                        onChange={(e: any, checked: any) =>
                          handleSwitch(checked, item, index)
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
          </Flex>
          <div style={{ position: "fixed", bottom: "10px", width: "100%" }}>
            <CustomButton>
              <SaveIcon />
              <Text marginLeft="15px" color="white">
                {t("save")}
              </Text>
            </CustomButton>
          </div>
        </form>
      </SettingsWrapper>
    </div>
  );
};

export default SecuritySection;
