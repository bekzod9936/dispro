//components
import { Header } from "./components/Header";
import { Goods } from "./components/Goods";

//other
import { useCurrentSection, useSearch } from "../../hooks";
import { useGetItems } from "../../hooks/MainPageHooks";

//style
import { Wrapper, Container } from "./style";
import { Sections } from "../../components/Sections";

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const { query, onChange, value } = useSearch();
  const { currentSection, setCurrentSection } = useCurrentSection();

  const { total, goods, isLoading } = useGetItems(query);

  console.log("mount main");
  return (
    <Wrapper>
      <Header
        isLoading={isLoading}
        total={total}
        value={value}
        onChange={onChange}
      />
      <Container>
        <Sections
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        <Goods isLoading={isLoading} goods={goods} />
      </Container>
    </Wrapper>
  );
};

export default Main;
