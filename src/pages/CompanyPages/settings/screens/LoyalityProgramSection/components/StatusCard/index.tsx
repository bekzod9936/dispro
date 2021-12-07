import { memo } from "react";
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

const StatusCard = ({ val }: IProps) => {
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
            level: 1,
          })}
        </SubTitle>
      </Row>
      <div style={{ height: "15px" }} />
      <LevelDiv>
        {val?.length &&
          val?.map((item: any, index: number) => {
            if (item?.condition !== "or") {
              return (
                <LRow key={index}>
                  <LText>
                    {handleItem(item.type)}
                    {": "}
                  </LText>
                  <LValue>{numberWith(item.amount, " ")}</LValue>
                </LRow>
              );
            }
            return null;
          })}
      </LevelDiv>
    </Container>
  );
};

export default memo(StatusCard);
