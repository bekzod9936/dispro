import { IProps } from "./type";
import { Container } from "./style";
import TwoUsers from "pages/CompanyPages/settings/components/TwoUsers";
import { useTranslation } from "react-i18next";

const ReferalCard = ({ removeCol, item, index }: IProps) => {
  const { t } = useTranslation();
  return (
    <Container>
      Col 1
      <TwoUsers
        name1="Саша"
        name2="Егор"
        name3={
          item.number === 2
            ? "Петя"
            : item.number > 2
            ? `${index - 1} ${t("people")}`
            : null
        }
      />
    </Container>
  );
};

export default ReferalCard;
