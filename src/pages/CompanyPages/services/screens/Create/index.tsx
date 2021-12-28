//components
import { Header } from "./components/Header";
import { Form } from "./components/Form";

//style
import { Wrapper } from "./style";
import { useCreateItem } from "../../hooks";

interface CreateProps {}

const Create: React.FC<CreateProps> = () => {
  const form = useCreateItem();

  return (
    <Wrapper>
      <Header />
      <Form form={form} />
    </Wrapper>
  );
};

export default Create;
