import { FormFieldTypes } from "pages/CompanyPages/services/utils/types";
import React from "react";
import { Control } from "react-hook-form";
import { DynamicFields } from "../../../../components/DynamicFields";

interface FieldsProps {
  control: Control<FormFieldTypes>;
}

export const Fields: React.FC<FieldsProps> = ({ control }) => {
  return (
    <>
      <DynamicFields control={control} name="titles" label="title" />
      <DynamicFields
        control={control}
        isDescription
        name="descriptions"
        label="description"
      />
    </>
  );
};
