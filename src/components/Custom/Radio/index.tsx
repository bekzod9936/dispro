import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Container } from "./style";
import { Props } from "./types";

const MRadio = ({
  title,
  list,
  onChange = () => {},
  labelPlacement,
  value,
  flexDirection = "row",
  marginlabel,
  textTransform,
  formControlMarginRight,
}: Props) => {
  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <Container
      formControlMarginRight={formControlMarginRight}
      textTransform={textTransform}
      marginlabel={marginlabel}
      flexDirection={flexDirection}
    >
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
