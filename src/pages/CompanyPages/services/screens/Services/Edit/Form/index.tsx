import { useCallback, useState } from "react";

//packages
import { FormProvider } from "react-hook-form";
import { useHistory } from "react-router-dom";

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
import Spinner from "components/Helpers/Spinner";

//style
import { FormStyled, Container } from "./style";

//other
import {
  useEditItem,
  useEditService,
} from "pages/CompanyPages/services/hooks/EditPageHooks";
import { CreateDtoType } from "pages/CompanyPages/services/utils/types";
import { createServiceHelper } from "pages/CompanyPages/services/helpers";

export const Form: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [variantsLength, setVariantsLength] = useState(1);

  const history = useHistory();

  const { form, dispatch, state, isLoaded } = useEditItem(variantsLength);

  const { mutate, isLoading } = useEditService();

  const onSubmit = (data: CreateDtoType) => {
    const transformedData: CreateDtoType = {
      ...data,
      loyaltyOff: state.loyaltyOff,
      loyaltyType: String(state.loyaltyType),
    };

    mutate(createServiceHelper(transformedData), {
      onSettled() {
        history.push("/services/main");
      },
    });
  };

  const handleOpen = useCallback(() => {
    setModal(true);
  }, []);

  const handleClose = () => {
    setModal(false);
  };

  if (!isLoaded) {
    return <Spinner />;
  }

  console.log(form.formState.errors);

  return (
    <div>
      <FormProvider {...form}>
        <FormStyled onSubmit={form.handleSubmit(onSubmit)}>
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
        </FormStyled>
      </FormProvider>
      <SectionModal isSingle onClose={handleClose} isOpen={modal} />
    </div>
  );
};
