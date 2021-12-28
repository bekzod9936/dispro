import { SaveButton } from "components/Custom/Buttons/Save";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import { useTranslation } from "react-i18next";
import useSecurty from "./useSecurty";
import { useAppSelector } from "services/redux/hooks";
import InputFormat from "components/Custom/InputFormat";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { securitySchema, IForm } from "./security.schema";
import { Container, Form, WrapSwitch, Title, Text } from "./style";

const Security = () => {
  const { t } = useTranslation();
  const { response, putSecurity, handleSave } = useSecurty();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(securitySchema),
    mode: "onChange",
  });

  const showSwitch = useWatch({ control, name: "enablepurchase" });
  const data = useAppSelector((state) => state.newsetting.security);

  useEffect(() => {
    reset({
      enablepurchase: data?.isEnabledPurchaseLimit,
      limit: data?.safeties?.daily_purchase_limit,
      data: {
        isEnabledPaySumLimit: data?.isEnabledPaySumLimit,
        pay_sum_limit: data?.safeties?.pay_sum_limit,
      },
    });
  }, [data]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleSave)}>
        <div className="switchWrap">
          <WrapSwitch>
            <Title>{t("suspiciouscustomers")}</Title>
            <Controller
              name="enablepurchase"
              control={control}
              render={({ field }) => {
                return <CustomToggle checked={field.value} {...field} />;
              }}
            />
          </WrapSwitch>
          <Text>{t("toomanypurchases")}</Text>
          {showSwitch && (
            <Controller
              name="limit"
              control={control}
              render={({ field }) => {
                return (
                  <InputFormat
                    field={field}
                    label={t("operations_per_day")}
                    maxLength={11}
                    width={{ width: "calc(100% - 50px)" }}
                    message={t(`${errors.limit?.message}`, {
                      value: 1,
                    })}
                    error={errors.limit?.message !== undefined ? true : false}
                  />
                );
              }}
            />
          )}
        </div>
        <SaveButton disabled={putSecurity.isLoading || response.isLoading} />
      </Form>
    </Container>
  );
};
export default Security;
