import * as yup from "yup"


export const sectionsSchema = yup.object().shape({
    sections: yup.array().of(
        yup.object().shape({
            title: yup.string().transform((value) => value.trim()).max(30, "maxAmountOfCharacters").required('enterSectionName')
        })
    )
    //* awesome peace of code
    // .test('unique', 'titlesOfSectionsMustBeUnique', function (array) {
    //     let res = array?.map(el => el.title);
    //     const { createError, path } = this;
    //     if (res?.length === new Set(res).size) return true;
    //     else {
    //         if (array?.some(e => !(e.title))) return true
    //         let index = 0;
    //         let uniqueArray: string[] = [];
    //         array?.forEach((el: any, indx: number) => {
    //             if (!uniqueArray.includes(el.title)) {
    //                 uniqueArray.push(el.title)
    //             } else index = indx
    //         })

    //         throw createError({
    //             message: "titlesOfSectionsMustBeUnique",
    //             path: `${path}.${index}.title`
    //         })
    //     }

    // })
})

const variantSchema = yup.object().shape({
    name: yup.array().of(
        yup.object().shape({
            data: yup.string().when('$length', {
                is: (val: number) => val > 1,
                then: yup.string().max(30, 'maxAmountOfSymbols').transform((value) => value.trim()).required('requiredField'),
                otherwise: yup.string()
            }),
            lang: yup.string().required()
        })
    ),

    amount: yup
        .number()
        .min(1, "minAmoutOfItems")
        .nullable(true)
        .transform((parsedValue, originalValue) => originalValue === '' || originalValue === '.' ? null : parsedValue)
        .max(1000001, 'maxAmountOfItems'),

    articul: yup.string().required('enterArticulOfItem').transform((value) => value.trim()).max(30, 'maxAmountOfSymbols'),

    price: yup
        .number()
        .min(1000, 'minAmountOfPrice')
        .nullable(true)
        .transform((parsedValue, originalValue) => originalValue === '' || originalValue === '.' ? null : parsedValue)
        .max(1000000001, 'maxPriceOneBillion')
        .required('enterPriceOfItem'),

    priceWithSale: yup.string()
    
})

const variantSchemaWithSale = yup.object().shape({
    name: yup.array().of(
        yup.object().shape({
            data: yup.string().when('$length', {
                is: (val: number) => val > 1,
                then: yup.string().max(30, 'maxAmountOfSymbols').transform((value) => value.trim()).required('requiredField'),
                otherwise: yup.string()
            }),
            lang: yup.string().required()
        })
    ),

    amount: yup
        .number()
        .nullable(true)
        .min(1, "minAmoutOfItems")
        .transform((parsedValue, originalValue) => originalValue === '' || originalValue === '.' ? null : parsedValue)
        .max(1000001, 'maxAmountOfItems'),

    articul: yup.string().required('enterArticulOfItem').transform((value) => value.trim()).max(30, 'maxAmountOfSymbols'),

    price: yup
        .number()
        .nullable(true)
        .transform((parsedValue, originalValue) => originalValue === '' || originalValue === '.' ? null : parsedValue)
        .min(1000, 'minAmountOfPrice')
        .max(1000000001, 'maxPriceOneBillion')
        .required('enterPriceOfItem'),

    priceWithSale: yup
        .number()
        .min(1000, 'minAmountOfPrice')
        .lessThan(yup.ref('price'), 'priceWithSaleMustBeLessThanPriceWithoutSale')
        .nullable(true)
        .transform((parsedValue, originalValue) => originalValue === '' || originalValue === '.' ? null : parsedValue)
        .required('enterPriceOfItemWithSale')
    
})



export const goodsSchema = yup.object().shape({
    titles: yup.array().of(
        yup.object().shape({
            title: yup.string().max(30, 'maxAmountOfSymbols').transform((value) => value.trim()).required('enterItemOrServiceName'),
            desc: yup.string().max(800, 'maxAmountOfSymbolsDesc').transform((value) => value.trim()).required('enterItemOrServiceDescription'),
            lang: yup.string().required()
        })
    ),

    loyaltyOff: yup.boolean(),

    measurement: yup.object().shape({
        label: yup.string(),
        name: yup.string(),
        value: yup.number()
    }),

    service: yup.object().shape({
        label: yup.string(),
        name: yup.string(),
        value: yup.number().required('requiredField')
    }).required('requiredField'),

    section: yup.object().shape({
        label: yup.string(),
        name: yup.string(),
        value: yup.number().required('requiredField')
    }).required('requiredField'),

    loyaltyType: yup.string(),

    images: yup.array().of(
        yup.object().shape({
            url: yup.string()
        })
    ).min(1, 'chooseAtLeastOneImage'),

    preparationTimeData: yup.object().when('preparationTime', {
        is: true,
        then: yup.object().shape({
            day: yup
                .number()
                .nullable(true)
                .max(365, 'maxAmountOfDays')
                .transform((parsedValue, originalValue) => originalValue === '' ? null : parsedValue),
            hour: yup
                .number()
                .nullable(true)
                .max(24, 'maxAmountOfHours')
                .transform((parsedValue, originalValue) => originalValue === '' ? null : parsedValue),
            minute: yup
                .number()
                .nullable(true)
                .max(60, 'maxAmountOfMinutes')
                .transform((parsedValue, originalValue) => originalValue === '' ? null : parsedValue)
        }).test('checkAllFields', 'atLeastOneFieldRequired', function(obj) {
            const {createError, path} = this;

            const isFieldFilled = Object.values(obj).some((fieldValue) => fieldValue)

            if (isFieldFilled) return true;

            else throw createError({
                message: 'atLeastOneFieldRequired',
                path: `${path}.day`
            })
        }),
    }),

    variants: yup.array().when('loyaltyType', {
        is: (val: number | string) => Number(val) === 1,
        then: yup.array().of(variantSchemaWithSale),
        otherwise: yup.array().of(variantSchema)
    })
})



export const subSectionSchema = yup.object().shape({
    subSection: yup.string().max(30, "maxAmountOfCharacters").transform((value) => value.trim()).required('enterSubSectionName')
})


export const editSectionSchema = yup.object().shape({
    section: yup.string().transform((value) => value.trim()).max(30, "maxAmountOfCharacters").required('requiredField')
})

export const changeAmountSchema = yup.object().shape({
    isCountUnlimited: yup.boolean(),
    count: yup.number().when('isCountUnlimited', {
        is: (val: any) => Boolean(val),
        then: yup.number().nullable(true).transform((parsedValue, originalValue) => originalValue === '' ? null : parsedValue),
        otherwise: yup
            .number()
            .nullable(true)
            .transform((parsedValue, originalValue) => originalValue === '' ? null : parsedValue)
            .min(1, 'minAmoutOfItems')
            .max(1000001, 'maxAmountOfItems')
            .required('enterAmountOfItem')
    })
})