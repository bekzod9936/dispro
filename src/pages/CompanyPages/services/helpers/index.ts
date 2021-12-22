import { ICategory, ISectionResponse, sectionDtoType } from "services/queries/servicesQueries/response.types"
import { languageIds } from "../constants"
import { CreateDtoType, createSectionFormType, descType, parentSectionType, PostDtoType, PostDtoVariantType, preparationTimeType, titleType, variantType } from "../utils/types"

export const fileToBlob = (file: File, id: string) => {
    let formData = new FormData()
    formData.append('itemId', id)
    formData.append('fileType', 'goodsImage')
    formData.append('file', file)
    return formData
    
}

export const filesToBlob = (files: File[]) => {
    const companyId = localStorage.getItem('companyId') || ""
    
    return files.map(file => fileToBlob(file, companyId))
}

export const isFieldLast = (max: number, current: number, length: number): boolean => {
    return length <= max && current === length
}




export const sectionsToSectionArray = (data: createSectionFormType) => {

  return data.sections.map(section => sectionFieldToDto(section.title))

}

const sectionFieldToDto = (title: string): sectionDtoType => {
  return {
    hideInMobile: false,
    parentId: 0,
    positionAt: 1,
    goodsSectionTranslates: [
      {
        langId: 1,
        translateName: title
      }
    ]
  }
}


export const responseCategoriesToExactCategories = (allCategories: ICategory[], categoryIds: number[]) => {
  return allCategories
    .filter(category => categoryIds.includes(category.id))
    .map(category => ({
      name: category.code,
      label: category.name,
      value: category.id
    }))
}

export const imagesArrayToArrayObjectWithLinks = (images: string[]) => {
  return images.map(link => ({
    imageUrl: link
  }))
}

export const manufacturedTimeEntityToPostEntityForm = (manufactureTime: preparationTimeType) => {
  return {
    day: manufactureTime.days || 0,
    hour: manufactureTime.hours || 0,
    minute: manufactureTime.minutes || 0
  }
}



export const arrayToObjectWithLangIdAsKey = (array: titleType[] | descType[]) => {
  return array.reduce((acc, curr) => {
    let id = languageIds[curr.lang as keyof typeof languageIds]
    acc = {
      ...acc,
      [id]: curr.data
    }
    return acc
  } , {})
}

export const goodsTranslatesToPostEntityForm = (titles: titleType[], descriptions: descType[]) => {
  const titlesObject = arrayToObjectWithLangIdAsKey(titles)
  const descriptionsObject = arrayToObjectWithLangIdAsKey(descriptions)
  
  return Object.values(languageIds).map((id) => ({
    langId: id,
    translateName: titlesObject[id as keyof typeof titlesObject] || "",
    translateDesc: descriptionsObject[id as keyof typeof titlesObject] || ""
  }))

}

export const goodsVariantsToPostEntityForm = (variants: variantType[]): PostDtoVariantType[] => {


  return variants.map(variant => ({
    artikulCode: variant.articul,
    count: Number(variant.amount),
    price: Number(variant.price),
    priceWithDiscount: Number(variant.priceWithSale) || 0,
    goodsVariantTranslates: variant.name.map(titleObject => ({
      langId: languageIds[titleObject.lang as keyof typeof languageIds],
      translateName: titleObject.data
    }))
  }))
}


export const createServiceHelper = (dto: CreateDtoType): PostDtoType => {
  const firstVariant = dto.variants[0]
  const isServiceHasVariants = dto.variants.length > 1


  return {
    ageUnlimited: true,
    artikulCode: firstVariant.articul,
    categoryId: dto.service.value,
    count: Number(firstVariant.amount),
    currencyId: 1,
    goodsImages: imagesArrayToArrayObjectWithLinks(dto.images),
    goodsSectionId: 1,
    hasGoodsVariant: isServiceHasVariants,
    hideInStores: [],
    isCountUnlimited: false,
    withPoint: Number(dto.loyaltyType) === 2,
    withDiscount: Number(dto.loyaltyType) === 1,
    isSetManufacturedTime: dto.preparationTime,
    manufacturedAt: manufacturedTimeEntityToPostEntityForm(dto.preparationTimeData),
    notUsePl: dto.loyaltyOff,
    positionAt: 1,
    price: Number(firstVariant.price),
    priceWithDiscount: Number(firstVariant.priceWithSale),
    unitId: 1,
    goodsTranslates: goodsTranslatesToPostEntityForm(dto.titles, dto.descriptions),
    goodsVariants: isServiceHasVariants ? goodsVariantsToPostEntityForm(dto.variants) : []
  }
}



export const sectionsResponseToParentChildObject = (array: ISectionResponse[] | undefined): parentSectionType[] => {
  if (!array) return []

  const parentSections = array.filter(section => section.parentId === 0);

  return parentSections.map(parentSection => ({
    ...parentSection,
    children: array.filter(childSection => childSection.parentId === parentSection.id)
  }))
  
}


export const isChildHasActiveParent = (array: parentSectionType[], currentItemId: number | null) => {
  return array.some((section) =>
    section.children.some((child) => child.id === currentItemId)
  ) 
}

export const isParentHasActiveChild = (item: parentSectionType, currentItemId: number | null) => {
  return item.children.some(child => child.id === currentItemId)
}

