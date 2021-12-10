import * as yup from "yup"



export const sectionsSchema = yup.object().shape({
    sections: yup.array().of(
        yup.object().shape({
            title: yup.string().max(30, "maxAmountOfCharacters").required('requiredField')
        })
    ).test('unique', 'titlesOfSectionsMustBeUnique', function (array) {
        let res = array?.map(el => el.title);
        const { createError, path } = this;
        if (res?.length === new Set(res).size) return true;
        else {
            if (array?.some(e => !(e.title))) return true
            let index = 0;
            let uniqueArray: string[] = [];
            array?.forEach((el: any, indx: number) => {
                if (!uniqueArray.includes(el.title)) {
                    uniqueArray.push(el.title)
                } else index = indx
            })

            throw createError({
                message: "titlesOfSectionsMustBeUnique",
                path: `${path}.${index}.title`
            })
        }

    })
})



