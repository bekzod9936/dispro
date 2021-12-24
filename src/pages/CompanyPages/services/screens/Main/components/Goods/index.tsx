import { useMemo, useState } from "react";

//components
import Spinner from "components/Helpers/Spinner";
import { ItemGroup } from "pages/CompanyPages/services/components/ItemGroup";
import { Sections } from "pages/CompanyPages/services/components/Sections";
import { EmptyPage } from "../EmptyPage";

//other
import { useSectionsWithIdEntity } from "pages/CompanyPages/services/hooks/MainPageHooks";
import { IGoods } from "pages/CompanyPages/services/utils/types";
import {
  IGoodsResponse,
  ISectionResponse,
} from "services/queries/servicesQueries/response.types";

//style
import { Wrapper, Container } from "./style";

interface GoodsProps {
  currentSection: ISectionResponse | null;
  setCurrentSection: (arg: ISectionResponse | null) => void;
  goods: IGoods;
  isLoading: boolean;
}

export const Goods: React.FC<GoodsProps> = ({
  currentSection,
  setCurrentSection,
  goods,
  isLoading,
}) => {
  const [currentItem, setCurrentItem] = useState<IGoodsResponse | null>(null);

  const sectionsObject = useSectionsWithIdEntity();
  const isUserhasGoods = useMemo(() => Object.keys(goods).length > 0, [goods]);
  const isPageEmpty = !isUserhasGoods && !isLoading;

  return (
    <Wrapper>
      <Sections
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      <Container>
        {isLoading && <Spinner size={35} />}
        {isPageEmpty && <EmptyPage />}
        {Object.keys(goods).map((sectionId) => (
          <ItemGroup
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            sectionName={sectionsObject?.[Number(sectionId)]}
            goods={goods[Number(sectionId)]}
          />
        ))}
      </Container>
    </Wrapper>
  );
};
