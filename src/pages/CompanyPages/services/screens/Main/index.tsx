//packages

//components
import { Header } from "./components/Header";
import { EmptyPage } from "./components/EmptyPage";
import { Goods } from "./components/Goods";

//other
import { useCurrentSection, useGetSections, useSearch } from "../../hooks";
import { useGetItems } from "../../hooks/MainPageHooks";

//style
import { Wrapper, Container } from "./style";
import { useMemo } from "react";
import Spinner from "components/Helpers/Spinner";

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const { query, onChange, value } = useSearch();
  const { currentSection, setCurrentSection } = useCurrentSection();

  const { total, goods, isLoading: isGoodsLoading } = useGetItems();
  const isUserHasGoods = useMemo(() => Object.keys(goods).length > 0, [goods]);
  const { isLoading: isSectionsLoading } = useGetSections();

  const isLoading = isGoodsLoading || isSectionsLoading;

  return (
    <Wrapper>
      <Header total={total} value={value} onChange={onChange} />
      <Container>
        <Goods
          goods={goods}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
      </Container>
    </Wrapper>
  );
};

export default Main;
