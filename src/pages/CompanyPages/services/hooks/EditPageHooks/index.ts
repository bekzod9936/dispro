import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { ApiServices } from "services/queries/servicesQueries"
import { createItemDefaultFields, GET_ITEM } from "../../constants"
import { resetDefaultValues } from "../../helpers"
import { goodsSchema } from "../../utils/schemas.yup"
import { FormFieldTypes } from "../../utils/types"

type ParamTypes = {
    id: string
}
export const useGetItemById = () => {
    const { id } = useParams<ParamTypes>()
    return useQuery([GET_ITEM, id], () => ApiServices.getItemById(Number(id)), {
        refetchOnWindowFocus: false,
        retry: 1,
    })
}

export const useEditItem = () => {

    const { data } = useGetItemById()

    const form = useForm<FormFieldTypes>({
        mode: 'onChange',
        resolver: yupResolver(goodsSchema),
        defaultValues: {
            titles: [
                {
                    title: '',
                    desc: '',
                    lang: '(Rus)'
                }
            ]
        }
    })

    useEffect(() => {
        if (data) {
          const defaultValues = resetDefaultValues(data);
    
          form.reset(defaultValues);
        }
      }, [data, form.reset]);

 
    return form
}