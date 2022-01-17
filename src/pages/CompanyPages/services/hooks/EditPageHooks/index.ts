import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useReducer } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { useLocation, useParams } from "react-router-dom"
import { ApiServices } from "services/queries/servicesQueries"
import { useCategories, useGetSections } from ".."
import { createItemDefaultFields, CREATE_ITEM_QUIT_MODAL_CONTENT, EDIT_ITEM_QUIT_MODAL_CONTENT, GET_ITEM, measurements } from "../../constants"
import { getSectionOfItem, resetDefaultValues } from "../../helpers"
import { goodsSchema } from "../../utils/schemas.yup"
import { FormFieldTypes, PostDtoType } from "../../utils/types"
import { ActionTypes, initialState, reducer } from "../CreatePageHooks/reducer"

type ParamTypes = {
    id: string
}

export const useGetItemById = () => {
    const { id } = useParams<ParamTypes>()

    return useQuery([GET_ITEM, id], () => ApiServices.getItemById(Number(id)), {
        refetchOnWindowFocus: false,
        retry: 0,
    })

}


export const useQuitModalContent = () => {
    const location = useLocation()
    const isCreatePage = location.pathname.includes('create')

    const content = isCreatePage ? CREATE_ITEM_QUIT_MODAL_CONTENT : EDIT_ITEM_QUIT_MODAL_CONTENT

    return content
}


export const useEditItem = (length: number) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const categoryList = useCategories()
    const {data: sections, isFetched: sectionIsFetched} = useGetSections()

    const { data, isFetched, } = useGetItemById()
    const isLoaded = isFetched && sectionIsFetched

    const form = useForm<FormFieldTypes>({
        mode: 'onChange',
        resolver: yupResolver(goodsSchema),
        defaultValues: createItemDefaultFields,
        context: { length }
    })

    useEffect(() => {
        if (data) {
          const defaultValues = resetDefaultValues(data);
          const category = categoryList.find(el => el.value === data.categoryId)
          const section = getSectionOfItem(sections, data.goodsSectionId)
          const measurement = measurements.find(m => m.value === data.unitId)
          dispatch({type: ActionTypes.CHANGE_LOYALTY_TYPE, payload: defaultValues.loyaltyType})
          dispatch({type: ActionTypes.CHANGE_LOYALTY_OFF, payload: defaultValues.loyaltyOff})

        //   form.reset({...defaultValues, service: category, section, measurement});
          form.setValue('variants', defaultValues.variants)
          form.setValue('images', defaultValues.images)
          form.setValue('preparationTime', defaultValues.preparationTime)
          form.setValue('preparationTimeData', defaultValues.preparationTimeData)
          form.setValue('titles', defaultValues.titles)
          form.setValue('section', section)
          form.setValue('service', category)
          form.setValue('measurement', measurement)
          form.setValue('loyaltyOff', defaultValues.loyaltyOff)
          form.setValue('loyaltyType', defaultValues.loyaltyType)
        }

      }, [isLoaded, categoryList, data]);

    return {form, state, dispatch, isLoaded}
}

type IParams = {
    id: string
}

export const useEditService = () => {
    const { id }: IParams = useParams()
    return useMutation((dto: PostDtoType) => ApiServices.editService({id: Number(id) || 0, dto}))
}