import { IGoodsResponse, ISectionResponse } from "services/queries/servicesQueries/response.types";

export type createSectionFormType = {
    sections: { title: string }[]
}

export type TitleType = {
    title: string,
    desc: string,
    lang: string
}
export type titleType = {
    data: string;
    lang: string;
};

export type descType = {
    lang: string;
    data: string;
};

export type variantType = {
    name: titleType[],
    price: string,
    priceWithSale: string,
    amount: string,
    articul: string
} 

export type preparationTimeType = {
    day: number | null,
    hour: number | null,
    minute: number | null

}
export interface FormFieldTypes {
  titles: TitleType[];
  descriptions: descType[];
  measurement: any,
  service: any,
  section: any,
  loyaltyType: any,
  loyaltyOff: boolean,
  variants: variantType[],
  preparationTime: boolean,
  images: string[],
  preparationTimeData: preparationTimeType
}



export type CreateDtoType = {
    images: string[],
    preparationTime: boolean,
    titles: TitleType[],
    loyaltyOff: boolean,
    loyaltyType: string,
    measurement: {
        label: string,
        name: string,
        value: number
    },
    preparationTimeData: preparationTimeType,
    section: {
        label: string,
        name: string,
        value: number
    },
    service: {
        label: string,
        name: string,
        value: number
    },
    variants: variantType[]
}

export type PostDtoVariantType = {
    goodsVariantTranslates: {
        langId: number,
        translateName: string
    }[],
    price: number,
    priceWithDiscount: number,
    count: number,
    artikulCode: string
}

export type PostDtoTitleType = {
    langId: number,
    translateName: string,
    translateDesc: string,
}

export interface PostDtoType {
    artikulCode: string,
    categoryId: number,
    unitId: number,
    currencyId: number,
    goodsSectionId: number,
    withDiscount: boolean,
    withPoint: boolean,
    notUsePl: boolean,
    price: number,
    priceWithDiscount: number,
    count: number,
    isCountUnlimited: boolean,
    ageUnlimited: boolean,
    isSetManufacturedTime?: boolean,
    manufacturedAt?: {
        day?: number,
        hour?: number,
        minute?: number
    },
    positionAt: number,
    hideInStores: number[],
    hasGoodsVariant: boolean,
    goodsVariants: PostDtoVariantType[],
    goodsTranslates: PostDtoTitleType[],
    goodsImages: {
        imageUrl: string
    }[]
}


export interface parentSectionType extends ISectionResponse {
    children: ISectionResponse[]
}

export interface SubSectionFormTypes {
    subSection: string;
  }


export interface EditSectionType {
    section: string
}


export interface IGoods {
    [id: number]: IGoodsResponse[]
}

export type sectionsObjectType = {
    [id: number]: string
}