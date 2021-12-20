//packages
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import Input from "components/Custom/Input";

//style
import { ButtonIcon, Field, RemoveInputIcon } from "./style";
import { SubButton } from "../../style";

//other
import { isFieldLast } from "../../helpers";

interface SectionFieldProps {
  name: `sections.${number}.title`;
  index: number;
  lengthOfFields: number;
  isSingle: boolean;
  remove: (arg: number) => void;
  append: () => void;
}

export const SectionField: React.FC<SectionFieldProps> = ({
  name,
  index,
  lengthOfFields,
  isSingle,
  append,
  remove,
}) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Field>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            isAbsolute
            error={Boolean(errors?.sections?.[index]?.title)}
            message={t(errors?.sections?.[index]?.title?.message + "")}
            field={field}
            label={t("sectionName")}
            IconEnd={
              lengthOfFields > 1 ? (
                <ButtonIcon onClick={() => remove(index)}>
                  <RemoveInputIcon />
                </ButtonIcon>
              ) : undefined
            }
          />
        )}
      />
      {!isSingle && isFieldLast(19, index + 1, lengthOfFields) && (
        <SubButton type="button" onClick={append}>
          {t("createAnother")}
        </SubButton>
      )}
    </Field>
  );
};
