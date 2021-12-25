import { useEffect, useState } from "react"
import { DropResult } from "react-beautiful-dnd"
import { useQuery } from "react-query"
import { ApiServices } from "services/queries/servicesQueries"
import { IGoodsResponse } from "services/queries/servicesQueries/response.types"
import { useGetSections } from ".."
import { GET_ITEMS } from "../../constants"
import { divideGoodsBySections } from "../../helpers"
import {sectionsObjectType} from '../../utils/types'

export const useGetItems = (query?: string) => {
    const { data, ...rest } = useQuery([GET_ITEMS, query], () => ApiServices.getItems(query),
    {
        refetchOnWindowFocus: false,
        retry: 1
    }) 

    const total = data?.totalCount || 0
    const goods = divideGoodsBySections(data?.goodsArr || [])

    return {total, goods, ...rest}
}


export const useSectionsWithIdEntity = () => {
    const { data: sections } = useGetSections()

    return sections?.data.reduce((acc: sectionsObjectType, curr) => {
        acc = {
            ...acc,
            [curr.id]: curr.goodsSectionTranslates[0].translateName
        }
        return acc
    }, {})

}



export const useDragNDrop = (goods: IGoodsResponse[]) => {
    const [items, setItems] = useState(goods);
  
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
  
      const newGoods = [...items];
      newGoods.splice(source.index, 1);
      const draggedItem = items.find((item) => item.id === Number(draggableId));
  
      if (draggedItem) {
        newGoods.splice(destination.index, 0, draggedItem);
      }
  
      setItems(newGoods);
    };
  
    useEffect(() => {
      if (items.length !== goods.length) {
        setItems(goods);
      }
    }, [goods, items]);
  
    return {
      items,
      onDragEnd,
    };
  };
  