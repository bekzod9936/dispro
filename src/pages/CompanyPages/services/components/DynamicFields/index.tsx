import { useState } from "react";

//packages
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
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

interface IError extends FieldErrors<FormFieldTypes> {
  [name: string]: any;
}
interface DynamicFieldsProps {
  name: `variants.${number}.name`;
  marginBottom?: string;
  error: IError | undefined;
}

export const DynamicFields: React.FC<DynamicFieldsProps> = ({
  name,
  marginBottom,
  error,
}) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);

  const {
    control,
    formState: { errors },
  } = useFormContext<FormFieldTypes>();

  const { input } = useStyles();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

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
        <div>
          <Controller
            name={`${name}.${index}.data`}
            render={({ field }) => (
              <Input
                field={field}
                defaultValue={item.data}
                labelIcon={
                  index > 0 ? (
                    <ButtonIcon onClick={() => remove(index)}>
                      <RemoveInputIcon />
                    </ButtonIcon>
                  ) : (
                    <MockIcon />
                  )
                }
                label={t("title") + ` ${item.lang}`}
                message={error ? t(error[index]?.data?.message) : ""}
                isAbsolute
                error={error ? Boolean(error[index]) : false}
              />
            )}
          />
          {fields.length <= 2 && index === 0 && (
            <SubButton type="button" onClick={handleOpen}>
              {t("addTitleOnAnotherLang")}
            </SubButton>
          )}
        </div>
      ))}
      <LanguagesModal
        open={modal}
        onClose={handleClose}
        onConfirm={handleAddField}
        fields={fields}
        title={"addingTitleOnAnotherLang"}
      />
    </Wrapper>
  );
};
