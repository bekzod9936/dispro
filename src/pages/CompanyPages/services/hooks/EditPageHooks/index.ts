import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useReducer } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { ApiServices } from "services/queries/servicesQueries"
import { IGoodsResponse } from "services/queries/servicesQueries/response.types"
import { useCategories, useGetSections } from ".."
import { createItemDefaultFields, GET_ITEM } from "../../constants"
import { resetDefaultValues } from "../../helpers"
import { goodsSchema } from "../../utils/schemas.yup"
import { FormFieldTypes } from "../../utils/types"
import { ActionTypes, initialState, reducer } from "../CreatePageHooks/reducer"

type ParamTypes = {
    id: string
}

export const useEditItem = () => {
    const { id } = useParams<ParamTypes>()
    const [state, dispatch] = useReducer(reducer, initialState);
    const categoryList = useCategories()
    const {data: sections, isFetched: sectionIsFetched} = useGetSections()

    const { data, isFetched } = useQuery([GET_ITEM, id], () => ApiServices.getItemById(Number(id)), {
        refetchOnWindowFocus: false,
        retry: 0,
    })

    const form = useForm<FormFieldTypes>({
        mode: 'onChange',
        resolver: yupResolver(goodsSchema),
        defaultValues: createItemDefaultFields
    })

    useEffect(() => {
        if (data) {
          const defaultValues = resetDefaultValues(data);
          const category = categoryList.find(el => el.value === data.categoryId)
          let section: any = sections?.data.find(el => el.id === data.goodsSectionId)
          section = {value: section?.id, name: section?.goodsSectionTranslates[0].translateName!, label: section?.goodsSectionTranslates[0].translateName}
          
          console.log(section)
          dispatch({type: ActionTypes.CHANGE_LOYALTY_TYPE, payload: defaultValues.loyaltyType})
          dispatch({type: ActionTypes.CHANGE_LOYALTY_OFF, payload: defaultValues.loyaltyOff})

          form.reset({...defaultValues, service: category, section: section});
        }

      }, [isFetched, sectionIsFetched]);

    return {form, state, dispatch}
}