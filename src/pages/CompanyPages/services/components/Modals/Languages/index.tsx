import { useState } from "react";

//packages
import { FieldArrayWithId } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import { IconButton } from "@material-ui/core";
import Button from "components/Custom/Buttons/Button";
import Modal from "components/Custom/Modal";
import MultiSelect from "components/Custom/MultiSelect";

//style
import {
  Wrapper,
  CloseIcon,
  LanguageIcon,
  CancelIcon,
  SaveIcon,
  useStyles,
} from "./style";

//other
import { FormFieldTypes } from "pages/CompanyPages/services/utils/types";
import { languages } from "pages/CompanyPages/services/constants";

interface LanguagesProps {
  title: string;
  open: boolean;
  onClose: () => void;
  fields: FieldArrayWithId<
    FormFieldTypes,
    `variants.${number}.name` | "titles",
    "id"
  >[];
  onConfirm: (e: string[]) => void;
}

export const LanguagesModal: React.FC<LanguagesProps> = ({
  title,
  open,
  onClose,
  fields,
  onConfirm,
}) => {
  const [selectedLanguages, setSelectedLanguages] = useState<typeof languages>(
    []
  );
  const { t } = useTranslation();
  const { modal, button, input } = useStyles();

  const handleSortOptions = (
    array: typeof languages,
    inputs: typeof fields
  ) => {
    return array.filter((e) => inputs.every((el) => el.lang !== e.name));
  };

  const handleChange = (array: typeof languages) => {
    setSelectedLanguages(array);
  };

  const handleConfirm = () => {
    onConfirm(selectedLanguages.map((e) => e.name));
    setSelectedLanguages([]);
    onClose();
  };

  return (
    <Modal width={modal.style} open={open}>
      <Wrapper>
        <div className="header">
          <h3>{t(title)}</h3>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="main">
          <MultiSelect
            options={handleSortOptions(languages, fields)}
            value={selectedLanguages}
            onChange={handleChange}
            isMulti
            selectStyle={input.style}
            iconleft="25px"
            icon={<LanguageIcon />}
            placeholder={t("chooseLanguage")}
          />
        </div>
        <div className="footer">
          <Button
            onClick={onClose}
            margin={button.margin}
            startIcon={<CancelIcon />}
            buttonStyle={button.style}
          >
            {t("cancel")}
          </Button>
          <Button onClick={handleConfirm} startIcon={<SaveIcon />}>
            {t("save")}
          </Button>
        </div>
      </Wrapper>
    </Modal>
  );
};
