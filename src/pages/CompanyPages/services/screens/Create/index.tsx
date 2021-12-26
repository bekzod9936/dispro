//components
import { Header } from "./components/Header";
import { Form } from "./components/Form";

//style
import { Wrapper } from "./style";

interface CreateProps {}

const Create: React.FC<CreateProps> = () => {
  return (
    <Wrapper>
      <Header />
      <Form />
    </Wrapper>
  );
};

export default Create;
