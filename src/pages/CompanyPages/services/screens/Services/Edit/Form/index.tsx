import { SectionModal } from "pages/CompanyPages/services/components/Modals/Sections";
import { TitleAndDescription } from "pages/CompanyPages/services/components/TitleAndDescription";

import { useEditItem } from "pages/CompanyPages/services/hooks/EditPageHooks";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
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

  const { form, dispatch, state } = useEditItem();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleOpen = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  return (
    <div>
      <FormProvider {...form}>
        <FormStyled onSubmit={form.handleSubmit(onSubmit)}>
          <Container>
            <TitleAndDescription />
            <Selects handleOpen={handleOpen} />
            <Switches dispatch={dispatch} state={state} />
            <Variants disabled={state.loyaltyType !== 1} />
            <Durations />
            <Photos />
            <Buttons isLoading={false} />
          </Container>
        </FormStyled>
      </FormProvider>
      <SectionModal isSingle onClose={handleClose} isOpen={modal} />
    </div>
  );
};
