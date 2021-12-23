import { Sections } from "pages/CompanyPages/services/components/Sections";
import { useCurrentSection } from "pages/CompanyPages/services/hooks";
import { Wrapper } from "./style";
interface GoodsProps {}

export const Goods: React.FC<GoodsProps> = () => {
  const { currentSection, setCurrentSection } = useCurrentSection();

  console.log(currentSection);

  return (
    <Wrapper>
      <Sections
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
    </Wrapper>
  );
};
