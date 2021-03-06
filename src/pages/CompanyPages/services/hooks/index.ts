import { useCallback, useEffect, useState } from "react";

//packages
import { yupResolver } from "@hookform/resolvers/yup";
import { useDebounce } from "use-debounce/lib";
import { useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query"

//api
import { ApiServices } from "services/queries/servicesQueries";

//types
import { ISectionResponse, sectionDtoType } from "services/queries/servicesQueries/response.types";
import { ChangeAmountFormType, EditSectionType, FormFieldTypes, SubSectionFormTypes } from "../utils/types";

//other
import { responseCategoriesToExactCategories } from "../helpers";
import { useAppSelector } from "services/redux/hooks";
import { changeAmountSchema, editSectionSchema, goodsSchema, sectionsSchema, subSectionSchema } from "../utils/schemas.yup";
import { createItemDefaultFields, GET_SECTIONS } from "../constants";

export const useImage = () => {
    const { getValues, setValue, formState: { errors }, clearErrors, control } = useFormContext<FormFieldTypes>()
    // const images = useWatch({name: 'images', control})
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'images'
    })
    // const [links, setLinks] = useState(images)

    const uploadImage = useMutation((formData: FormData) => ApiServices.uploadImage(formData), {
        onSuccess: (data) => {
            // setLinks(prev => ([...prev, data.data.link]))
            append({ url: data.data.link })
            clearErrors('images')
        },
        onError: (error) => {
            console.warn(error, 'response error in services page')
            alert(error)
        }
    })

    const deleteImage = useMutation((link: string) => ApiServices.deleteImage(link))

    const handleRemove = useCallback((index: number) => {
        remove(index)
    }, [])

    // useEffect(() => {
    //     setValue('images', [...links])
    // }, [links])


    // useEffect(() => {
    //     if (links.length === 0) {
    //         setLinks(images)
    //     }
    // }, [images.length])

    // return {
    //     uploadImage, deleteImage, links, setLinks, errors
    // }
    return {
        uploadImage, deleteImage, images: fields, errors, handleRemove
    }
}

export const useSections = () => {
    const form = useForm({
        defaultValues: {
          sections: [{ title: "" }],
        },
        resolver: yupResolver(sectionsSchema),
        mode: "onChange",
      });

    const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sections",
    });

    return {fields, append, remove, form}

}

export const useCreateItem = (length: number) => {

    const form = useForm<FormFieldTypes>({
        mode: "onChange",
        defaultValues: createItemDefaultFields,
        resolver: yupResolver(goodsSchema),
        context: { length }
    });

    return form
}


export const usePostSection = () => {
    const queryClient = useQueryClient()

    return useMutation((dto: sectionDtoType[]) => ApiServices.createSection(dto), {
        onSettled: () => {
            queryClient.invalidateQueries(GET_SECTIONS)
        }
    })
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
    return useQuery(GET_SECTIONS, () => ApiServices.getSections(), {
        refetchOnWindowFocus: false,
        retry: 1,
    })
}

export const useSearch = () => {
    const [query, setQuery] = useState('')
    const [debouncedQuery] = useDebounce(query, 300)


    return { value: query, onChange: setQuery, query: debouncedQuery }
}


export const useCurrentSection = () => {
    const [currentSection, setCurrentSection] = useState<null | ISectionResponse>(null);
    const [debouncedCurrentSection] = useDebounce(currentSection, 300)

    return { currentSection, setCurrentSection, section: debouncedCurrentSection }

}


export const useSubSectionForm = () => {
    return useForm<SubSectionFormTypes>({
      mode: "onChange",
      resolver: yupResolver(subSectionSchema),
    });
}

export const useEditSectionForm = (section: string) => {

    const form = useForm<EditSectionType>({
        mode: "onChange",
        resolver: yupResolver(editSectionSchema),
        defaultValues: {
            section: section
        }
      });

    useEffect(() => {
        form.reset({section: section})
    }, [section])

    return form
}


export const useChangeAmount = (defaultValue?: number, isUnlimited?: boolean) => {
    const form = useForm<ChangeAmountFormType>({
        mode: "onChange",
        resolver: yupResolver(changeAmountSchema)
    })

    useEffect(() => {
        form.reset({ count: defaultValue, isCountUnlimited: isUnlimited })
    }, [defaultValue, isUnlimited])

    return form
}
