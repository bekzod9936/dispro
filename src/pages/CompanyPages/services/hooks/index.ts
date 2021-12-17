import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useMutation, useQuery } from "react-query"
import { Api } from "services/queries/servicesQueries";
import { sectionDtoType } from "services/queries/servicesQueries/response.types";
import { useAppSelector } from "services/redux/hooks";
import { responseCategoriesToExactCategories } from "../helpers";
import { sectionsSchema } from "../utils/schemas.yup";
import { FormFieldTypes } from "../utils/types";

export const useImage = () => {
    const {getValues, setValue, formState: { errors }, clearErrors} = useFormContext<FormFieldTypes>()

    const [links, setLinks] = useState(getValues('images'))

    const uploadImage = useMutation((formData: FormData) => Api.uploadImage(formData), {
        onSuccess: (data) => {
            setLinks(prev => ([...prev, data.data.link]))
            clearErrors('images')
        },
        onError: (error) => {
            console.warn(error, 'response error in service page')
            alert(error)
        }
    })

    const deleteImage = useMutation((link: string) => Api.deleteImage(link))

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


export const usePostSection = () => {
    return useMutation((dto: sectionDtoType) => Api.createSection(dto))
}


export const useCategories = () => {
    const { categories } = useAppSelector(state => state.partner.companyInfo);
    const [categoryList, setCategoryList] = useState<{name: string, value: string | number, label: string}[]>([])

    const _ = useQuery('fetchCategories', () => Api.getCategories(), {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setCategoryList(responseCategoriesToExactCategories(data.data, categories))
        }
    })

    return categoryList

}