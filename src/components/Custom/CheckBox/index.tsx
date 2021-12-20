import { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Container } from './style';

interface Props {
  styles?: any;
  id?: string;
  onChange?: (e: any) => void;
  name?: string;
  label?: any;
  checked?: boolean;
  checkedIcon?: any;
  disabled?: boolean;
  required?: boolean;
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
  value?: any;
  ref?: any;
  icon?: any;
}

const CheckBox = ({
  onChange = () => {},
  name,
  label,
  labelPlacement,
  checked,
  ref,
  disabled,
  checkedIcon,
  icon,
  styles,
}: Props) => {
  const [state, setState] = useState(disabled || checked);
  const handleChange = (e: any) => {
    if (disabled) {
      return;
    }
    onChange(e);
    console.log(e);
    setState(e.target.checked);
  };

  return (
    <Container>
      <FormControlLabel
        classes={{ root: styles }}
        control={
          <Checkbox
            disabled={disabled}
            ref={ref}
            checked={state}
            onChange={handleChange}
            name={name}
            checkedIcon={checkedIcon}
            icon={icon}
          />
        }
        labelPlacement={labelPlacement}
        label={label}
      />
    </Container>
  );
};

export default CheckBox;
