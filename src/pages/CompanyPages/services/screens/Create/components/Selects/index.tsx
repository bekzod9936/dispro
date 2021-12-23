import { useState } from "react";
//packages
import { useTranslation } from "react-i18next";

//components
import { SelectField } from "../../../../components/SelectFields";
import { SectionModal } from "pages/CompanyPages/services/components/Modals/Section";
import { SubButton } from "pages/CompanyPages/services/style";

//styles
import {
  Flex,
  LeftField,
  MeasurementIcon,
  SectionsIcon,
  ServicesIcon,
} from "./style";
import {
  useCategories,
  useGetSections,
} from "pages/CompanyPages/services/hooks";
import { SECTIONS_LIMIT } from "pages/CompanyPages/services/constants";
import {
  getLengthOfParentSections,
  sectionsResponseListToOptions,
} from "pages/CompanyPages/services/helpers";

interface SelectsProps {}

const measurements = [
  {
    name: "kg",
    value: 1,
    label: "кг",
  },
  {
    name: "gr",
    value: 2,
    label: "гр",
  },
  {
    name: "kg",
    value: 1,
    label: "кг",
  },
  {
    name: "gr",
    value: 2,
    label: "гр",
  },
  {
    name: "kg",
    value: 1,
    label: "кг",
  },
  {
    name: "gr",
    value: 2,
    label: "гр",
  },
  {
    name: "kg",
    value: 1,
    label: "кг",
  },
  {
    name: "gr",
    value: 2,
    label: "гр",
  },
  {
    name: "kg",
    value: 1,
    label: "кг",
  },
  {
    name: "gr",
    value: 2,
    label: "гр",
  },
  {
    name: "kg",
    value: 1,
    label: "кг",
  },
  {
    name: "gr",
    value: 2,
    label: "гр",
  },
];

export const Selects: React.FC<SelectsProps> = () => {
  const [sectionModal, setSectionModal] = useState(false);

  const { t } = useTranslation();

  const categoryList = useCategories();

  const { data } = useGetSections();
  const limit = Boolean(SECTIONS_LIMIT - getLengthOfParentSections(data?.data));

  const handleOpen = () => {
    setSectionModal(true);
  };

  const handleClose = () => {
    setSectionModal(false);
  };

  return (
    <div>
      <SelectField
        name="measurement"
        placeholder="measurementUnit"
        options={measurements}
        icon={<MeasurementIcon />}
        margin={{ desktop: "0 0 20px 0", laptop: "0 0 20px 0" }}
      />
      <Flex>
        <SelectField
          name="service"
          placeholder="chooseCategory"
          options={categoryList}
          icon={<ServicesIcon />}
          margin={{ desktop: "0 20px 0 0", laptop: "0 20px 0 0" }}
        />
        <LeftField>
          <SelectField
            name="section"
            options={sectionsResponseListToOptions(data?.data)}
            icon={<SectionsIcon />}
            placeholder="Выберите раздел"
          />
          {limit && (
            <SubButton type="button" onClick={handleOpen}>
              {t("createSection")}
            </SubButton>
          )}
        </LeftField>
        <SectionModal isSingle onClose={handleClose} isOpen={sectionModal} />
      </Flex>
    </div>
  );
};
