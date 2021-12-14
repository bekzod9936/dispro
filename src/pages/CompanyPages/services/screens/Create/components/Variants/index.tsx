import { Variant } from "pages/CompanyPages/services/components/Variant";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export const Variants = () => {
  const { control } = useFormContext();

  const { fields } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <div>
      {fields.map((item, index) => (
        <div key={item.id}>
          <Variant index={index} />
        </div>
      ))}
    </div>
  );
};
