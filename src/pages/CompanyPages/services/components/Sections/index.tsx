import { useEffect, useRef, useState } from "react";

//packages
import { useTranslation } from "react-i18next";
import { IconButton } from "@material-ui/core";

//components
import Spinner from "components/Helpers/Spinner";
import { SubSectionModal } from "../Modals/SubSection";
import { SectionPopover } from "../../screens/Main/components/SectionPopover";

//other
import {
  isChildHasActiveParent,
  isParentHasActiveChild,
  sectionsResponseToParentChildObject,
} from "../../helpers";
import { useGetSections } from "../../hooks";

//style
import { Item, ItemWrapper, MenuIcon, Wrapper } from "./style";
import { modalsDefaults } from "../../constants";

interface SectionsProps {
  currentSection: number | null;
  setCurrentSection: (arg: number | null) => void;
}

export const Sections: React.FC<SectionsProps> = ({
  setCurrentSection,
  currentSection,
}) => {
  const { t } = useTranslation();

  const currentSectionRef = useRef<null | HTMLDivElement>(null);

  const [modals, setModals] = useState(modalsDefaults);

  const { data, isLoading } = useGetSections();

  const parentSections = sectionsResponseToParentChildObject(data?.data);

  const handleClickOnSection = (section: null | number) => {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      currentSectionRef.current = event.currentTarget;

      setCurrentSection(section);
    };
  };

  const handleClose = (modal: keyof typeof modals) => {
    return () => setModals((prev) => ({ ...prev, [modal]: false }));
  };

  const handleOpen = (modal: keyof typeof modals) => {
    return () => setModals((prev) => ({ ...prev, [modal]: true }));
  };

  useEffect(() => {
    currentSectionRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [currentSection]);

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
            isChildHasActiveParent(item, currentSection)) &&
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
        parentId={currentSection || 0}
        onClose={handleClose("subSection")}
        open={modals.subSection}
      />
    </Wrapper>
  );
};
