import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useStyles } from "./style";

interface RadioFieldsProps {
  value: number;
  onChange: (arg: number) => void;
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

export const RadioFields: React.FC<RadioFieldsProps> = ({
  value,
  onChange,
}) => {
  const styles = useStyles();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    onChange(Number(value));
  };

  return (
    <RadioGroup
      value={String(value)}
      onChange={handleChange}
      row
      aria-label="gender"
    >
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
  );
};
