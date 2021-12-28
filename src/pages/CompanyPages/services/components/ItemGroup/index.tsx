//packages
import { DragDropContext, Droppable } from "react-beautiful-dnd";

//components
import { Item } from "../Item";

//other
import { Modals } from "../../utils/types";
import { IGoodsResponse } from "services/queries/servicesQueries/response.types";
import { useDragNDrop } from "../../hooks/MainPageHooks";

//style
import { Wrapper } from "./style";

interface ItemGroupProps {
  goods: IGoodsResponse[];
  sectionName: string | undefined;
  currentItem: IGoodsResponse | null;
  setCurrentItem: (arg: IGoodsResponse | null) => void;
  onOpenModal: (modalName: keyof Modals) => void;
  sectionId: string;
}

export const ItemGroup: React.FC<ItemGroupProps> = ({
  goods,
  sectionName,
  setCurrentItem,
  currentItem,
  onOpenModal,
  sectionId,
}) => {
  const { items, onDragEnd, onGoToTop, scrollRef } = useDragNDrop(goods);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <div ref={scrollRef} className="header">
          <h4>{sectionName || "Section Name"}</h4>
        </div>
        <Droppable droppableId={sectionId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <Item
                  key={item.id}
                  index={index}
                  onGoToTop={onGoToTop}
                  onOpenModal={onOpenModal}
                  setCurrentItem={setCurrentItem}
                  currentItemId={currentItem?.id}
                  item={item}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
};
