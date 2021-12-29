import { useTranslation } from "react-i18next";
import {
  ICategory,
  IGoodsResponse,
  ISectionResponse,
  sectionDtoType,
} from "services/queries/servicesQueries/response.types";
import { numberWithNew } from "services/utils";
import { Variant } from "../components/Variant";
import { languageIds, languageLabels } from "../constants";
import {
  CreateDtoType,
  createSectionFormType,
  descType,
  FormFieldTypes,
  IGoods,
  parentSectionType,
  PostDtoType,
  PostDtoVariantType,
  preparationTimeType,
  TitleType,
  titleType,
  variantType,
} from "../utils/types";

export const fileToBlob = (file: File, id: string) => {
  let formData = new FormData();
  formData.append("itemId", id);
  formData.append("fileType", "goodsImage");
  formData.append("file", file);
  return formData;
};

export const filesToBlob = (files: File[]) => {
  const companyId = localStorage.getItem("companyId") || "";

  return files.map((file) => fileToBlob(file, companyId));
};

export const isFieldLast = (
  max: number,
  current: number,
  length: number
): boolean => {
  return length < max && current === length;
};

export const sectionsToSectionArray = (data: createSectionFormType) => {
  return data.sections.map((section) => sectionFieldToDto(section.title));
};

export const sectionFieldToDto = (
  title: string,
  parentId?: number
): sectionDtoType => {
  return {
    hideInMobile: false,
    parentId: parentId || 0,
    positionAt: 1,
    goodsSectionTranslates: [
      {
        langId: 1,
        translateName: title,
      },
    ],
  };
};

export const responseCategoriesToExactCategories = (
  allCategories: ICategory[],
  categoryIds: number[]
) => {
  return allCategories
    .filter((category) => categoryIds.includes(category.id))
    .map((category) => ({
      name: category.code,
      label: category.name,
      value: category.id,
    }));
};

export const imagesArrayToArrayObjectWithLinks = (images: string[]) => {
  return images.map((link) => ({
    imageUrl: link,
  }));
};

export const manufacturedTimeEntityToPostEntityForm = (
  manufactureTime: preparationTimeType
) => {
  let constanta = ["day", "hour", "minute"];

  let res = constanta.reduce((acc, curr) => {
    if (manufactureTime[curr as keyof preparationTimeType]) {
      acc = {
        ...acc,
        [curr]: manufactureTime[curr as keyof preparationTimeType],
      };
    }
    return acc;
  }, {});

  return res;
};

export const arrayToObjectWithLangIdAsKey = (
  array: titleType[] | descType[]
) => {
  return array.reduce((acc, curr) => {
    let id = languageIds[curr.lang as keyof typeof languageIds];
    acc = {
      ...acc,
      [id]: curr.data,
    };
    return acc;
  }, {});
};

export const goodsTranslatesToPostEntityForm = (data: TitleType[]) => {
  return data.map((el) => ({
    langId: languageIds[el.lang as keyof typeof languageIds],
    translateName: el.title,
    translateDesc: el.desc,
  }));
};

export const goodsVariantsToPostEntityForm = (
  variants: variantType[]
): PostDtoVariantType[] => {
  return variants.map((variant) => ({
    articulCode: variant.articul,
    count: Number(variant.amount),
    price: Number(variant.price),
    priceWithDiscount: Number(variant.priceWithSale) || 0,
    goodsVariantTranslates: variant.name.map((titleObject) => ({
      langId: languageIds[titleObject.lang as keyof typeof languageIds],
      translateName: titleObject.data,
    })),
  }));
};

export const createServiceHelper = (dto: CreateDtoType): PostDtoType => {
  const firstVariant = dto.variants[0];
  const isServiceHasVariants = dto.variants.length > 1;

  const itemDto = {
    ageUnlimited: true,
    artikulCode: firstVariant.articul,
    categoryId: dto.service.value,
    count: Number(firstVariant.amount),
    currencyId: 1,
    goodsImages: imagesArrayToArrayObjectWithLinks(dto.images),
    goodsSectionId: dto.section.value,
    hasGoodsVariant: isServiceHasVariants,
    hideInStores: [],
    isCountUnlimited: false,
    withPoint: Number(dto.loyaltyType) === 2,
    withDiscount: Number(dto.loyaltyType) === 1,
    notUsePl: dto.loyaltyOff,
    positionAt: 1,
    price: Number(firstVariant.price),
    priceWithDiscount: Number(firstVariant.priceWithSale),
    unitId: 1,
    goodsTranslates: goodsTranslatesToPostEntityForm(dto.titles),
    isSetManufacturedTime: dto.preparationTime,
    goodsVariants: isServiceHasVariants
      ? goodsVariantsToPostEntityForm(dto.variants)
      : [],
  };

  if (dto.preparationTime) {
    return {
      ...itemDto,
      manufacturedAt: manufacturedTimeEntityToPostEntityForm(
        dto.preparationTimeData
      ),
    };
  }

  return itemDto;
};

export const sectionsResponseToParentChildObject = (
  array: ISectionResponse[] | undefined
): parentSectionType[] => {
  if (!array) return [];

  const parentSections = array.filter((section) => section.parentId === 0);

  return parentSections.map((parentSection) => ({
    ...parentSection,
    children: array.filter(
      (childSection) => childSection.parentId === parentSection.id
    ),
  }));
};

export const isChildHasActiveParent = (
  parent: parentSectionType,
  currentItemId: number | undefined
) => {
  return parent.children.some((section) => section.id === currentItemId);
};

export const isParentHasActiveChild = (
  item: parentSectionType,
  currentItemId: number | undefined
) => {
  return item.children.some((child) => child.id === currentItemId);
};

export const getLengthOfParentSections = (
  array: ISectionResponse[] | undefined
) => {
  if (!array) return 0;

  return array.filter((section) => section.parentId === 0).length;
};

export const sectionsResponseListToOptions = (
  array: ISectionResponse[] | undefined
) => {
  if (!array) return [];

  return array.map((section) => ({
    label: section.goodsSectionTranslates[0].translateName,
    name: section.goodsSectionTranslates[0].translateName,
    value: section.id,
  }));
};

export const isSectionParent = (
  array: ISectionResponse[] | undefined,
  id: number | undefined
) => {
  if (!array || !id) return true;

  return array.find((section) => section.id === id)?.parentId === 0;
};


export const divideGoodsBySections = (goods: IGoodsResponse[]) => {
  return goods.reduce((acc: IGoods, curr) => {
    acc[curr.goodsSectionId] = acc[curr.goodsSectionId] ? [...acc[curr.goodsSectionId], curr] : [curr]
    return acc
  }, {})
}

export const thousandsDivider = (value: number) => {
  return numberWithNew({number: value, replaceValue: " "})
}

export const getSubSectionsLength = (sections: ISectionResponse[] | undefined, parentId: number) => {
  if (!sections) return 0;

  return sections.filter(section => section.parentId === parentId).length
}

export const resetDefaultValues = (data: IGoodsResponse): FormFieldTypes => {
  return {
    titles: data.goodsTranslates.map(translate => ({
      title: translate.translateName,
      desc: translate.translateDesc,
      lang: languageLabels[translate.langId as keyof typeof languageLabels]
    })),
    preparationTime: Boolean(data.isSetManufacturedTime),
    preparationTimeData: {day: data.manufacturedAt?.day || null, hour: data.manufacturedAt?.hour || null, minute: data.manufacturedAt?.minute || null},
    loyaltyOff: data.notUsePl,
    loyaltyType: data.withDiscount ? 1 : data.notUsePl ? 0 : data.withPoint ? 2 : 0,
    measurement: {value: 1, name: 'шт.', label: 'шт.'},
    images: data.goodsImages.map(image => image.imageUrl),
    section: 1,
    service: {},
    variants: data.hasGoodsVariant ? data.goodsVariants.map(variant => ({
      amount: String(variant.count),
      articul: String(variant.articulCode),
      name: variant.goodsVariantTranslates.map(translate => ({data: translate.translateName, lang: languageLabels[translate.langId as keyof typeof languageLabels]})),
      price: String(variant.price),
      priceWithSale: String(variant.priceWithDiscount)
    })) : [{
      name: [{data: 'test', lang: '(Рус)'}],
      amount: String(data.count),
      price: String(data.price),
      articul: String(data.artikulCode),
      priceWithSale: String(data.priceWithDiscount)
    }]

  }
}