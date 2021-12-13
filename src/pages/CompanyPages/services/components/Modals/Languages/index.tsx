import { IconButton } from "@material-ui/core";
import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";
import MultiSelect from "components/Custom/MultiSelect";
import { FormFieldTypes } from "pages/CompanyPages/services/screens/Create";
import { useState } from "react";
import { FieldArrayWithId } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Wrapper,
  CloseIcon,
  LanguageIcon,
  CancelIcon,
  SaveIcon,
} from "./style";

interface LanguagesProps {
  title: string;
  open: boolean;
  onClose: () => void;
  fields: FieldArrayWithId<FormFieldTypes, "titles" | "descriptions", "id">[];
  onConfirm: (e: string[]) => void;
}

const languages = [
  {
    value: 0,
    label: "Русский",
    name: "(Рус)",
  },
  {
    value: 1,
    label: "Английский",
    name: "(Eng)",
  },
  {
    value: 2,
    label: "Узбекский",
    name: "(Uzb)",
  },
];

export const Languages: React.FC<LanguagesProps> = ({
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
    <Modal
      width={{
        maxwidth: 480,
        width: "100%",
      }}
      open={open}
    >
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
            selectStyle={{
              fontSize: {
                desktop: 18,
                laptop: 18,
              },
              bgcolor: "#eff0fd",
              border: "none",
              placeholdercolor: "#223367",
              inpadding: "2px 10px 2px 75px",
              placewieght: "500",
            }}
            iconleft="25px"
            icon={<LanguageIcon />}
            placeholder={t("chooseLanguage")}
          />
        </div>
        <div className="footer">
          <Button
            onClick={onClose}
            margin={{ desktop: "0 20px 0 0", laptop: "0 20px 0 0" }}
            startIcon={<CancelIcon />}
            buttonStyle={{ bgcolor: "#fff", color: "#223367", weight: 500 }}
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
