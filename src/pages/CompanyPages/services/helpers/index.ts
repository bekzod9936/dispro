import { ICategory, sectionDtoType } from "services/queries/servicesQueries/response.types"
import { createSectionFormType } from "../utils/types"

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

export const createItemDefaultFields = {
    titles: [{ data: "", lang: "(Рус)" }],
    descriptions: [{ data: "", lang: "(Рус)" }],
    variants: [
      {
        name: [{ data: "", lang: "(Рус)" }],
        amount: "",
        price: "",
        priceWithSale: "",
        articul: "",
      },
    ],
    loyaltyOff: false,
    images: [],
    preparationTime: false,
    preparationTimeData: {
      days: '',
      hours: '',
      minutes: ''
    }
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