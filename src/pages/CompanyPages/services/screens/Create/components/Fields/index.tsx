import { FormFieldTypes } from "pages/CompanyPages/services/utils/types";
import React from "react";
import { Control, useFormContext } from "react-hook-form";
import { DynamicFields } from "../../../../components/DynamicFields";

interface FieldsProps {
  control: Control<FormFieldTypes>;
}

export const Fields: React.FC<FieldsProps> = ({ control }) => {
  const {
    formState: { errors },
  } = useFormContext<FormFieldTypes>();

  return (
    <>
      <DynamicFields
        error={errors.titles}
        control={control}
        name="titles"
        label="title"
      />
      <DynamicFields
        error={errors.descriptions}
        control={control}
        isDescription
        name="descriptions"
        label="description"
      />
    </>
  );
};
