//components
import CustomToggle from "components/Custom/CustomToggleSwitch";

//style
import { LightToolTip, QuestionMarkIcon, Wrapper } from "./style";

interface TogglesProps {
  onChange: (arg: boolean) => void;
  value: boolean;
}

export const Toggles: React.FC<TogglesProps> = ({ onChange, value }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <Wrapper>
      <CustomToggle checked={value} onChange={handleChange} />
      <p>Не применять программу лояльности</p>
      <LightToolTip
        placement="top"
        arrow
        title="При заказе этих товаров на их стоимость не будет начислятся cкидка/кешбэк/ баллы, а так же за товар нельзя оплатить баллами"
      >
        <QuestionMarkIcon />
      </LightToolTip>
    </Wrapper>
  );
};
