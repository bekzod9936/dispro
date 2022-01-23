import { useTranslation } from "react-i18next";
import useWindowWidth from "services/hooks/useWindowWidth";
import { WrapImages, WrapTrash, WrapImage, Label } from "./style";
import ImageLazyLoad from "components/Custom/ImageLazyLoad/ImageLazyLoad";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ReactComponent as PhotoIcon } from "assets/icons/IconsInfo/photo.svg";
import { ReactComponent as TrashIcon } from "assets/icons/IconsInfo/trash.svg";

const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

interface Props {
  state?: any;
}

const RenderImages = ({ state }: Props) => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const [images, setImages] = state;

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      images,
      result.source.index,
      result.destination.index
    );

    setImages(items);
  };

  const handleDelete = (v: any) => {
    const newImgs = images.filter((i: any) => i !== v);
    setImages(newImgs);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="droppable"
        direction={width > 1000 ? "horizontal" : "vertical"}
      >
        {(provided) => (
          <WrapImages
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              overflow: "hidden",
            }}
          >
            {images.map((v: any, index: number) => (
              <Draggable key={v} draggableId={v} index={index}>
                {(provided) => (
                  <WrapImage
                    key={index}
                    onClick={() => handleDelete(v)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ImageLazyLoad objectFit="cover" src={v} alt="image" />
                    <WrapTrash>
                      <TrashIcon />
                    </WrapTrash>
                  </WrapImage>
                )}
              </Draggable>
            ))}
            {images.length < 10 && width > 1000 ? (
              <Label htmlFor="photosloading">
                <PhotoIcon />
                <span>{`${t("addphoto")}  +`}</span>
              </Label>
            ) : null}
          </WrapImages>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RenderImages;
