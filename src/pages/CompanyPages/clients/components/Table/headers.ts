export const headers = [
    { value: "Оплачено", label: "amountOperation" },
    { value: "Рекомендации", label: "countRefer" },
    { value: "Источники трафика", label: "sourceBy" },
    { value: "Статус", label: "status" },
    { value: "Последняя покупка", label: "lastPurchase" },
    { value: "Количество покупок", label: "purchaseCount" }
]

export const addedHeaders = [
    { value: "Клиент", label: "fullName" },
    { value: "Сумма скидки", label: "discountSum" },
    { value: "Сумма баллов", label: "pointSum" },
    { value: "Сумма кешбэка", label: "cashbackSum" },
    { value: "Пол", label: "gender" },
    { value: "Возраст", label: "age" },
]


export const addHeader = ({ value, addedHeaders, header }: any) => {
    if (value) {
        return [...addedHeaders, header]
    } else {
        return addedHeaders.filter((el: any) => el.label !== header.label)
    }
}