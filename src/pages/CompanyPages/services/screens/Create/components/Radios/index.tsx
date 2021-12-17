import { RadioFields } from "pages/CompanyPages/services/components/RadioFields";
import { FormFieldTypes } from "pages/CompanyPages/services/utils/types";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LightToolTip, QuestionMarkIcon } from "./style";
import { Wrapper, Content, ErrorMessage } from "./style";

interface RadiosProps {}

export const Radios: React.FC<RadiosProps> = () => {
  const { t } = useTranslation();
  const {
    formState: { errors },
  } = useFormContext<FormFieldTypes>();

  return (
    <Wrapper>
      <Content>
        <RadioFields name="loyaltyType" />
        <LightToolTip
          placement="top"
          arrow
          title="Товар который можно купить 100% оплатив баллами"
        >
          <QuestionMarkIcon />
        </LightToolTip>
      </Content>
      {errors.loyaltyType && (
        <ErrorMessage>{t(errors?.loyaltyType?.message)}</ErrorMessage>
      )}
    </Wrapper>
  );
};
