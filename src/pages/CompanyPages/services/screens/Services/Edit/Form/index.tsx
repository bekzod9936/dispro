import { useState } from "react";

//packages
import { FormProvider } from "react-hook-form";

//components
import { SectionModal } from "pages/CompanyPages/services/components/Modals/Sections";
import { TitleAndDescription } from "pages/CompanyPages/services/components/TitleAndDescription";
import {
  Buttons,
  Durations,
  Photos,
  Selects,
  Switches,
  Variants,
} from "../../components";

//style
import { FormStyled, Container } from "./style";

//other
import { useEditItem } from "pages/CompanyPages/services/hooks/EditPageHooks";
import Spinner from "components/Helpers/Spinner";

export const Form: React.FC = () => {
  const [modal, setModal] = useState(false);

  const { form, dispatch, state, isLoaded } = useEditItem();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleOpen = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  if (!isLoaded) {
    return <Spinner />;
  }

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
