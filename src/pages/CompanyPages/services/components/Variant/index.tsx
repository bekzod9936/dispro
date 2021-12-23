//packages
import { useFormContext } from "react-hook-form";
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
  isVariantAdded?: boolean;
}

export const Variant: React.FC<VariantProps> = ({
  index,
  disabled,
  isVariantAdded,
}) => {
  const {
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext<FormFieldTypes>();

  const { t } = useTranslation();
  const error = errors.variants ? errors.variants[index] : undefined;

  useEffect(() => {
    clearErrors(`variants.${index}.priceWithSale`);
    setValue(`variants.${index}.priceWithSale`, "");
  }, [disabled]);

  //! alert, govno kod
  useEffect(() => {
    if (!isVariantAdded) {
      setValue(`variants.${index}.name`, [{ data: "test", lang: "(Рус)" }]);
    } else {
      setValue(`variants.${index}.name`, [{ data: "", lang: "(Рус)" }]);
    }
  }, [isVariantAdded]);

  return (
    <Wrapper>
      {Boolean(isVariantAdded) && (
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
