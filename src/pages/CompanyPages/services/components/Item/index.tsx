import React from "react";
import { useTranslation } from "react-i18next";
import { IGoodsResponse } from "services/queries/servicesQueries/response.types";
import { thousandsDivider } from "../../helpers";
import { Left, Right, Wrapper, PointsIcon, DiscountIcon } from "./style";
import DEFAULT_IMAGE from "assets/images/staff_default.png";

//style

interface ItemProps {
  item: IGoodsResponse;
  isEven: boolean;
}

export const Item: React.FC<ItemProps> = ({ item, isEven }) => {
  const { t } = useTranslation();

  const image = item.goodsImages[0].imageUrl;
  const isItemHasCount = !item.isCountUnlimited;
  const price = thousandsDivider(item.price);
  const priceWithDiscount = thousandsDivider(item.priceWithDiscount);
  const count = thousandsDivider(item.count);

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    let target = event.target as HTMLImageElement;
    target.onerror = null;
    target.src = DEFAULT_IMAGE;
  };

  return (
    <Wrapper isEven={isEven}>
      <Left>
        <img src={image} alt="itemImage" onError={handleError} />
        <div className="title">
          <h5>{item.name}</h5>
          {isItemHasCount && (
            <p className={item.count === 0 ? "zeroCount" : ""}>{count} шт.</p>
          )}
        </div>
        <div className="info">
          {item.withPoint && (
            <div className="info_child">
              <PointsIcon />
              <p>{t("itemForPoints")}</p>
            </div>
          )}
          {item.withDiscount && (
            <div className="info_child">
              <DiscountIcon />
              <p>{t("itemForDiscount")}</p>
            </div>
          )}
        </div>
      </Left>
      <Right>
        <p>{price} UZS</p>
        {item.withDiscount && <span>{priceWithDiscount} UZS</span>}
      </Right>
    </Wrapper>
  );
};
