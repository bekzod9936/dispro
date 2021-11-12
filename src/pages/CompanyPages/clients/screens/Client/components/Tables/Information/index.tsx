import { numberWith } from "services/utils";
import {
  AddInfo,
  BreakLine,
  Container,
  InfoBlock,
  InfoItem,
  Wrapper,
} from "./style";
import { useAppSelector } from "services/redux/hooks";
import Button from "components/Custom/Button";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { Recommendation } from "../../Recommendations";
const statistics = [
  {
    heading: "Оплачено в UZS",
    value: 99999999,
  },
  {
    heading: "Количество покупок",
    value: 5670260,
  },
  {
    heading: "Сумма всех покупок",
    value: 99999999,
  },
  {
    heading: "Остаток баллов",
    value: 1125000,
  },
  {
    heading: "Получено кешбэк",
    value: 620750,
  },
  {
    heading: "Оплаченно баллами",
    value: 320260,
  },
  {
    heading: "Оплаченно баллами",
    value: 250000,
  },
];
const Information = () => {
  const { t } = useTranslation();
  const { selectedClients } = useAppSelector((state) => state.clients);
  const client = selectedClients[0];
  return (
    <Container>
      <Wrapper>
        {statistics.map((el, index) => (
          <InfoItem>
            <span>{el.heading}</span>
            <p>{numberWith(el?.value?.toString(), " ")}</p>
            {index !== statistics.length - 1 && <BreakLine />}
          </InfoItem>
        ))}
      </Wrapper>
      <AddInfo>
        <InfoBlock>
          <h4>{t("info")}</h4>
          <div>
            <p>
              {t("byRecommendation")}: <span>Ни Натальи</span> ({t("client")})
            </p>
            <p>
              {t("lastPurchase")}:{" "}
              {dayjs(client?.addInfo?.lastPurchaseDate).format("DD.MM.YYYY")}
            </p>
          </div>
          <Button
            margin={{ mobile: "7px 0 0 0" }}
            buttonStyle={{
              bgcolor: "rgba(96, 110, 234, 0.1);",
              color: "#3492FF",
            }}
          >
            {t("addNote")} +
          </Button>
        </InfoBlock>
        <Recommendation maxWidth="none" />
      </AddInfo>
    </Container>
  );
};

export default Information;
