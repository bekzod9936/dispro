//packages
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import Input from "components/Custom/Input";

//other
import { SubSectionFormTypes } from "../../utils/types";
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
          message={t(errors[name]?.message || "")}
          field={field}
          isAbsolute
          error={Boolean(errors[name])}
          margin={{ desktop: "0 0 20px 0", laptop: "0 0 20px 0" }}
        />
      )}
    />
  );
};
