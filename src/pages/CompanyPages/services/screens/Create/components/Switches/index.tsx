import {
  ActionType,
  ActionTypes,
  IState,
} from "pages/CompanyPages/services/hooks/CreatePageHooks/reducer";
import { FormFieldTypes } from "pages/CompanyPages/services/utils/types";
import { Dispatch, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Radios } from "../Radios";
import { Toggles } from "../Toggles";

interface SwitchesProps {
  state: IState;
  dispatch: Dispatch<ActionType>;
}

export const Switches: React.FC<SwitchesProps> = ({ dispatch, state }) => {
  const { setValue } = useFormContext<FormFieldTypes>();

  const handleDispatchLoyaltyType = (payload: number) => {
    dispatch({
      type: ActionTypes.CHANGE_LOYALTY_TYPE,
      payload: payload,
    });
    setValue("loyaltyType", payload);
  };

  const handleDispatchLoyaltyOff = (payload: boolean) => {
    dispatch({
      type: ActionTypes.CHANGE_LOYALTY_OFF,
      payload: payload,
    });
  };

  return (
    <>
      <Radios value={state.loyaltyType} onChange={handleDispatchLoyaltyType} />
      <Toggles value={state.loyaltyOff} onChange={handleDispatchLoyaltyOff} />
    </>
  );
};
