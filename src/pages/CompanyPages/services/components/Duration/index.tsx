import InputFormat from "components/Custom/InputFormat";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormFieldTypes } from "../../utils/types";
import { useStyles } from "./style";

interface DurationProps {
  name: `preparationTime.${number}.${"days" | "hours" | "minutes"}`;
  label: string;
}

export const Duration: React.FC<DurationProps> = ({ name, label }) => {
  const { control } = useFormContext<FormFieldTypes>();
  const { t } = useTranslation();
  const styles = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputFormat
          isAbsolute
          onChange={field.onChange}
          value={field.value}
          IconEnd={<span className={styles.root}>{t(label)}</span>}
        />
      )}
    />
  );
};
