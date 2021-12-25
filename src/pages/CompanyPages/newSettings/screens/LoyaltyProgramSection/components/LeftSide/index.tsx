import React, { useState } from "react";
import CustomToggle from "components/Custom/CustomToggleSwitch";

import { GroupToggle, ToggleInfo } from "../../style";

const Left = () => {
  const [discounts, setDiscounts] = useState(false);


  const handleChangeDiscount = (e: any) => {
    setDiscounts(e.target.checked);
  };
  return (
    <>
      <GroupToggle>
        <CustomToggle checked={discounts} onChange={handleChangeDiscount} />
        <ToggleInfo>
          <h5>Предоставление скидки</h5>
          <p>
            Клиент получает скидку при каждой покупке в размере определенного %
          </p>
        </ToggleInfo>
      </GroupToggle>
      <GroupToggle>
        <CustomToggle checked={discounts} onChange={handleChangeDiscount} />
        <ToggleInfo>
          <h5>Предоставление кешбэка</h5>
          <p>
            Клиент получает кешбэк в виде реальных денег после каждой покупки
          </p>
        </ToggleInfo>
      </GroupToggle>
      <GroupToggle>
        <CustomToggle checked={discounts} onChange={handleChangeDiscount} />
        <ToggleInfo>
          <h5>Предоставление баллов</h5>
          <p>
            Клиент получает баллы после каждой покупки которые может потратить
            только у вас в компании
          </p>
        </ToggleInfo>
      </GroupToggle>
    </>
  );
};
export default Left;
