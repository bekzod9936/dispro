//packages
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import { Header } from "./components/Header";
import { Button } from "@material-ui/core";

//style
import { Wrapper, Form, Container } from "./style";

//other
import { FormFieldTypes } from "../../utils/types";
import { Fields } from "./components/Fields";
import { Selects } from "./components/Selects";
import { Radios } from "./components/Radios";
import { Toggles } from "./components/Toggles";
import { Variants } from "./components/Variants";
import InputFormat from "components/Custom/InputFormat";
import { Durations } from "./components/Durations";

interface CreateProps {}

const Create: React.FC<CreateProps> = () => {
  const { t } = useTranslation();

  const form = useForm<FormFieldTypes>({
    mode: "onChange",
    defaultValues: {
      titles: [{ data: "lorem", lang: "(Рус)" }],
      descriptions: [{ data: "", lang: "(Рус)" }],
      variants: [
        {
          name: [{ data: "", lang: "(Рус)" }],
          amount: "",
          price: "",
          priceWithSale: "",
          articul: "",
        },
      ],
      loyaltyOff: false,
    },
  });

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
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Container>
        </FormProvider>
      </Form>
    </Wrapper>
  );
};

export default Create;
