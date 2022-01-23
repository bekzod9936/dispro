import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text, Title } from "../../../../style";
import Input from "components/Custom/Input";
import CompanyLink from "../CompanyLink";
import SocialLinks from "../SocialLinks";
import { useEffect } from "react";

import { inputPhoneNumber } from "utilities/inputFormat";

const RightSide = () => {
  const { t } = useTranslation();

  const telNumber = useWatch({ name: "telNumber" });

  const {
    control,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useFormContext();

  const checkPhone = inputPhoneNumber({
    value: telNumber,
  });

  useEffect(() => {
    if (getValues("telNumber")) {
      setValue("telNumber", checkPhone.newString);
    } else {
      setValue("telNumber", "");
    }
  }, [checkPhone.check, watch("telNumber")]);

  return (
    <div>
      <Title>{t("phone")}</Title>
      <Text>{t("maincompanynumber")}</Text>
      <Controller
        name="telNumber"
        control={control}
        rules={{
          required: { value: true, message: "requiredField" },
          maxLength: 9,
          minLength: 9,
        }}
        render={({ field }) => (
          <Input
            label={t("phoneNumber")}
            error={errors.telNumber ? true : false}
            message={t(errors?.telNumber?.message)}
            type="tel"
            field={field}
            margin={{
              laptop: "20px 0 25px",
            }}
            inputStyle={{ inpadding: "0 20px 0 0" }}
            maxLength={9}
            IconStart={<div className="inputstyle">+998</div>}
          />
        )}
      />
      <CompanyLink />
      <SocialLinks />
    </div>
  );
};

export default RightSide;
