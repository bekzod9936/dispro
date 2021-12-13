import React from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { FormFieldTypes } from "../..";
import Input from "components/Custom/Input";
import { ButtonIcon, MockIcon, RemoveInputIcon } from "./style";
import { useTranslation } from "react-i18next";
interface DynamicFieldsProps {
  control: Control<FormFieldTypes>;
  name: keyof FormFieldTypes;
  isTextArea: boolean;
  label: string;
}

export const DynamicFields: React.FC<DynamicFieldsProps> = ({
  control,
  name,
  isTextArea,
  label,
}) => {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      {fields.map((item, index) => (
        <Controller
          name={`${name}.${index}.data`}
          render={({ field }) => (
            <Input
              field={field}
              labelIcon={
                index > 0 ? (
                  <ButtonIcon onClick={() => remove(index)}>
                    <RemoveInputIcon />
                  </ButtonIcon>
                ) : (
                  <MockIcon />
                )
              }
              label={t(label) + ` ${item.lang}`}
              multiline={isTextArea}
              isAbsolute
              type={isTextArea ? "textarea" : ""}
              inputStyle={
                isTextArea
                  ? {
                      height: { desktop: 124, laptop: 124 },
                      inpadding: "10px 15px",
                    }
                  : undefined
              }
            />
          )}
        />
      ))}
    </div>
  );
};
