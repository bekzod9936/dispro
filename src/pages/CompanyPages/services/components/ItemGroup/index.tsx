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
import React, { useCallback, useEffect, useRef } from "react";

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
  const { items, onDragEnd } = useDragNDrop(goods);
  // const parentRef = useRef<null | HTMLDivElement>(null);

  // const handleOutsideClick = useCallback((event: MouseEvent) => {
  //   if (event && parentRef) {
  //     const el = parentRef.current;

  //     if (!el || el.contains(event.target as Node)) {
  //       setCurrentItem(null);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("click", handleOutsideClick);

  //   return () => {
  //     window.removeEventListener("click", handleOutsideClick);
  //   };
  // }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <div className="header">
          <h4>{sectionName || "Section Name"}</h4>
        </div>
        <Droppable droppableId={sectionId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <Item
                  key={item.id}
                  index={index}
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
