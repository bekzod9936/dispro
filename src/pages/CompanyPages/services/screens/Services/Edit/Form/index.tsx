import { TextField } from "@material-ui/core";
import { SectionModal } from "pages/CompanyPages/services/components/Modals/Sections";
import { TitleAndDescription } from "pages/CompanyPages/services/components/TitleAndDescription";
import { resetDefaultValues } from "pages/CompanyPages/services/helpers";
import {
  initialState,
  reducer,
} from "pages/CompanyPages/services/hooks/CreatePageHooks/reducer";
import {
  useEditItem,
  useGetItemById,
} from "pages/CompanyPages/services/hooks/EditPageHooks";
import { useEffect, useReducer, useState } from "react";
import { Controller, FormProvider, useFieldArray } from "react-hook-form";
import {
  Buttons,
  Durations,
  Photos,
  Selects,
  Switches,
  Variants,
} from "../../components";
import { FormStyled, Container } from "./style";

export const Form: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const form = useEditItem();

  const onSubmit = (data: any) => {};

  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };

  return (
    <>
      <FormStyled autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <Container>
            <TitleAndDescription />
            <Selects handleOpen={handleOpen} />
            <Switches dispatch={dispatch} state={state} />
            <Variants disabled={state.loyaltyType !== 1} />
            {/* <Durations /> */}
            {/* <Photos /> */}
            <Buttons isLoading={false} />
          </Container>
        </FormProvider>
      </FormStyled>
      <SectionModal isSingle onClose={handleClose} isOpen={modal} />
    </>
  );
};
