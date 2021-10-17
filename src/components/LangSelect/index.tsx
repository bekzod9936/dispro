import Select from "../Custom/Select";
import { useTranslation } from "react-i18next";
import { Arrow } from "../../assets/icons/LoginPage/LoginPageIcons";

// import i18n from "../../services/localization/i18n";
// Components

//Assets
import { RuFlagIcons } from "../../assets/icons/LoginPage/LoginPageIcons";
import { EnFlagIcons } from "../../assets/icons/LoginPage/LoginPageIcons";
import { UzFlagIcons } from "../../assets/icons/LoginPage/LoginPageIcons";

//Styles
import { Container } from "./style";

interface Props {
  border?: string;
}

const LangSelect = ({ border }: Props) => {
  const { t, i18n } = useTranslation();

  const handleChange = (lang: string) => {
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
    console.log(lang, "value");
  };

  const options = [
    {
      id: "ru",
      value: (
        <>
          <RuFlagIcons />
          {t("russian")}
        </>
      ),
    },
    {
      id: "uz",
      value: (
        <>
          <UzFlagIcons />
          {t("uzbek")}
        </>
      ),
    },
    {
      id: "en",
      value: (
        <>
          <EnFlagIcons />
          {t("english")}
        </>
      ),
    },
  ];

  return (
    <Container>
      <Select
        onChange={handleChange}
        width="fit-content"
        minWidth={200}
        height="70px"
        minHeight={45}
        maxHeight={60}
        radius={46}
        bgcolor="transparent"
        border={border ? border : "1px solid #223367"}
        tcolor="#223367"
        defaultValue={localStorage.getItem("language") || "ru"}
        options={options}
        Icon={Arrow}
        paddingLeft={20}
      />
    </Container>
  );
};

export default LangSelect;
