import { ICheck } from "./type";
//hooks
// import useLoyality from "../../hooks/useLoyality";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import {
  handleModal,
  setBallCheck,
  setCashbackCheck,
  setSaleCheck,
} from "services/redux/Slices/settingsSlice";

const useMobileContent = () => {
  const dispatch = useAppDispatch();
  const cashbackCheck = useAppSelector((state) => state.settings.cashbackCheck);
  const saleCheck = useAppSelector((state) => state.settings.saleCheck);
  const ballCheck = useAppSelector((state) => state.settings.ballCheck);

  const emptyCashbackCheck = useAppSelector(
    (state) => state.settings.emptyCashback
  );
  const emptySaleCheck = useAppSelector((state) => state.settings.emptySale);
  const emptyBallCheck = useAppSelector((state) => state.settings.emptyBall);

  const handleCheck = ({ checked, type }: ICheck) => {
    if (type === "bonuspoint") {
      if (ballCheck || emptyBallCheck) {
        dispatch(setBallCheck(checked));
        if (checked) {
          dispatch(setCashbackCheck(!checked));
          dispatch(setSaleCheck(!checked));
        }
      } else {
        dispatch(handleModal(checked));
      }
    } else if (type === "cashback") {
      if (cashbackCheck || emptyCashbackCheck) {
        dispatch(setCashbackCheck(checked));
        if (checked) {
          dispatch(setBallCheck(!checked));
          dispatch(setSaleCheck(!checked));
        }
      } else {
        dispatch(handleModal(checked));
      }
    } else if (type === "discount") {
      if (saleCheck || emptySaleCheck) {
        dispatch(setSaleCheck(checked));
        if (checked) {
          dispatch(setBallCheck(!checked));
          dispatch(setCashbackCheck(!checked));
        }
      } else {
        dispatch(handleModal(checked));
      }
    }
  };

  return {
    // toggle state
    handleCheck,
  };
};

export default useMobileContent;
