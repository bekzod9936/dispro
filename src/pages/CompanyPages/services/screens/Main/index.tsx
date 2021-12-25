//components
import { Header } from "./components/Header";
import { Goods } from "./components/Goods";

//other
import { useCurrentSection, useSearch } from "../../hooks";
import { useGetItems } from "../../hooks/MainPageHooks";

//style
import { Wrapper, Container } from "./style";

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const { query, onChange, value } = useSearch();
  const { currentSection, setCurrentSection } = useCurrentSection();

  const { total, goods, isLoading } = useGetItems();

  return (
    <Wrapper>
      <Header total={total} value={value} onChange={onChange} />
      <Container>
        <Goods
          isLoading={isLoading}
          goods={goods}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
      </Container>
    </Wrapper>
  );
};

export default Main;
