export function getValidData(data: any, isCoupon: boolean, image: string) {
    return {
        title: data.name,
        count: data.amount,
        ageUnlimited: !!!data.ageLimit,
        price: data.cost,
        value: data.percent,
        type: isCoupon ? "1" : "2",
        currencyId: 1,
        categoryIds: [...data?.categories?.map((el: any) => el.id)],
        companyId: 18,
        image: image,
        ageFrom: data.ageLimit || null,
        ageTo: null,
        description: data.description
    }
}