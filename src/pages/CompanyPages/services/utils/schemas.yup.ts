import * as yup from "yup"



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

    amount: yup.string().test('length', 'minAmountOfItems', (text) => {
        return Number(text) > 8
    }).required('enterAmountOfItem'),

    articul: yup.string().required('enterArticulOfItem').max(30, 'maxAmountOfSymbols'),

    // price: yup.string().test('length', 'maxPriceOneBillion', (text) => {
    //     return text?.trim() === '' ? false : Number(text) < 1000000001
    // }).required('enterPriceOfItem'),
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

    amount: yup.string().test('length', 'minAmountOfItems', (text) => {
        return Number(text) > 8
    }).required('enterAmountOfItem'),

    articul: yup.string().required('enterArticulOfItem').max(30, 'maxAmountOfSymbols'),

    // price: yup.number().test('length', 'maxPriceOneBillion', (text) => {
    //     return text?.trim() === '' ? false : Number(text) < 1000000001
    // }).required('enterPriceOfItem'),
    price: yup.number().typeError('enterPriceOfItem').max(1000000001, 'maxPriceOneBillion').required('enterPriceOfItem'),

    priceWithSale: yup.number().typeError('requiredField').lessThan(yup.ref('price'), 'priceWithSaleMustBeLessThanPriceWithoutSale').required('enterPriceOfItemWithSale')
    
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
    ).length(1, 'chooseAtLeastOneImage'),

    preparationTime: yup.array().of(
        yup.object().shape({
            days: yup.string(),
            hours: yup.string(),
            minutes: yup.string()
        })

    ).test('test', 'requiredField', (arr) => {
        return arr?.length === 0 || Boolean(arr?.some(e => Boolean(e.days) || Boolean(e.hours) || Boolean(e.minutes)))
    }),


    variants: yup.array().when('loyaltyType', {
        is: (val: number | string) => Number(val) === 1,
        then: yup.array().of(variantSchemaWithSale),
        otherwise: yup.array().of(variantSchema)
    })
})




