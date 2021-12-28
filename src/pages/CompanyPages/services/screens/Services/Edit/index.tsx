import { Header } from "../components";
import { Form } from "./Form";
import { Wrapper } from "./style";
const Edit: React.FC = () => {
  console.log("mount edit");
  return (
    <Wrapper>
      <Header />
      <Form />
    </Wrapper>
  );
};

export default Edit;
