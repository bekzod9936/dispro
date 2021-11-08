import { Label } from "./style";

export interface IProps {
  checked?: boolean;
  onChange?: any;
  disabled?: boolean;
  defaultChecked?: boolean
}

const CustomToggle = ({ checked, disabled, onChange = () => { }, defaultChecked }: IProps) => {
  return (
    <Label disabled={disabled} className="toggle-switch">
      <input
        defaultChecked={defaultChecked}
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
