import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormFieldTypes } from "../../utils/types";
import { DynamicFields } from "../DynamicFields";
import { Field } from "../Field";

interface VariantProps {
  index: number;
}
export const Variant: React.FC<VariantProps> = ({ index }) => {
  const { control } = useFormContext<FormFieldTypes>();
  const { t } = useTranslation();
  return (
    <div>
      <DynamicFields
        name={`variants.${index}.name`}
        control={control}
        label="title"
      />
      <div>
        <Field label={t("price")} name={`variants.${index}.price`} />
        <Field
          label={t("priceWithSale")}
          name={`variants.${index}.priceWithSale`}
        />
        <Field label={t("amount")} name={`variants.${index}.amount`} />
        <Field label={t("articul")} name={`variants.${index}.articul`} />
      </div>
    </div>
  );
};
