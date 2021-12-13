//components
import Input from "components/Custom/Input";
import { Languages } from "pages/CompanyPages/services/components/Modals/Languages";
import { SubButton } from "pages/CompanyPages/services/style";
import { useState } from "react";
import { Control, useFieldArray, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormFieldTypes } from "../..";
import { ButtonIcon, MockIcon, RemoveInputIcon, Wrapper } from "./style";

export type descType = {
  lang: string;
  data: string;
};

interface DescsProps {
  control: Control<FormFieldTypes>;
}
export const Descs: React.FC<DescsProps> = ({ control }) => {
  const [modal, setModal] = useState(false);
  const { t } = useTranslation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "descriptions",
  });

  const handleAddInput = (array: string[]) => {
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
    <Wrapper isMultiple={fields.length > 1}>
      {fields.map((item, index) => (
        <div key={item.id}>
          <Controller
            name={`descriptions.${index}.data`}
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
                label={t("description") + ` ${item.lang}`}
                multiline
                isAbsolute
                type="textarea"
                inputStyle={{
                  height: { desktop: 124, laptop: 124 },
                  inpadding: "10px 15px",
                }}
              />
            )}
          />
          {index === 0 && fields.length <= 2 && (
            <SubButton onClick={handleOpen}>
              {t("addDescOnAnotherLang")}
            </SubButton>
          )}
        </div>
      ))}
      <Languages
        onConfirm={handleAddInput}
        title="addingDescOnAnotherLang"
        open={modal}
        onClose={handleClose}
        fields={fields}
      />
    </Wrapper>
  );
};
