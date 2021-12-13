import Input from "components/Custom/Input";
import { Languages } from "pages/CompanyPages/services/components/Modals/Languages";
import { ButtonIcon, SubButton } from "pages/CompanyPages/services/style";
import { useState } from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormFieldTypes } from "../..";
import { RemoveInputIcon, Wrapper } from "./style";

interface TitlesProps {
  control: Control<FormFieldTypes>;
}
export type titleType = {
  title: string;
  lang: string;
};

interface ILanguages {
  [index: number]: string;
}
const languages: ILanguages = { 0: "(Рус)", 1: "(Uzb)", 2: "(Eng)" };

export const Titles: React.FC<TitlesProps> = ({ control }) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "titles",
  });

  const handleOpen = () => {
    setModal(true);
  };

  return (
    <Wrapper isMultiple={fields.length > 1}>
      {fields.map((item, index) => (
        <div key={item.id}>
          <Controller
            name={`titles.${index}.title`}
            render={({ field }) => (
              <Input
                field={field}
                label={t("title") + ` ${item.lang}`}
                isAbsolute
                IconEnd={
                  index > 0 && (
                    <ButtonIcon onClick={() => remove(index)}>
                      <RemoveInputIcon />
                    </ButtonIcon>
                  )
                }
              />
            )}
          />
          {fields.length <= 2 && index === 0 && (
            <SubButton onClick={handleOpen}>
              {t("addTitleOnAnotherLang")}
            </SubButton>
          )}
        </div>
      ))}
      <Languages open={modal} title="addingTitleOnAnotherLang" />
    </Wrapper>
  );
};
