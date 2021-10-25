export interface IState {
    drafts: any[],
    deferred: IDeferred[],
    onSale: IDeferred[],
    archive: any[],
    canceled: any[],
    isLoading: boolean,
    currentCoupon: IDeferred | any
    currentOnSaleCoupon: IDeferred | any
}


export interface IDeferred {
    ageFrom: number,
    ageUnlimited: boolean,
    categoryIds: number[],
    company: null | any,
    companyId: number,
    count: number,
    currencyId: number,
    description: string,
    endDate: string,
    fee: number,
    id: number,
    image: string,
    price: number,
    publishDate: string,
    startDate: string,
    status: number,
    title: string,
    type: number,
    used: number,
    value: number
}
