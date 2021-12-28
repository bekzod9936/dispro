//packages
import { useTranslation } from "react-i18next";

//components
import { SelectField } from "../../../../components/SelectFields";
import { SubButton } from "pages/CompanyPages/services/style";

//other
import {
  useCategories,
  useGetSections,
} from "pages/CompanyPages/services/hooks";
import {
  measurements,
  SECTIONS_LIMIT,
} from "pages/CompanyPages/services/constants";
import {
  getLengthOfParentSections,
  sectionsResponseListToOptions,
} from "pages/CompanyPages/services/helpers";

//styles
import {
  Flex,
  LeftField,
  MeasurementIcon,
  SectionsIcon,
  ServicesIcon,
} from "./style";

interface SelectsProps {
  handleOpen: () => void;
}

export const Selects: React.FC<SelectsProps> = ({ handleOpen }) => {
  const { t } = useTranslation();

  const categoryList = useCategories();

  const { data, isLoading } = useGetSections();
  const isSectionButtonEnabled =
    isLoading || SECTIONS_LIMIT - getLengthOfParentSections(data?.data) > 0;
  return (
    <div style={{ marginBottom: 20 }}>
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
          {isSectionButtonEnabled && (
            <SubButton type="button" onClick={handleOpen}>
              {t("createSection")}
            </SubButton>
          )}
        </LeftField>
      </Flex>
    </div>
  );
};
