import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { ApiServices } from "services/queries/servicesQueries"
import { IGoodsResponse } from "services/queries/servicesQueries/response.types"
import { GET_ITEM } from "../../constants"
import { resetDefaultValues } from "../../helpers"
import { goodsSchema } from "../../utils/schemas.yup"
import { FormFieldTypes } from "../../utils/types"

type ParamTypes = {
    id: string
}


export const useEditItem = () => {
    const { id } = useParams<ParamTypes>()

    const { data, isFetched } = useQuery(GET_ITEM, () => ApiServices.getItemById(Number(id)), {
        refetchOnWindowFocus: false,
        retry: 0,
    })

    const form = useForm<FormFieldTypes>({
        mode: 'onChange',
        // resolver: yupResolver(goodsSchema),
    })

    // useEffect(() => {
    //     if (data) {
    //       const defaultValues = resetDefaultValues(data);
    //         console.log('reset', defaultValues)

    //       form.reset(defaultValues);
    //     }

    //   }, [isFetched]);

    return form
}