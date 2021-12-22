import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Item, Wrapper } from "./style";

interface SectionsProps {}

const sections = [
  {
    title: "Ракеты",
    parentId: 0,
    id: 1,
  },
  {
    title: "Двигатели",
    parentId: 1,
    id: 1,
  },
  {
    title: "Космонавты",
    parentId: 1,
    id: 2,
  },
  {
    title: "Костюмы",
    parentId: 1,
    id: 3,
  },
];

export const Sections: React.FC<SectionsProps> = () => {
  const { t } = useTranslation();
  const [currentSection, setCurrentSection] = useState<
    null | typeof sections[0]
  >(null);

  const handleClickOnSection = (section: null | typeof sections[0]) => {
    setCurrentSection(section);
  };

  console.log(currentSection);

  return (
    <Wrapper>
      <Item
        onClick={() => handleClickOnSection(null)}
        isSelected={!currentSection}
      >
        <h4>{t("allGoods")}</h4>
      </Item>
      {sections.map((item) => (
        <Item
          key={item.id}
          onClick={() => handleClickOnSection(item)}
          isChild={item.parentId === 1}
          isSelected={
            currentSection?.id === item.id &&
            currentSection?.parentId === item.parentId
          }
        >
          <h4>{item.title}</h4>
          <div>more</div>
        </Item>
      ))}
    </Wrapper>
  );
};
