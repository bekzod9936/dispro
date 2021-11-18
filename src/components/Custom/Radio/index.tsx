import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Container } from "./style";

interface Props {
  title?: string;
  list?: { value?: string | number; label?: string | number }[];
  onChange?: (e: any) => void;
  value?: any;
  required?: boolean;
  name?: string;
  id?: string;
  icon?: any;
  disableRipple?: boolean;
  disabled?: boolean;
  checkedIcon?: any;
  checked?: boolean;
  defaultValue?: string | number;
  labelPlacement?: "bottom" | "end" | "start" | "top";
  flexDirection: "row" | "column";
}

const MRadio = ({
  title,
  list,
  onChange = () => {},
  labelPlacement,
  value,
  flexDirection = "row",
}: Props) => {
  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <Container flexDirection={flexDirection}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        <RadioGroup
          row
          aria-label={title}
          name={title}
          value={value}
          onChange={handleChange}
        >
          {list?.map((v: any) => (
            <FormControlLabel
              value={v.value}
              labelPlacement={labelPlacement}
              control={<Radio />}
              label={v.label}
              key={v.value}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Container>
  );
};

export default MRadio;
