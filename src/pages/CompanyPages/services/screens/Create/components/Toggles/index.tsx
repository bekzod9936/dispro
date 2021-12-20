//packages
import { Controller, useFormContext } from "react-hook-form";

//components
import CustomToggle from "components/Custom/CustomToggleSwitch";

//style
import { LightToolTip, QuestionMarkIcon, Wrapper } from "./style";

//other
import { FormFieldTypes } from "pages/CompanyPages/services/utils/types";

interface TogglesProps {}

export const Toggles: React.FC<TogglesProps> = () => {
  const { control } = useFormContext<FormFieldTypes>();

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
