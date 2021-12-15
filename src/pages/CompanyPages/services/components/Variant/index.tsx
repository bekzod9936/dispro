import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormFieldTypes } from "../../utils/types";
import { DynamicFields } from "../DynamicFields";
import { Field } from "../Field";
import { GridContainer, Wrapper } from "./style";

interface VariantProps {
  index: number;
}
export const Variant: React.FC<VariantProps> = ({ index }) => {
  const { control } = useFormContext<FormFieldTypes>();
  const { t } = useTranslation();
  return (
    <Wrapper>
      <DynamicFields
        marginBottom="15px"
        name={`variants.${index}.name`}
        control={control}
        label="title"
      />
      <GridContainer>
        <Field label={t("price")} name={`variants.${index}.price`} />
        <Field
          label={t("priceWithSale")}
          name={`variants.${index}.priceWithSale`}
        />
        <Field label={t("count")} name={`variants.${index}.amount`} />
        <Field label={t("articul")} name={`variants.${index}.articul`} />
      </GridContainer>
    </Wrapper>
  );
};
