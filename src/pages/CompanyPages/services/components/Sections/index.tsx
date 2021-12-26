import { useEffect, useRef, useState } from "react";

//packages
import { useTranslation } from "react-i18next";

//components
import Spinner from "components/Helpers/Spinner";
import { SubSectionModal } from "../Modals/SubSection";
import { SectionPopover } from "../../screens/Main/components/SectionPopover";
import { DeleteModal } from "../Modals/Delete";
import { EditSectionModal } from "../Modals/Edit";

//other
import {
  isChildHasActiveParent,
  isParentHasActiveChild,
  isSectionParent,
  sectionsResponseToParentChildObject,
} from "../../helpers";
import { useGetSections } from "../../hooks";
import { modalsDefaults } from "../../constants";
import { ISectionResponse } from "services/queries/servicesQueries/response.types";
import { SectionModalsType } from "../../utils/types";

//style
import { Item, ItemWrapper, Wrapper } from "./style";
import { useScrollToCurrentSection } from "../../hooks/MainPageHooks";

interface SectionsProps {
  currentSection: null | ISectionResponse;
  setCurrentSection: (arg: ISectionResponse | null) => void;
}

export const Sections: React.FC<SectionsProps> = ({
  setCurrentSection,
  currentSection,
}) => {
  const { t } = useTranslation();
  const currentSectionName =
    currentSection?.goodsSectionTranslates[0].translateName;

  const currentSectionRef = useScrollToCurrentSection(currentSection);

  const [modals, setModals] = useState<SectionModalsType>(modalsDefaults);

  const { data, isLoading } = useGetSections();

  const parentSections = sectionsResponseToParentChildObject(data?.data);

  const handleClickOnSection = (section: null | ISectionResponse) => {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      currentSectionRef.current = event.currentTarget;

      setCurrentSection(section);
    };
  };

  const handleClose = (modal: keyof SectionModalsType) => {
    return () => setModals((prev) => ({ ...prev, [modal]: false }));
  };

  const handleOpen = (modal: keyof SectionModalsType) => {
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
            onClick={handleClickOnSection(item)}
            isSelected={
              currentSection?.id === item.id ||
              isParentHasActiveChild(item, currentSection?.id)
            }
          >
            <h4>{item.goodsSectionTranslates[0].translateName}</h4>
            <SectionPopover
              onOpenModal={handleOpen}
              isParent
              isHiddenInMobile={item.hideInMobile}
            />
          </Item>
          {(currentSection?.id === item.id ||
            isChildHasActiveParent(item, currentSection?.id)) &&
            item.children.map((child) => (
              <Item
                onClick={handleClickOnSection(child)}
                isSelected={currentSection?.id === child.id}
                isChild
              >
                <h4>{child.goodsSectionTranslates[0].translateName}</h4>
                <SectionPopover
                  onOpenModal={handleOpen}
                  isHiddenInMobile={item.hideInMobile}
                />
              </Item>
            ))}
        </ItemWrapper>
      ))}

      <SubSectionModal
        parentId={currentSection?.id || 0}
        onClose={handleClose("subSection")}
        open={modals.subSection}
      />
      <EditSectionModal
        item={currentSection}
        open={modals.editSection}
        onClose={handleClose("editSection")}
        parent={isSectionParent(data?.data, currentSection?.id)}
      />
      <DeleteModal
        isSection={currentSection?.parentId === 0}
        open={modals.delete}
        name={currentSectionName}
        onClose={handleClose("delete")}
      />
    </Wrapper>
  );
};
