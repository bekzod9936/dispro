export type createSectionFormType = {
    sections: { name: string }[]
}


type titleType = {
    data: string;
    lang: string;
};

type descType = {
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
    days: string,
    hours: string,
    minutes: string

}
export interface FormFieldTypes {
  titles: titleType[];
  descriptions: descType[];
  measurement: any,
  service: any,
  section: any,
  loyaltyType: any,
  loyaltyOff: boolean,
  variants: variantType[],
  preparationTime: preparationTimeType[]
  images: string[]
}