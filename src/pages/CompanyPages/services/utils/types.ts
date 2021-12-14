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
    price: number,
    priceWithSale: number,
    amount: number,
    articul: string
} 
export interface FormFieldTypes {
  titles: titleType[];
  descriptions: descType[];
  measurement: any,
  service: any,
  section: any,
  loyaltyType: any,
  loyaltyOff: boolean,
  variants: variantType[]
}