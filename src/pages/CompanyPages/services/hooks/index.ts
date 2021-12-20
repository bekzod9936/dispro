import { useEffect, useState } from "react";

//packages
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormContext } from "react-hook-form";
import { useMutation, useQuery } from "react-query"

//api
import { ApiServices } from "services/queries/servicesQueries";

//types
import { sectionDtoType } from "services/queries/servicesQueries/response.types";
import { FormFieldTypes } from "../utils/types";

//other
import { createItemDefaultFields, responseCategoriesToExactCategories } from "../helpers";
import { useAppSelector } from "services/redux/hooks";
import { goodsSchema, sectionsSchema } from "../utils/schemas.yup";


export const useImage = () => {
    const { getValues, setValue, formState: { errors }, clearErrors } = useFormContext<FormFieldTypes>()

    const [links, setLinks] = useState(getValues('images'))

    const uploadImage = useMutation((formData: FormData) => ApiServices.uploadImage(formData), {
        onSuccess: (data) => {
            setLinks(prev => ([...prev, data.data.link]))
            clearErrors('images')
        },
        onError: (error) => {
            console.warn(error, 'response error in services page')
            alert(error)
        }
    })

    const deleteImage = useMutation((link: string) => ApiServices.deleteImage(link))

    useEffect(() => {
        setValue('images', [...links])
    }, [links])

    return {
        uploadImage, deleteImage, links, setLinks, errors
    }
}

export const useSections = () => {
    return useForm({
        defaultValues: {
          sections: [{ title: "" }],
        },
        resolver: yupResolver(sectionsSchema),
        mode: "onChange",
      });
}

export const useCreateItem = () => {

    return useForm<FormFieldTypes>({
        mode: "onChange",
        defaultValues: createItemDefaultFields,
        resolver: yupResolver(goodsSchema),
    });
}


export const usePostSection = () => {
    return useMutation((dto: sectionDtoType) => ApiServices.createSection(dto))
}


export const useCategories = () => {
    const { categories } = useAppSelector(state => state.partner.companyInfo);
    const [categoryList, setCategoryList] = useState<{name: string, value: string | number, label: string}[]>([])

    const _ = useQuery('fetchCategories', () => ApiServices.getCategories(), {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setCategoryList(responseCategoriesToExactCategories(data.data, categories))
        }
    })

    return categoryList

}

export const useGetSections = () => {
    return useQuery('fetchSections', () => ApiServices.getSections(), {
        refetchOnWindowFocus: false,
        retry: 1,
        onSuccess: (data) => {
            console.log(data)
        }
    })
}