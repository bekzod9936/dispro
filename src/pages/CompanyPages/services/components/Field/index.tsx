import InputFormat from "components/Custom/InputFormat";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormFieldTypes } from "../../utils/types";
interface FieldProps {
  name: `variants.${number}.${
    | "price"
    | "priceWithSale"
    | "amount"
    | "articul"}`;
  label: string;
}
export const Field: React.FC<FieldProps> = ({ name, label }) => {
  const { control } = useFormContext<FormFieldTypes>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <InputFormat
          label={label}
          onChange={field.onChange}
          value={field.value}
          type="number"
        />
      )}
    />
  );
};
