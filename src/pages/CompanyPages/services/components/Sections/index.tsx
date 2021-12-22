import { useTranslation } from "react-i18next";

//components
import Spinner from "components/Helpers/Spinner";

//other
import {
  isChildHasActiveParent,
  isParentHasActiveChild,
  sectionsResponseToParentChildObject,
} from "../../helpers";
import { useGetSections } from "../../hooks";

//style
import { Item, ItemWrapper, MenuIcon, Wrapper } from "./style";
import { IconButton } from "@material-ui/core";
import { SectionPopover } from "../../screens/Main/components/SectionPopover";
import { SubSectionModal } from "../Modals/SubSection";
import { useState } from "react";

interface SectionsProps {
  currentSection: number | null;
  setCurrentSection: (arg: number | null) => void;
}

export const Sections: React.FC<SectionsProps> = ({
  setCurrentSection,
  currentSection,
}) => {
  const { t } = useTranslation();
  const [modals, setModals] = useState({
    subSection: false,
  });

  const { data, isLoading } = useGetSections();

  const parentSections = sectionsResponseToParentChildObject(data?.data);

  const handleClickOnSection = (section: null | number) => {
    return () => {
      setCurrentSection(section);
    };
  };

  const handleClose = (modal: keyof typeof modals) => {
    return () => setModals((prev) => ({ ...prev, [modal]: false }));
  };

  const handleOpen = (modal: keyof typeof modals) => {
    return () => setModals((prev) => ({ ...prev, [modal]: true }));
  };

  if (isLoading) {
    return (
      <Wrapper>
        <Spinner size={30} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Item onClick={handleClickOnSection(null)} isSelected={!currentSection}>
        <h4>{t("allGoods")}</h4>
      </Item>
      {parentSections.map((item) => (
        <ItemWrapper>
          <Item
            onClick={handleClickOnSection(item.id)}
            isSelected={
              currentSection === item.id ||
              isParentHasActiveChild(item, currentSection)
            }
          >
            <h4>{item.goodsSectionTranslates[0].translateName}</h4>
            <SectionPopover
              onOpenModal={handleOpen}
              isParent
              isHiddenInMobile={item.hideInMobile}
            />
          </Item>
          {(currentSection === item.id ||
            isChildHasActiveParent(parentSections, currentSection)) &&
            item.children.map((child) => (
              <Item
                onClick={handleClickOnSection(child.id)}
                isSelected={currentSection === child.id}
                isChild
              >
                <h4>{child.goodsSectionTranslates[0].translateName}</h4>
                <IconButton children={<MenuIcon />} />
              </Item>
            ))}
        </ItemWrapper>
      ))}

      <SubSectionModal
        onClose={handleClose("subSection")}
        open={modals.subSection}
      />
    </Wrapper>
  );
};
