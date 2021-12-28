import { SectionModal } from "pages/CompanyPages/services/components/Modals/Sections";
import { TitleAndDescription } from "pages/CompanyPages/services/components/TitleAndDescription";
import {
  initialState,
  reducer,
} from "pages/CompanyPages/services/hooks/CreatePageHooks/reducer";
import { useEditItem } from "pages/CompanyPages/services/hooks/EditPageHooks";
import { useEffect, useReducer, useState } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  Buttons,
  Durations,
  Photos,
  Selects,
  Switches,
  Variants,
} from "../../components";
import { FormStyled, Container } from "./style";
import { TextField } from "@material-ui/core";
import Input from "components/Custom/Input";

export const Form: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const form = useEditItem();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };

  console.log(form.formState.errors);

  return (
    <div>
      <FormProvider {...form}>
        <FormStyled onSubmit={form.handleSubmit(onSubmit)}>
          <Container>
            <TitleAndDescription />
            <Selects handleOpen={handleOpen} />
            <Switches dispatch={dispatch} state={state} />
            <Variants disabled={state.loyaltyType !== 1} />
            {/* <Durations /> */}
            {/* <Photos /> */}
            <Buttons isLoading={false} />
          </Container>
        </FormStyled>
      </FormProvider>
      {/* <SectionModal isSingle onClose={handleClose} isOpen={modal} /> */}
    </div>
  );
};
