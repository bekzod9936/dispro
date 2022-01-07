import { useState } from "react";

//packages
import { useTranslation } from "react-i18next";

//components
import Spinner from "components/Helpers/Spinner";
import { SubSectionModal } from "../Modals/SubSection";
import { SectionPopover } from "../../screens/Main/components/SectionPopover";
import { DeleteModal } from "../Modals/Delete";
import { EditSectionModal } from "../Modals/Edit";
import { MoveModal } from "../Modals/Move";
import { HideModal } from "../Modals/Hide";

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
import { useScrollToCurrentSection } from "../../hooks/MainPageHooks";

//style
import { HideIcon, Item, ItemWrapper, Wrapper } from "./style";

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
  const parentId = currentSection?.parentId || currentSection?.id;

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
            isItemHidden={item.hideInMobile}
            onClick={handleClickOnSection(item)}
            isSelected={
              currentSection?.id === item.id ||
              isParentHasActiveChild(item, currentSection?.id)
            }
          >
            <h4>{item.goodsSectionTranslates[0].translateName}</h4>
            {item.hideInMobile && <HideIcon />}
            {(currentSection?.id === item.id ||
              isParentHasActiveChild(item, currentSection?.id)) && (
              <SectionPopover
                section={currentSection}
                onOpenModal={handleOpen}
                isParent
                isHiddenInMobile={item.hideInMobile}
                parentId={parentId}
              />
            )}
          </Item>
          {(currentSection?.id === item.id ||
            isChildHasActiveParent(item, currentSection?.id)) &&
            item.children.map((child) => (
              <Item
                isItemHidden={child.hideInMobile}
                onClick={handleClickOnSection(child)}
                isSelected={currentSection?.id === child.id}
                isChild
              >
                <h4>{child.goodsSectionTranslates[0].translateName}</h4>
                {child.hideInMobile && <HideIcon />}
                {currentSection?.id === child.id && (
                  <SectionPopover
                    section={currentSection}
                    onOpenModal={handleOpen}
                    isHiddenInMobile={child.hideInMobile}
                  />
                )}
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
        id={currentSection?.id || 0}
        isSection={currentSection?.parentId === 0}
        open={modals.delete}
        name={currentSectionName}
        onClose={handleClose("delete")}
        setCurrentSection={setCurrentSection}
      />
      <MoveModal
        id={currentSection?.id || 0}
        onClose={handleClose("move")}
        open={modals.move}
      />
      <HideModal
        isSection={currentSection?.parentId === 0}
        id={currentSection?.id || 0}
        name={currentSection?.goodsSectionTranslates[0].translateName || ""}
        open={modals.hide}
        onClose={handleClose("hide")}
      />
    </Wrapper>
  );
};
