//packages
import { useTranslation } from "react-i18next";
import { Controller, FieldError, useFormContext } from "react-hook-form";

//components
import InputFormat from "components/Custom/InputFormat";
import Input from "components/Custom/Input";
import { LightToolTip } from "../../screens/Services/components/Radios/style";

//other
import { FormFieldTypes } from "../../utils/types";

//style
import { NotRequiredIcon } from "./style";

interface FieldProps {
  name: `variants.${number}.${
    | "price"
    | "priceWithSale"
    | "amount"
    | "articul"}`;
  label: string;
  disabled?: boolean;
  error: FieldError | undefined;
  isArticul?: boolean;
  defaultValue: string | number;
}

export const Field: React.FC<FieldProps> = ({
  name,
  label,
  error,
  disabled,
  isArticul,
  defaultValue,
}) => {
  const { control } = useFormContext<FormFieldTypes>();
  const { t } = useTranslation();

  const notRequiredTooltip = name.includes("amount") && (
    <LightToolTip arrow title={t("notRequiredField") || ""} placement="top">
      <NotRequiredIcon>*</NotRequiredIcon>
    </LightToolTip>
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        if (isArticul) {
          return (
            <Input
              defaultValue={defaultValue}
              labelIcon={notRequiredTooltip}
              field={field}
              label={label}
              isAbsolute
              disabled={disabled}
              error={Boolean(error)}
              message={t(error?.message || "")}
            />
          );
        } else {
          return (
            <InputFormat
              isAbsolute
              defaultValue={defaultValue}
              labelIcon={notRequiredTooltip}
              disabled={disabled}
              error={Boolean(error)}
              message={t(error?.message || "")}
              label={label}
              onChange={field.onChange}
              value={field.value}
            />
          );
        }
      }}
    />
  );
};
