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
import { useLocation } from "react-router-dom";

interface VariantProps {
  index: number;
  disabled: boolean;
  isVariantAdded?: boolean;
  defaultValues: any;
}

export const Variant: React.FC<VariantProps> = ({
  index,
  disabled,
  isVariantAdded,
  defaultValues,
}) => {
  const {
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext<FormFieldTypes>();

  const { t } = useTranslation();
  const error = errors.variants ? errors.variants[index] : undefined;
  // const { pathname } = useLocation();
  // const isEditMode = pathname.includes("edit");

  // const price = useWatch({ name: `variants.${index}.price` });
  // const priceWithSale = useWatch({ name: `variants.${index}.priceWithSale` });

  // useEffect(() => {
  //   if (Number(price) > Number(priceWithSale)) {
  //     clearErrors(`variants.${index}.priceWithSale`);
  //   }
  // }, [price, priceWithSale]);

  // useEffect(() => {
  //   clearErrors(`variants.${index}.priceWithSale`);
  //   setValue(`variants.${index}.priceWithSale`, "");
  // }, [disabled]);

  // //! alert, govno kod
  // useEffect(() => {
  //   if (!isVariantAdded) {
  //     setValue(`variants.${index}.name`, [{ data: "test", lang: "(Рус)" }]);
  //   } else if (!isEditMode) {
  //     setValue(`variants.${index}.name`, [{ data: "", lang: "(Рус)" }]);
  //   }
  // }, [isVariantAdded]);

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
