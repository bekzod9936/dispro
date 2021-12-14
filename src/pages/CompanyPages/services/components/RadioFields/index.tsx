import { Controller, useFormContext } from "react-hook-form";
import { FormFieldTypes } from "../../utils/types";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useStyles } from "./style";

interface RadioFieldsProps {
  name: keyof FormFieldTypes;
}

const radioList = [
  {
    value: "1",
    label: "Товар со скидкой",
  },
  {
    value: "2",
    label: "Товар за баллы",
  },
];

export const RadioFields: React.FC<RadioFieldsProps> = ({ name }) => {
  const { control } = useFormContext();
  const styles = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup row aria-label="gender" {...field}>
          {radioList.map((item) => (
            <FormControlLabel
              classes={{ root: styles.label }}
              value={item.value}
              control={
                <Radio
                  color="default"
                  disableRipple
                  checkedIcon={
                    <span className={`${styles.checkedIcon} ${styles.icon}`} />
                  }
                  icon={<span className={styles.icon} />}
                />
              }
              label={item.label}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};
