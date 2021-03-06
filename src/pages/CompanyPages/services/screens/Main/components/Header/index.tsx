//react
import { useState } from "react";

//packages
import { useTranslation } from "react-i18next";

//components
import Popover from "../../components/Popover";
import Input from "components/Custom/Input";
import { Flex } from "pages/CompanyPages/services/style";
import Title from "components/Custom/Title";
import { SectionModal } from "pages/CompanyPages/services/components/Modals/Sections";

//style
import { Nav, SearchIcon, useStyles, Wrapper } from "./style";

//other
import { useGetSections } from "pages/CompanyPages/services/hooks";
import { getLengthOfParentSections } from "pages/CompanyPages/services/helpers";
import { SECTIONS_LIMIT } from "pages/CompanyPages/services/constants";
import { useGetTotalCountTitle } from "pages/CompanyPages/services/hooks/MainPageHooks";

interface HeaderProps {
  value: string;
  onChange: (arg: string) => void;
  total: number;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  value,
  onChange,
  total,
  isLoading,
}) => {
  const { t } = useTranslation();
  const [createSection, setCreateSection] = useState<boolean>(false);
  const styles = useStyles();

  const { data } = useGetSections();
  const goodsNotFound = total === 0 && value !== "" && !isLoading;
  const totalCountTitle = useGetTotalCountTitle(isLoading, total);
  const isSectionButtonDisabled =
    isLoading || SECTIONS_LIMIT - getLengthOfParentSections(data?.data) <= 0;

  const handleToggle = (bool: boolean) => {
    return () => {
      setCreateSection(bool);
    };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Wrapper>
      <Nav>
        <Title>{t("services")}</Title>
        <p>
          <b>•</b>
          {totalCountTitle}
        </p>
      </Nav>
      <Flex>
        <Popover
          isSectionButtonDisabled={isSectionButtonDisabled}
          onClick={handleToggle(true)}
        />
        <Input
          error={goodsNotFound}
          message={t("notfinduser")}
          value={value}
          onChange={handleChange}
          margin={styles.input.margin}
          inputStyle={styles.input.style}
          IconStart={<SearchIcon />}
          width={styles.input.width}
          placeholder={t("search")}
        />
      </Flex>
      <SectionModal isOpen={createSection} onClose={handleToggle(false)} />
    </Wrapper>
  );
};
