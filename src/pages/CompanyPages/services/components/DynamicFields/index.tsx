import { useState } from "react";

//packages
import { Control, Controller, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import Input from "components/Custom/Input";
import { LanguagesModal } from "pages/CompanyPages/services/components/Modals/Languages";

//styles
import { ButtonIcon, MockIcon, RemoveInputIcon, useStyles } from "./style";
import { SubButton } from "pages/CompanyPages/services/style";
import { Wrapper } from "./style";

//other
import { FormFieldTypes } from "pages/CompanyPages/services/utils/types";

interface DynamicFieldsProps {
  control: Control<FormFieldTypes>;
  name: "descriptions" | "titles" | `variants.${number}.name`;
  isDescription?: boolean;
  label: string;
  marginBottom?: string;
}

export const DynamicFields: React.FC<DynamicFieldsProps> = ({
  control,
  name,
  isDescription,
  label,
  marginBottom,
}) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const { input } = useStyles();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const modalTitle = isDescription
    ? "addingDescOnAnotherLang"
    : "addingTitleOnAnotherLang";

  const buttonInnerText = isDescription
    ? "addDescOnAnotherLang"
    : "addTitleOnAnotherLang";

  const handleAddField = (array: string[]) => {
    let inputs = array.map((e) => ({ data: "", lang: e }));
    append(inputs);
  };

  const handleOpen = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  return (
    <Wrapper marginBottom={marginBottom} isMultiple={fields.length > 1}>
      {fields.map((item, index) => (
        <div key={item.id}>
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
                multiline={isDescription}
                isAbsolute
                type={isDescription ? "textarea" : ""}
                inputStyle={input.style(Boolean(isDescription))}
              />
            )}
          />
          {fields.length <= 2 && index === 0 && (
            <SubButton type="button" onClick={handleOpen}>
              {t(buttonInnerText)}
            </SubButton>
          )}
        </div>
      ))}
      <LanguagesModal
        open={modal}
        onClose={handleClose}
        onConfirm={handleAddField}
        fields={fields}
        title={modalTitle}
      />
    </Wrapper>
  );
};
