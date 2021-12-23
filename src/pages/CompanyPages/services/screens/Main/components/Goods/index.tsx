import { Sections } from "pages/CompanyPages/services/components/Sections";
import { useGetItems } from "pages/CompanyPages/services/hooks/MainPageHooks";
import { ISectionResponse } from "services/queries/servicesQueries/response.types";
import { Wrapper } from "./style";
interface GoodsProps {
  currentSection: ISectionResponse | null;
  setCurrentSection: (arg: ISectionResponse | null) => void;
}

export const Goods: React.FC<GoodsProps> = ({
  currentSection,
  setCurrentSection,
}) => {
  return (
    <Wrapper>
      <Sections
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
    </Wrapper>
  );
};
