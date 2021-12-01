import * as yup from "yup"


export const sectionsSchema = yup.object().shape({
    sections: yup.array().of(
        yup.object().shape({
            name: yup.string().max(30, "maxAmountOfCharacters").required('requiredField')
        })
    )
})