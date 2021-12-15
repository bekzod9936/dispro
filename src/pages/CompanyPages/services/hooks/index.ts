import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query"
import { Api } from "services/queries/servicesQueries";
import { FormFieldTypes } from "../utils/types";

export const useImage = () => {
    const {getValues, setValue} = useFormContext<FormFieldTypes>()

    const [links, setLinks] = useState(getValues('images'))

    const uploadImage = useMutation((formData: FormData) => Api.uploadImage(formData), {
        onSuccess: (data) => {
            setLinks(prev => ([...prev, data.data.link]))
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
        uploadImage, deleteImage, links, setLinks
    }
}

