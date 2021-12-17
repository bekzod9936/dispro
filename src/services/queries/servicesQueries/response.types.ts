
export type uploadImageType = {
    data: {
        link: string
    },
    error: null,
    success: boolean
}

export type sectionDtoType = {
    hideInMobile: false,
    positionAt: number,
    parentId: number,
    goodsSectionTranslates: {
        langId: number,
        translateName: string
    }[]
}

export interface ICategory {
    code: string,
    companies: unknown[],
    coupons: unknown[],
    id: number,
    logo: string,
    merchantCount: number,
    merchants: unknown[],
    name: string,
    parentId: number
}

export type categoriesResponseType = {
    data: ICategory[],
    error: null | unknown,
    success: boolean
}