import Button from "components/Custom/Button";
import { SettingsIcon } from "./style";

interface Props {
  onClick?: () => void;
  mobile?: boolean;
  margin?: any;
  text: string;
}

const SettingButton = ({ onClick = () => {}, mobile, margin, text }: Props) => {
  return (
    <Button
      buttonStyle={{
        color: "#606EEA",
        bgcolor: "rgba(96, 110, 234, 0.1)",
        weight: "500",
      }}
      onClick={onClick}
      margin={{ mobile: "0 10px 0 0", planshet: "0 10px 0 0" }}
    >
      {text}
      <SettingsIcon />
    </Button>
  );
};

export default SettingButton;
