//packages

//components
import { Header } from "./components/Header";
import { EmptyPage } from "./components/EmptyPage";

//style
import { Wrapper, Container } from "./style";
import { useGetSections } from "../../hooks";
import { Goods } from "./components/Goods";

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const _ = useGetSections();

  return (
    <Wrapper>
      <Header />
      <Container>
        <Goods />
        {/* <EmptyPage /> */}
      </Container>
    </Wrapper>
  );
};

export default Main;
