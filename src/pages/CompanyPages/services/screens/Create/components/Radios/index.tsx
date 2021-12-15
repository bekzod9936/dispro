import { RadioFields } from "pages/CompanyPages/services/components/RadioFields";
import React from "react";
import { LightToolTip, QuestionMarkIcon } from "./style";
import { Wrapper } from "./style";

interface RadiosProps {}

export const Radios: React.FC<RadiosProps> = () => {
  return (
    <Wrapper>
      <RadioFields name="loyaltyType" />
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
