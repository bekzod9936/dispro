import { ICheck } from "./type";
//hooks
// import useLoyality from "../../hooks/useLoyality";
import { useAppDispatch } from "services/redux/hooks";
import {
  setBallCheck,
  setCashbackCheck,
  setSaleCheck,
} from "services/redux/Slices/settingsSlice";

const useMobileContent = () => {
  const dispatch = useAppDispatch();

  const handleCheck = ({ checked, type }: ICheck) => {
    if (type === "bonuspoint") {
      dispatch(setBallCheck(checked));
      if (checked) {
        dispatch(setCashbackCheck(!checked));
        dispatch(setSaleCheck(!checked));
      }
    } else if (type === "cashback") {
      dispatch(setCashbackCheck(checked));
      if (checked) {
        dispatch(setBallCheck(!checked));
        dispatch(setSaleCheck(!checked));
      }
    } else if (type === "discount") {
      dispatch(setSaleCheck(checked));
      if (checked) {
        dispatch(setBallCheck(!checked));
        dispatch(setCashbackCheck(!checked));
      }
    }
  };

  return {
    // toggle state
    handleCheck,
  };
};

export default useMobileContent;
