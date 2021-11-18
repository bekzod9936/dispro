import { useMutation } from "react-query";
import { changeProgramLoyality } from "services/queries/settingsQuery";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import {
  handleModal,
  setBallCheck,
  setCashbackCheck,
  setSaleCheck,
} from "services/redux/Slices/settingsSlice";

const useChangeLoyalty = () => {
  const dispatch = useAppDispatch();
  const toggleName = useAppSelector((state) => state.settings.toggleName);
  const checked = true;

  const changeLoyal = useMutation(
    (data: any) =>
      changeProgramLoyality({ bonusType: data.bonusType, data: data.data }),
    {
      onSuccess: (data) => {
        dispatch(handleModal(false));

        if (toggleName.name === "bonuspoint") {
          dispatch(setBallCheck(checked));
          if (checked) {
            dispatch(setCashbackCheck(!checked));
            dispatch(setSaleCheck(!checked));
          }
        } else if (toggleName.name === "cashback") {
          dispatch(setCashbackCheck(checked));
          if (checked) {
            dispatch(setBallCheck(!checked));
            dispatch(setSaleCheck(!checked));
          }
        } else if (toggleName.name === "discount") {
          dispatch(setSaleCheck(checked));
          if (checked) {
            dispatch(setBallCheck(!checked));
            dispatch(setCashbackCheck(!checked));
          }
        }
      },
    }
  );
  return {
    changeLoyal,
  };
};

export default useChangeLoyalty;
