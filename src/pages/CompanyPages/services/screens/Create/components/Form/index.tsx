import { useReducer } from "react";

//packages
import { FormProvider } from "react-hook-form";
import { useHistory } from "react-router-dom";

//style
import { Container, FormStyled } from "./style";

//other
import {
  initialState,
  reducer,
} from "pages/CompanyPages/services/hooks/CreatePageHooks/reducer";
import { useCreateItem } from "../../../../hooks";
import { CreateDtoType } from "pages/CompanyPages/services/utils/types";
import { createServiceHelper } from "pages/CompanyPages/services/helpers";
import { useCreateService } from "pages/CompanyPages/services/hooks/CreatePageHooks/mutations";

//components
import { Selects } from "../Selects";
import { Variants } from "../Variants";
import { Durations } from "../Durations";
import { Photos } from "../Photos";
import { Buttons } from "../Buttons";
import { Switches } from "../Switches";
import { TitleAndDescription } from "pages/CompanyPages/services/components/TitleAndDescription";

interface FormProps {}

export const Form: React.FC<FormProps> = () => {
  const form = useCreateItem();
  const [state, dispatch] = useReducer(reducer, initialState);

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

  return (
    <FormStyled onSubmit={form.handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        <Container>
          <TitleAndDescription />
          <Selects />
          <Switches dispatch={dispatch} state={state} />
          <Variants disabled={state.loyaltyType !== 1} />
          <Durations />
          <Photos />
          <Buttons isLoading={isLoading} />
        </Container>
      </FormProvider>
    </FormStyled>
  );
};
