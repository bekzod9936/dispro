//packages

//components
import { Header } from "./components/Header";
import { EmptyPage } from "./components/EmptyPage";
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

  const { total, goods } = useGetItems();

  console.log(goods);

  return (
    <Wrapper>
      <Header total={total} value={value} onChange={onChange} />
      <Container>
        <Goods
          goods={goods}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        {/* <EmptyPage /> */}
      </Container>
    </Wrapper>
  );
};

export default Main;
