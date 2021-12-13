import { IconButton } from "@material-ui/core";
import Button from "components/Custom/Button";
import Modal from "components/Custom/Modal";
import MultiSelect from "components/Custom/MultiSelect";
import { useTranslation } from "react-i18next";
import { Wrapper, CloseIcon, LanguageIcon } from "./style";

interface LanguagesProps {
  title: string;
  open: boolean;
  //   handleAddLanguage: (e: string) => void
}

const languages = [
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

export const Languages: React.FC<LanguagesProps> = ({ title, open }) => {
  const { t } = useTranslation();

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
          <IconButton>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="main">
          <MultiSelect
            options={languages}
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
          <Button>{t("cancel")}</Button>
          <Button>{t("save")}</Button>
        </div>
      </Wrapper>
    </Modal>
  );
};
