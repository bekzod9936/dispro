import InputFormat from "components/Custom/InputFormat";
import React from "react";
import { Controller, FieldError, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
}
export const Field: React.FC<FieldProps> = ({
  name,
  label,
  error,
  disabled,
}) => {
  const { control } = useFormContext<FormFieldTypes>();
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <InputFormat
          isAbsolute
          disabled={disabled}
          error={Boolean(error)}
          message={t(error?.message || "")}
          label={label}
          onChange={field.onChange}
          value={field.value}
        />
      )}
    />
  );
};
