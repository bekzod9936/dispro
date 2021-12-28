import { useState } from "react";

//packages
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
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

interface TitleAndDescriptionProps {}

export const TitleAndDescription: React.FC<TitleAndDescriptionProps> = () => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const { input } = useStyles();
  const {
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext<FormFieldTypes>();
  const error = errors.titles;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "titles",
  });

  const handleAddField = (array: string[]) => {
    let inputs = array.map((e) => ({ title: "", desc: "", lang: e }));
    append(inputs);
    clearErrors("titles");
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
        <div>
          <Controller
            control={control}
            name={`titles.${index}.title`}
            render={({ field }) => (
              <Input
                field={field}
                defaultValue={item.title}
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
                message={error ? t(error[index]?.title?.message || "") : ""}
                error={error && Boolean(error[index]?.title)}
                margin={input.margin(Boolean(error))}
              />
            )}
          />
          <Controller
            control={control}
            name={`titles.${index}.desc`}
            render={({ field }) => (
              <Input
                multiline
                isAbsolute
                defaultValue={item.desc}
                label={t("description") + ` ${item.lang}`}
                field={field}
                inputStyle={input.style(true)}
                error={error && Boolean(error[index]?.desc)}
                message={error ? t(error[index]?.desc?.message || "") : ""}
                labelIcon={
                  index > 0 ? (
                    <ButtonIcon onClick={() => remove(index)}>
                      <RemoveInputIcon />
                    </ButtonIcon>
                  ) : (
                    <MockIcon />
                  )
                }
              />
            )}
          />
          {fields.length <= 2 && index === 0 && (
            <SubButton type="button" onClick={handleOpen}>
              {t("addOnAnotherLang")}
            </SubButton>
          )}
        </div>
      ))}
      <LanguagesModal
        open={modal}
        onClose={handleClose}
        onConfirm={handleAddField}
        fields={fields}
        title={"addingTitleAndDescOnAnotherLang"}
      />
    </Wrapper>
  );
};
