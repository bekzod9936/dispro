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
];

export const Selects: React.FC<SelectsProps> = () => {
  const [sectionModal, setSectionModal] = useState(false);
  const { t } = useTranslation();

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
          placeholder="attendance"
          options={measurements}
          icon={<ServicesIcon />}
          margin={{ desktop: "0 20px 0 0", laptop: "0 20px 0 0" }}
        />
        <LeftField>
          <SelectField
            name="section"
            options={measurements}
            icon={<SectionsIcon />}
            placeholder="Выберите раздел"
          />
          <SubButton onClick={handleOpen}>{t("createSection")}</SubButton>
        </LeftField>
        <SectionModal isSingle onClose={handleClose} isOpen={sectionModal} />
      </Flex>
    </div>
  );
};
