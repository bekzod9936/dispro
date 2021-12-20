//packages
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import {
  Header,
  Durations,
  Fields,
  Selects,
  Radios,
  Toggles,
  Variants,
  Photos,
  Buttons,
} from "./components";

//style
import { Wrapper, Form, Container } from "./style";

//other
import { useCreateItem } from "../../hooks";

interface CreateProps {}

const Create: React.FC<CreateProps> = () => {
  const { t } = useTranslation();

  const form = useCreateItem();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Wrapper>
      <Header />
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <Container>
            <Fields control={form.control} />
            <Selects />
            <Radios />
            <Toggles />
            <Variants />
            <Durations />
            <Photos />
            <Buttons />
          </Container>
        </FormProvider>
      </Form>
    </Wrapper>
  );
};

export default Create;
