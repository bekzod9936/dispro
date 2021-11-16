import { useState } from "react";
import { ICheck, ISetting } from "./type";
//hooks
import useLoyality from "../../hooks/useLoyality";

const useMobileContent = () => {
  const {} = useLoyality();

  const [ballCheck, setBallCheck] = useState(false);
  const [cashbackCheck, setCashbackCheck] = useState(false);
  const [saleCheck, setSaleCheck] = useState(false);

  const handleCheck = ({ checked, type }: ICheck) => {
    if (type === "bonuspoint") {
      setBallCheck(checked);
      if (checked) {
        setCashbackCheck(!checked);
        setSaleCheck(!checked);
      }
    } else if (type === "cashback") {
      setCashbackCheck(checked);
      if (checked) {
        setBallCheck(!checked);
        setSaleCheck(!checked);
      }
    } else if (type === "discount") {
      setSaleCheck(checked);
      if (checked) {
        setBallCheck(!checked);
        setCashbackCheck(!checked);
      }
    }
  };

  return {
    // toggle state
    ballCheck,
    cashbackCheck,
    saleCheck,
    handleCheck,
  };
};

export default useMobileContent;
