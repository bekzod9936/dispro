import CustomToggle from "components/Custom/CustomToggleSwitch";
import { Controller, useFormContext } from "react-hook-form";
import { LightToolTip, QuestionMarkIcon, Wrapper } from "./style";

interface TogglesProps {}
export const Toggles: React.FC<TogglesProps> = () => {
  const { control } = useFormContext();
  return (
    <Wrapper>
      <Controller
        name="loyaltyOff"
        control={control}
        render={({ field }) => <CustomToggle {...field} />}
      />
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
