//packages
import { useTranslation } from "react-i18next";

//components
import { SelectField } from "../../../../components/SelectFields";

//styles
import {
  Flex,
  LeftField,
  MeasurementIcon,
  SectionsIcon,
  ServicesIcon,
} from "./style";
import { SubButton } from "pages/CompanyPages/services/style";

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
  const { t } = useTranslation();
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
          <SubButton>{t("createSection")}</SubButton>
        </LeftField>
      </Flex>
    </div>
  );
};
