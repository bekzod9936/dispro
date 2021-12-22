//react
import React, { useState } from "react";

//packages
import { useTranslation } from "react-i18next";

//components
import Popover from "../../components/Popover";
import Input from "components/Custom/Input";
import { Flex } from "pages/CompanyPages/services/style";
import Title from "components/Custom/Title";

//style
import { Nav, SearchIcon, useStyles, Wrapper } from "./style";
import { SectionModal } from "pages/CompanyPages/services/components/Modals/Section";
import Button from "components/Custom/Button";

interface HeaderProps {
  value: string;
  onChange: (arg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [createSection, setCreateSection] = useState<boolean>(false);
  const styles = useStyles();

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
          {t("youDontHaveProducts")}
        </p>
      </Nav>
      <Flex>
        <Popover onClick={handleToggle(true)} />
        <Input
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
