import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Input from "components/Custom/Input";
import { useTranslation } from "react-i18next";
import { SubSectionFormTypes } from "../Modals/SubSection";
interface SubSectionFieldProps {
  name: "subSection";
}

export const SubSectionField: React.FC<SubSectionFieldProps> = ({ name }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<SubSectionFormTypes>();

  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          label={t("subSectionName")}
          field={field}
          isAbsolute
          error={Boolean(errors[name])}
        />
      )}
    />
  );
};
