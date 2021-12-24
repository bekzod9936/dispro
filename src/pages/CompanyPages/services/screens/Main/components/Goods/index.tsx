import { ItemGroup } from "pages/CompanyPages/services/components/ItemGroup";
import { Sections } from "pages/CompanyPages/services/components/Sections";
import { useSectionsWithIdEntity } from "pages/CompanyPages/services/hooks/MainPageHooks";
import { IGoods } from "pages/CompanyPages/services/utils/types";
import { ISectionResponse } from "services/queries/servicesQueries/response.types";
import { Wrapper, Container } from "./style";

interface GoodsProps {
  currentSection: ISectionResponse | null;
  setCurrentSection: (arg: ISectionResponse | null) => void;
  goods: IGoods;
}

export const Goods: React.FC<GoodsProps> = ({
  currentSection,
  setCurrentSection,
  goods,
}) => {
  const sectionsObject = useSectionsWithIdEntity();

  return (
    <Wrapper>
      <Sections
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      <Container>
        {Object.keys(goods).map((sectionId) => (
          <ItemGroup
            sectionName={sectionsObject?.[Number(sectionId)]}
            goods={goods[Number(sectionId)]}
          />
        ))}
      </Container>
    </Wrapper>
  );
};
