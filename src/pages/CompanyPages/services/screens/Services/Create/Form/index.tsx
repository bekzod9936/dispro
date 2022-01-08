import { useReducer, useState } from "react";

//packages
import { Controller, FormProvider } from "react-hook-form";
import { useHistory } from "react-router-dom";

//style
import { Container, FormStyled } from "./style";

//other
import {
  initialState,
  reducer,
} from "pages/CompanyPages/services/hooks/CreatePageHooks/reducer";
import { CreateDtoType } from "pages/CompanyPages/services/utils/types";
import { createServiceHelper } from "pages/CompanyPages/services/helpers";
import { useCreateService } from "pages/CompanyPages/services/hooks/CreatePageHooks/mutations";
import { useCreateItem } from "pages/CompanyPages/services/hooks";

//components
import {
  Buttons,
  Durations,
  Photos,
  Selects,
  Switches,
  Variants,
} from "../../components";
import { TitleAndDescription } from "pages/CompanyPages/services/components/TitleAndDescription";
import { SectionModal } from "pages/CompanyPages/services/components/Modals/Sections";

interface FormProps {}

export const Form: React.FC<FormProps> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [modal, setModal] = useState(false);
  const [variantsLength, setVariantsLength] = useState(1);

  const form = useCreateItem(variantsLength);

  const history = useHistory();

  const { mutate, isLoading } = useCreateService();

  const onSubmit = (data: CreateDtoType) => {
    const transformedData: CreateDtoType = {
      ...data,
      loyaltyOff: state.loyaltyOff,
      loyaltyType: String(state.loyaltyType),
    };

    mutate(createServiceHelper(transformedData), {
      onSuccess: () => {
        history.push("main");
      },
    });
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleOpen = () => {
    setModal(true);
  };

  console.log(form.formState.errors);

  return (
    <>
      <FormStyled autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <Container>
            <TitleAndDescription />
            <Selects handleOpen={handleOpen} />
            <Switches dispatch={dispatch} state={state} />
            <Variants
              setVariantsLength={setVariantsLength}
              disabled={state.loyaltyType !== 1}
            />
            <Durations />
            <Photos />
            <Buttons isLoading={isLoading} />
          </Container>
        </FormProvider>
      </FormStyled>
      <SectionModal isSingle onClose={handleClose} isOpen={modal} />
    </>
  );
};
