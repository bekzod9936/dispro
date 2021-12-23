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

  const { data } = useGetItems();
  const total = data?.totalCount || 0;

  return (
    <Wrapper>
      <Header total={total} value={value} onChange={onChange} />
      <Container>
        <Goods
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        {/* <EmptyPage /> */}
      </Container>
    </Wrapper>
  );
};

export default Main;
