import { PostDtoType } from "pages/CompanyPages/services/utils/types"

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

export interface ISectionResponse {
    companyId: number,
    createdAt: string,
    goodsSectionTranslates: {
        langId: number,
        translateName: string
    }[],
    hideInMobile: boolean,
    id: number,
    langId: number,
    name: string,
    parentId: number,
    positionAt: number
}
export type sectionResponseType = {
    data: ISectionResponse[],
    error: null | any,
    success: boolean
}

export interface IGoodsResponse extends PostDtoType {
    companyId: number,
    createdAt: string,
    description: string,
    id: number,
    langId: number,
    name: string,
    unitCount: number,
}

export type goodsResponseType = {
    data: {
        goodsArr: IGoodsResponse[],
        totalCount: number
    },
    error: null | unknown,
    success: boolean
}

export type goodResponseType = {
    data: IGoodsResponse,
    error: null | unknown,
    success: boolean
}

export type editServicePostType = {
    id: number,
    dto: PostDtoType
}

export type editAmountPutType = {
    id: number,
    dto: Pick<PostDtoType, "isCountUnlimited" | "count">
}