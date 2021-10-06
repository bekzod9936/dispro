export interface IProps {
  checked: boolean;
  onChange: any;
}

const CustomToggle = ({ checked, onChange = () => {} }: IProps) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="switch" />
    </label>
  );
};

export default CustomToggle;
