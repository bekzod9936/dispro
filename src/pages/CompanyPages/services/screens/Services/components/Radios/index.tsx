//packages
import { useTranslation } from "react-i18next";

//components
import { RadioFields } from "pages/CompanyPages/services/components/RadioFields";

//style
import { Wrapper, Content, LightToolTip, QuestionMarkIcon } from "./style";

interface RadiosProps {
  value: number;
  onChange: (arg: number) => void;
}

export const Radios: React.FC<RadiosProps> = ({ onChange, value }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Content>
        <RadioFields value={value} onChange={onChange} />
        <LightToolTip
          placement="top"
          arrow
          title="Товар который можно купить 100% оплатив баллами"
        >
          <QuestionMarkIcon />
        </LightToolTip>
      </Content>
    </Wrapper>
  );
};
