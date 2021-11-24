import { useTranslation } from "react-i18next";
import { numberWith } from "services/utils";
//styles
import {
  Container,
  SubTitle,
  Row,
  LevelDiv,
  LRow,
  LText,
  LValue,
} from "./style";
//types
import { IProps } from "./types";

const StatusCard = ({ index, val }: IProps) => {
  console.log(val, "val status card");
  const { t } = useTranslation();

  const handleItem = (type: any) => {
    if (type === 1) {
      return t("purchaseSum");
    } else if (type === 2) {
      return t("recomendations");
    } else if (type === 3) {
      return t("companyVisits");
    } else {
      return "";
    }
  };
  return (
    <Container>
      <Row>
        <SubTitle>
          {t("requirementLevl", {
            level: index + 1,
          })}
        </SubTitle>
      </Row>
      <div style={{ height: "15px" }} />
      <LevelDiv>
        {val?.length &&
          val?.map((item: any, index: number) => {
            return (
              <LRow>
                <LText>
                  {handleItem(item.type)}
                  {": "}
                </LText>
                <LValue>{numberWith(item.amount, " ")}</LValue>
              </LRow>
            );
          })}
      </LevelDiv>
    </Container>
  );
};

export default StatusCard;
