//packages
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

//style
import { GridContainer, Wrapper } from "./style";

//components
import { Field } from "../Field";
import { DynamicFields } from "../DynamicFields";

//other
import { FormFieldTypes } from "../../utils/types";
import { useEffect } from "react";

interface VariantProps {
  index: number;
  disabled: boolean;
  isFieldsMultiple: boolean;
}

export const Variant: React.FC<VariantProps> = ({
  index,
  disabled,
  isFieldsMultiple,
}) => {
  const {
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext<FormFieldTypes>();

  const { t } = useTranslation();
  const error = errors.variants ? errors.variants[index] : undefined;

  const price = useWatch({ name: `variants.${index}.price` });
  const priceWithSale = useWatch({ name: `variants.${index}.priceWithSale` });

  useEffect(() => {
    if (Number(price) > Number(priceWithSale)) {
      clearErrors(`variants.${index}.priceWithSale`);
    }
  }, [price, priceWithSale]);

  useEffect(() => {
    if (disabled) {
      setValue(`variants.${index}.priceWithSale`, "");
    }
    clearErrors(`variants.${index}.priceWithSale`);
  }, [disabled]);

  return (
    <Wrapper>
      {isFieldsMultiple && (
        <DynamicFields
          error={error?.name}
          marginBottom="15px"
          name={`variants.${index}.name`}
        />
      )}
      <GridContainer>
        <Field
          error={error?.price}
          label={t("cost")}
          name={`variants.${index}.price`}
        />
        <Field
          disabled={disabled}
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
