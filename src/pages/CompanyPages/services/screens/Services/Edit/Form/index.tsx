import { SectionModal } from "pages/CompanyPages/services/components/Modals/Sections";
import { TitleAndDescription } from "pages/CompanyPages/services/components/TitleAndDescription";
import {
  initialState,
  reducer,
} from "pages/CompanyPages/services/hooks/CreatePageHooks/reducer";
import {
  useEditItem,
  useGetItemById,
} from "pages/CompanyPages/services/hooks/EditPageHooks";
import { useReducer, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
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

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };

  console.log(form.watch());

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
