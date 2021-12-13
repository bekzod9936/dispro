//components
import Input from "components/Custom/Input";
import { SubButton } from "pages/CompanyPages/services/style";
import { Control, useFieldArray, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormFieldTypes } from "../..";
import { Wrapper } from "./style";

export type descType = {
  lang: string;
  body: string;
};

interface DescsProps {
  control: Control<FormFieldTypes>;
}
export const Descs: React.FC<DescsProps> = ({ control }) => {
  const { t } = useTranslation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "descriptions",
  });
  console.log(fields);

  return (
    <Wrapper>
      {fields.map((item, index) => (
        <Controller
          name={`descriptions.${index}.body`}
          render={({ field }) => (
            <Input
              label={t("description") + ` ${item.lang}`}
              multiline
              type="textarea"
              inputStyle={{
                height: { desktop: 124, laptop: 124 },
                inpadding: "10px 15px",
              }}
            />
          )}
        />
      ))}
    </Wrapper>
  );
};

{
  /* <Input
        label={t("description") + " (Рус)"}
        multiline
        type="textarea"
        inputStyle={{
          height: { desktop: 124, laptop: 124 },
          inpadding: "10px 15px",
        }}
      />
      <SubButton>{t("addDescOnAnotherLang")}</SubButton> */
}
