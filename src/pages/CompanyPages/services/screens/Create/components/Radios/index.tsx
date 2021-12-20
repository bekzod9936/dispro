//packages
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";

//components
import { RadioFields } from "pages/CompanyPages/services/components/RadioFields";

//style
import {
  Wrapper,
  Content,
  ErrorMessage,
  LightToolTip,
  QuestionMarkIcon,
} from "./style";

//other
import { FormFieldTypes } from "pages/CompanyPages/services/utils/types";

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
