import { useEffect } from "react";
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
  const {
    watch,
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext<FormFieldTypes>();
  const { t } = useTranslation();
  const error = errors.variants ? errors.variants[index] : undefined;
  const isItemWithDisocunt = Number(watch("loyaltyType")) !== 1;

  useEffect(() => {
    clearErrors(`variants.${index}.priceWithSale`);
  }, [isItemWithDisocunt]);

  return (
    <Wrapper>
      <DynamicFields
        error={error?.name}
        marginBottom="15px"
        name={`variants.${index}.name`}
        control={control}
        label="title"
      />
      <GridContainer>
        <Field
          error={error?.price}
          label={t("cost")}
          name={`variants.${index}.price`}
        />
        <Field
          disabled={isItemWithDisocunt}
          error={error?.priceWithSale}
          label={t("priceWithSale")}
          name={`variants.${index}.priceWithSale`}
        />
        <Field
          error={error?.amount}
          label={t("count")}
          name={`variants.${index}.amount`}
        />
        <Field
          isArticul
          error={error?.articul}
          label={t("articul")}
          name={`variants.${index}.articul`}
        />
      </GridContainer>
    </Wrapper>
  );
};
