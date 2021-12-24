import { useQuery } from "react-query"
import { ApiServices } from "services/queries/servicesQueries"
import { useGetSections } from ".."
import { GET_ITEMS } from "../../constants"
import { divideGoodsBySections } from "../../helpers"
import {sectionsObjectType} from '../../utils/types'

export const useGetItems = () => {
    const { data, ...rest } = useQuery(GET_ITEMS, () => ApiServices.getItems(),
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