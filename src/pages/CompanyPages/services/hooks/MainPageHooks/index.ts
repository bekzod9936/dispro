import { useEffect, useRef, useState } from "react"
import { DropResult } from "react-beautiful-dnd"
import { useTranslation } from "react-i18next"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { ApiServices } from "services/queries/servicesQueries"
import { IGoodsResponse, ISectionResponse } from "services/queries/servicesQueries/response.types"
import { useGetSections } from ".."
import { GET_ITEMS, GET_SECTIONS } from "../../constants"
import { divideGoodsBySections } from "../../helpers"
import {hideSectionPostType, moveSectionPostType, sectionsObjectType} from '../../utils/types'

export const useGetItems = (id: number | undefined, query?: string) => {
    const { data, ...rest } = useQuery([GET_ITEMS, query, id], () => {
      if (id !== undefined) {
        return ApiServices.getItemsBySectionId(id)

      }
      return ApiServices.getItems(query)
    },
    {
        refetchOnWindowFocus: false,
        retry: 1
    }) 

    const total = data?.totalCount || 0
    const goods = divideGoodsBySections(data?.goodsArr || [])

    return { total, goods, ...rest }
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
    const [scrollState, setScrollState] = useState(false)
    const scrollRef = useRef<HTMLDivElement | null>(null)
  
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

    const onGoToTop = (id: number) => {
      const currentItem = items.find(item => item.id === id);
      const newItems = items.filter(item => item.id !== id);

      setItems([currentItem!, ...newItems]);
      setScrollState(true)
    }
  
  useEffect(() => {
    if (items.length !== goods.length) {
      setItems(goods);
    }
  }, [goods, items]);

  useEffect(() => {
    if (scrollState && scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
      setScrollState(false)
    }
  }, [scrollState, setScrollState])

  
  return {
    items,
    onDragEnd,
    onGoToTop,
    scrollRef
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
  const { t } = useTranslation()
  return isLoading
    ? t("loading")
    : total > 0
    ? `${t("totalCountOfGoods")}: ${total}`
    : t("youDontHaveProducts")
}

export const useDeleteSection = () => {
  const queryClient = useQueryClient()
  return useMutation((id: number) => ApiServices.deleteSection(id), {
    onSettled() {
      queryClient.invalidateQueries(GET_SECTIONS)
    }
  })
}

export const useMoveSection = () => {
  const queryClient = useQueryClient()

  return useMutation(({ id, parentId }: moveSectionPostType) => ApiServices.moveSection(id, parentId), {
    onSettled() {
      queryClient.invalidateQueries(GET_SECTIONS)
    }
  })
}

export const useHideSection = () => {
  const queryClient = useQueryClient()

  return useMutation(({id, action}: hideSectionPostType) => ApiServices.hideSection(id, action), {
    onSettled() {
      queryClient.invalidateQueries(GET_SECTIONS)
    }
  })
}