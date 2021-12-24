//packages
import { Controller, FieldError, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import InputFormat from "components/Custom/InputFormat";

//style
import { useStyles } from "./style";

//other
import { FormFieldTypes } from "../../utils/types";

interface DurationProps {
  name: `preparationTimeData.${"day" | "hour" | "minute"}`;
  label: string;
  error: FieldError | undefined;
}

export const Duration: React.FC<DurationProps> = ({ name, label, error }) => {
  const { control } = useFormContext<FormFieldTypes>();
  const { t } = useTranslation();
  const styles = useStyles();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputFormat
            error={Boolean(error)}
            message={t(error?.message || "")}
            isAbsolute
            onChange={field.onChange}
            value={field.value}
            IconEnd={<span className={styles.root}>{t(label)}</span>}
          />
        )}
      />
    </div>
  );
};
