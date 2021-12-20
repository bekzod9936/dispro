//packages
import { useTranslation } from "react-i18next";
import { Controller, FieldError, useFormContext } from "react-hook-form";

//components
import InputFormat from "components/Custom/InputFormat";
import Input from "components/Custom/Input";

//other
import { FormFieldTypes } from "../../utils/types";

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
}

export const Field: React.FC<FieldProps> = ({
  name,
  label,
  error,
  disabled,
  isArticul,
}) => {
  const { control } = useFormContext<FormFieldTypes>();
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        if (isArticul) {
          return (
            <Input
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
