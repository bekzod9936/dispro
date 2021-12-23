import { IGoodsResponse } from "services/queries/servicesQueries/response.types";
import { Item } from "../Item";
import { Wrapper } from "./style";
interface ItemGroupProps {
  goods: IGoodsResponse[];
  sectionName: string | undefined;
}

export const ItemGroup: React.FC<ItemGroupProps> = ({ goods, sectionName }) => {
  return (
    <Wrapper>
      <div className="header">
        <h4>{sectionName || "Section Name"}</h4>
      </div>
      {goods.map((item, index) => (
        <Item isEven={Boolean((index + 1) % 2)} item={item} />
      ))}
    </Wrapper>
  );
};
