//components
import { Item } from "../Item";

//other
import { Modals } from "../../utils/types";
import { IGoodsResponse } from "services/queries/servicesQueries/response.types";

//style
import { Wrapper } from "./style";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useState } from "react";

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
  const [state, setState] = useState(goods);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newGoods = [...state];
    newGoods.splice(source.index, 1);
    const draggedItem = state.find((item) => item.id === Number(draggableId));

    if (draggedItem) {
      newGoods.splice(destination.index, 0, draggedItem);
    }

    setState(newGoods);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <div className="header">
          <h4>{sectionName || "Section Name"}</h4>
        </div>
        <Droppable droppableId={sectionId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {state.map((item, index) => (
                <Item
                  key={item.id}
                  index={index}
                  onOpenModal={onOpenModal}
                  setCurrentItem={setCurrentItem}
                  currentItemId={currentItem?.id}
                  isEven={Boolean((index + 1) % 2)}
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
