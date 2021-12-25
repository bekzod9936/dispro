//packages
import { useTranslation } from "react-i18next";

//components
import { ItemPopover } from "../ItemPopover";

//style
import {
  Wrapper,
  PointsIcon,
  DiscountIcon,
  ButtonIcon,
  EyeIcon,
} from "./style";

//other
import { IGoodsResponse } from "services/queries/servicesQueries/response.types";
import { thousandsDivider } from "../../helpers";
import DEFAULT_IMAGE from "assets/images/staff_default.png";
import { Modals } from "../../utils/types";
import { Draggable } from "react-beautiful-dnd";

interface ItemProps {
  item: IGoodsResponse;
  isEven: boolean;
  setCurrentItem: (arg: IGoodsResponse | null) => void;
  currentItemId: number | undefined;
  onOpenModal: (modalName: keyof Modals) => void;
  index: number;
}

export const Item: React.FC<ItemProps> = ({
  item,
  isEven,
  setCurrentItem,
  currentItemId,
  onOpenModal,
  index,
}) => {
  const { t } = useTranslation();

  const image = item.goodsImages[0].imageUrl;
  const price = thousandsDivider(item.price);
  const priceWithDiscount = thousandsDivider(item.priceWithDiscount);
  const count = thousandsDivider(item.count);

  const isItCurrentItem = currentItemId === item.id;

  const isItemHasCount = !item.isCountUnlimited;

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    let target = event.target as HTMLImageElement;
    target.onerror = null;
    target.src = DEFAULT_IMAGE;
  };

  const handleClick = () => {
    setCurrentItem(item);
  };

  return (
    <Draggable draggableId={String(item.id)} index={index}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isItCurrentItem={isItCurrentItem}
          onClick={handleClick}
          isEven={isEven}
        >
          <div className="left">
            <img src={image} alt="itemImage" onError={handleError} />
            <div className="title">
              <h5>{item.name}</h5>
              {isItemHasCount && (
                <p className={item.count === 0 ? "zeroCount" : ""}>
                  {count} шт.
                </p>
              )}
            </div>
            <div className="info">
              {item.withPoint && (
                <div className="info_child">
                  <PointsIcon isItCurrentItem={isItCurrentItem} />
                  <p>{t("itemForPoints")}</p>
                </div>
              )}
              {item.withDiscount && (
                <div className="info_child">
                  <DiscountIcon isItCurrentItem={isItCurrentItem} />
                  <p>{t("itemForDiscount")}</p>
                </div>
              )}
            </div>
          </div>
          {!isItCurrentItem && (
            <div className="right">
              <p>{price} UZS</p>
              {item.withDiscount && <span>{priceWithDiscount} UZS</span>}
            </div>
          )}
          {isItCurrentItem && (
            <div className="icon_menu">
              <ButtonIcon className="mr">
                <EyeIcon />
              </ButtonIcon>
              <ItemPopover onOpenModal={onOpenModal} />
            </div>
          )}
        </Wrapper>
      )}
    </Draggable>
  );
};
