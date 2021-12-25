//components
import { Item } from "../Item";

//other
import { Modals } from "../../utils/types";
import { IGoodsResponse } from "services/queries/servicesQueries/response.types";

//style
import { Wrapper } from "./style";

interface ItemGroupProps {
  goods: IGoodsResponse[];
  sectionName: string | undefined;
  currentItem: IGoodsResponse | null;
  setCurrentItem: (arg: IGoodsResponse | null) => void;
  onOpenModal: (modalName: keyof Modals) => void;
}

export const ItemGroup: React.FC<ItemGroupProps> = ({
  goods,
  sectionName,
  setCurrentItem,
  currentItem,
  onOpenModal,
}) => {
  return (
    <Wrapper>
      <div className="header">
        <h4>{sectionName || "Section Name"}</h4>
      </div>
      {goods.map((item, index) => (
        <Item
          onOpenModal={onOpenModal}
          setCurrentItem={setCurrentItem}
          currentItemId={currentItem?.id}
          isEven={Boolean((index + 1) % 2)}
          item={item}
        />
      ))}
    </Wrapper>
  );
};
