import React from "react";
import ImageLazyLoad from "components/Custom/ImageLazyLoad/ImageLazyLoad";
import { Container, ImageBlock, Main, Stats, Submain } from "./style";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useFetchCategories } from "../../screens/UpdateCoupon/useFetchCategories";

interface IProps {
  img: string;
  type: number;
  title: string;
  description: string;
  price: number;
  value: number;
  ageFrom: number;
  count: number;
  categoryIds: number[];
  onClick: (arg: any) => void;
  isSelected: boolean;
  startDate?: string;
  endDate?: string;
  publishDate?: string;
  stats?: any;
}
export const CouponCard = ({
  isSelected,
  img,
  type,
  description,
  title,
  value,
  count,
  ageFrom,
  categoryIds,
  price,
  onClick,
  startDate,
  endDate,
  publishDate,
  stats,
}: IProps) => {

  const isCoupon = type === 2;
  const { t } = useTranslation();
  const [categories, setCategories] = React.useState<any>();
  const _ = useFetchCategories(setCategories, categoryIds);

  const getPercentage = (total: number, value: number) => {
    if (value === 0) return 0;
    const res = (value * 100) / total;
    return res % 1 === 0 ? res : res.toFixed(1);
  };

  return (
    <Container stats={stats} isSelected={isSelected} onClick={onClick}>
      <ImageBlock stats={stats}>
        <ImageLazyLoad objectFit="contain" src={img} alt="" />
      </ImageBlock>
      <Main stats={stats}>
        <div>
          <h6>{isCoupon ? t("coupon") : t("certificate")}</h6>
          {startDate && endDate && (
            <p>
              {dayjs(startDate).format("DD.MM")} -{" "}
              {dayjs(endDate).format("DD.MM.YYYY")}
            </p>
          )}
        </div>
        <h4>{title.length > 20 ? title.slice(0, 20) + "..." : title}</h4>
        <p>
          {description.length > 35
            ? description.slice(0, 35) + "..."
            : description}
        </p>
      </Main>
      <Submain>
        <p>
          {isCoupon ? t("coupon_value") : t("certificate_value")}: {value}{" "}
          {isCoupon ? "%" : "??????"}
        </p>
        <p>
          {isCoupon ? t("coupon_amount") : t("certificate_amount")}: {count} ????
        </p>
        <p>
          {isCoupon ? t("coupon_price") : t("certificate_price")}: {price} ??????
        </p>
        <p>
          {t("categories")}:{" "}
          {categories?.defaults?.map((el: any, index: number) => (
            <span>
              {el.label}
              {index < categories?.defaults?.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
        <p>
          {t("age_limit")}: {ageFrom != 0 ? ageFrom + "+" : "??????"}
        </p>
      </Submain>
      {stats && (
        <Stats>
          <p className="first">
            ????????????: {count - stats.total} (
            {getPercentage(count, count - stats.total)}%)
          </p>
          <p className="second">
            ????????????????????????: {stats.used} (
            {getPercentage(count - stats.total, stats.used)}%)
          </p>
          <p className="third">
            ????????????????????: {stats.expired} ({getPercentage(count, stats.expired)}%)
          </p>
          <p className="fourth">
            ???? ??????????????: {stats.total} ({getPercentage(count, stats.total)}%)
          </p>
        </Stats>
      )}
    </Container>
  );
};
