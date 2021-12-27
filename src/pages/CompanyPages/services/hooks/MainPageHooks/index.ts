import { useEffect, useRef, useState } from "react"
import { DropResult } from "react-beautiful-dnd"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"
import { ApiServices } from "services/queries/servicesQueries"
import { IGoodsResponse, ISectionResponse } from "services/queries/servicesQueries/response.types"
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

export const useScrollToCurrentSection = (currentSection: ISectionResponse | null) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    sectionRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    })
  }, [currentSection])

  return sectionRef
}

export const useGetTotalCountTitle = (isLoading: boolean, total: number) => {
  const {t} = useTranslation()
  return isLoading
  ? t("loading")
  : total > 0
  ? `${t("totalCountOfGoods")}: ${total}`
  : t("youDontHaveProducts")
}