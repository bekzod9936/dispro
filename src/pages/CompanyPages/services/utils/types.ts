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

export interface FormFieldTypes {
  titles: titleType[];
  descriptions: descType[];
}