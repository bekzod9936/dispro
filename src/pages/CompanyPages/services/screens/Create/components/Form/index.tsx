import { useReducer } from "react";

//packages
import { FormProvider } from "react-hook-form";

//style
import { Container, FormStyled } from "./style";

//other
import {
  initialState,
  reducer,
} from "pages/CompanyPages/services/hooks/CreatePageHooks/reducer";
import { useCreateItem } from "../../../../hooks";

//components
import { Fields } from "../Fields";
import { Selects } from "../Selects";
import { Variants } from "../Variants";
import { Durations } from "../Durations";
import { Photos } from "../Photos";
import { Buttons } from "../Buttons";
import { Switches } from "../Switches";

interface FormProps {}

export const Form: React.FC<FormProps> = () => {
  const form = useCreateItem();
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormStyled onSubmit={form.handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        <Container>
          <Fields control={form.control} />
          <Selects />
          <Switches dispatch={dispatch} state={state} />
          <Variants disabled={state.loyaltyType !== 1} />
          <Durations />
          <Photos />
          <Buttons />
        </Container>
      </FormProvider>
    </FormStyled>
  );
};
