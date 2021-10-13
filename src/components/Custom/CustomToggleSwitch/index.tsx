import { Label } from "./style";

export interface IProps {
  checked?: boolean;
  onChange?: any;
  disabled?: boolean;
}

const CustomToggle = ({ checked, disabled, onChange = () => {} }: IProps) => {
  return (
    <Label disabled={disabled} className="toggle-switch">
      <input
        disabled={disabled}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="switch" />
    </Label>
  );
};

export default CustomToggle;
