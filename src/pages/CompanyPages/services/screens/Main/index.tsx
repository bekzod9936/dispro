//packages

//components
import { Header } from "./components/Header";
import { EmptyPage } from "./components/EmptyPage";

//style
import { Wrapper, Container } from "./style";
import { useGetSections, useSearch } from "../../hooks";
import { Goods } from "./components/Goods";

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const { query, onChange, value } = useSearch();

  return (
    <Wrapper>
      <Header value={value} onChange={onChange} />
      <Container>
        <Goods />
        {/* <EmptyPage /> */}
      </Container>
    </Wrapper>
  );
};

export default Main;
