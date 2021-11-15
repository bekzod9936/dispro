import { useState } from "react";
import { ICheck, ISetting } from "./type";
//hooks
import useLoyality from "../../hooks/useLoyality";

const useMobileContent = () => {
  const {} = useLoyality();

  const [ballCheck, setBallCheck] = useState(false);
  const [cashbackCheck, setCashbackCheck] = useState(false);
  const [saleCheck, setSaleCheck] = useState(false);

  const [openCashback, setOpenCashback] = useState<ISetting>({
    type: "other",
    open: false,
  });

  const handleClick = (type: "cashback" | "other", open: boolean) => {
    if (open) {
      setOpenCashback({
        type: "cashback",
        open: false,
      });
    } else {
      if (type === "cashback") {
        setOpenCashback({
          type: "cashback",
          open: true,
        });
      } else {
        setOpenCashback({
          type: "other",
          open: true,
        });
      }
    }
  };

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

    //click configure
    openCashback,
    handleClick,
  };
};

export default useMobileContent;
