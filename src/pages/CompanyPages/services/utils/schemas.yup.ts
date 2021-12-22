import * as yup from "yup"

//! refactor: variant fields as each number field can be nullable and can have empty string

export const sectionsSchema = yup.object().shape({
    sections: yup.array().of(
        yup.object().shape({
            title: yup.string().max(30, "maxAmountOfCharacters").required('enterSectionName')
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

const variantSchema = yup.object().shape({
    name: yup.array().of(
        yup.object().shape({
            data: yup.string().max(30, 'maxAmountOfSymbols').required('requiredField'),
            lang: yup.string().required()
        })
    ),

    amount: yup
        .number()
        .nullable(true)
        .transform((parsedValue, originalValue) => originalValue === '' ? null : parsedValue)
        .max(1000001, 'maxAmountOfItems')
        .required('enterAmountOfItem'),

    articul: yup.string().required('enterArticulOfItem').max(30, 'maxAmountOfSymbols'),

    price: yup.number().typeError('enterPriceOfItem').max(1000000001, 'maxPriceOneBillion').required('enterPriceOfItem'),

    priceWithSale: yup.string()
    
})

const variantSchemaWithSale = yup.object().shape({
    name: yup.array().of(
        yup.object().shape({
            data: yup.string().max(30, 'maxAmountOfSymbols').required('requiredField'),
            lang: yup.string().required()
        })
    ),

    amount: yup
        .number()
        .nullable(true)
        .transform((parsedValue, originalValue) => originalValue === '' ? null : parsedValue)
        .max(1000001, 'maxAmountOfItems')
        .required('enterAmountOfItem'),


    articul: yup.string().required('enterArticulOfItem').max(30, 'maxAmountOfSymbols'),

    price: yup.number().typeError('enterPriceOfItem').max(1000000001, 'maxPriceOneBillion').required('enterPriceOfItem'),

    priceWithSale: yup.number().typeError('enterPriceOfItemWithSale').lessThan(yup.ref('price'), 'priceWithSaleMustBeLessThanPriceWithoutSale').required('enterPriceOfItemWithSale')
    
})



export const goodsSchema = yup.object().shape({
    titles: yup.array().of(
        yup.object().shape({
            data: yup.string().max(30, 'maxAmountOfSymbols').required('enterItemOrServiceName'),
            lang: yup.string().required()
        })
    ),

    descriptions: yup.array().of(
        yup.object().shape({
            data: yup.string().max(800, 'maxAmountOfSymbolsDesc').required('enterItemOrServiceDescription'),
            lang: yup.string().required()
        })
    ),

    loyaltyOff: yup.boolean(),

    measurement: yup.object().shape({
        label: yup.string(),
        name: yup.string(),
        value: yup.number().required('requiredField')
    }).required('requiredField'),

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
        yup.string()
    ).min(1, 'chooseAtLeastOneImage'),

    preparationTimeData: yup.object().when('preparationTime', {
        is: true,
        then: yup.object().shape({
            days: yup
                .number()
                .nullable(true)
                .max(365, 'maxAmountOfDays')
                .transform((parsedValue, originalValue) => originalValue === '' ? null : parsedValue),
            hours: yup
                .number()
                .nullable(true)
                .max(24, 'maxAmountOfHours')
                .transform((parsedValue, originalValue) => originalValue === '' ? null : parsedValue),
            minutes: yup
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
                path: `${path}.days`
            })
        }),
    }),

    variants: yup.array().when('loyaltyType', {
        is: (val: number | string) => Number(val) === 1,
        then: yup.array().of(variantSchemaWithSale),
        otherwise: yup.array().of(variantSchema)
    })
})






