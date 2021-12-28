//components
import { Header } from "../components";
import { Form } from "./Form";

//style
import { Wrapper } from "./style";

interface CreateProps {}

const Create: React.FC<CreateProps> = () => {
  console.log("mount create");
  return (
    <Wrapper>
      <Header />
      <Form />
    </Wrapper>
  );
};

export default Create;
