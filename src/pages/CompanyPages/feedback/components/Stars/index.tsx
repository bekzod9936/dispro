import { useTranslation } from "react-i18next";
import { useAppSelector } from "services/redux/hooks";
import Grade from "../Grade";
import { ruCount } from "../../utils";
import {
  Container,
  Rate,
  WrapStars,
  WrapIconStart,
  StarIcon,
  WrapStartT,
  RateText,
} from "./style";

const Stars = () => {
  const { t } = useTranslation();
  const ratings: any = useAppSelector((state) => state.feedbackPost.ratings);
  const rate = useAppSelector((state) => state.feedbackPost.averageRating);
  let value = 0;
  ratings.map((v: any) => (value = value + v?.amount));
  console.log(ratings, "edkdkd");
  return (
    <Container>
      <div>
        <Grade title={t("overallscore")} rate={rate} />
        <Grade title={t("totalratings")} rate={rate} total={true} />
        <Rate>{t("rate")}</Rate>
        {[5, 4, 3, 2, 1].map((v: any, i: number) => {
          const ss = ratings.filter((a: any) => a.rating === v);
          const color: any = ss.length !== 0 ? true : false;
          return (
            <WrapStars>
              <WrapIconStart>
                {Array(v)
                  .fill(1)
                  .map(() => (
                    <StarIcon />
                  ))}
              </WrapIconStart>
              <WrapStartT>
                <RateText colort={color}>
                  &middot;
                  {ss.length !== 0 ? `${ss[0]?.percentage}%` : "0%"}
                </RateText>
                <RateText colort={color}>
                  {ss.length !== 0 ? `${ss[0]?.amount} ` : "0 "}
                </RateText>
                <RateText colort={color}>
                  {ruCount({
                    count: ss[0]?.amount,
                    firstWord: t("evaluations2"),
                    secondWord: t("evaluations"),
                    thirdWord: t("evaluations1"),
                  })}
                </RateText>
              </WrapStartT>
            </WrapStars>
          );
        })}
      </div>
    </Container>
  );
};

export default Stars;
