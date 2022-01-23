export const defaultVariant = {
  name: [{ data: "", lang: "(Рус)" }],
  amount: "",
  price: "",
  priceWithSale: "",
  articul: "",
}

export const createItemDefaultFields = {
    titles: [{ title: "", desc: "", lang: "(Рус)" }],
    variants: [
      defaultVariant,
    ],
    loyaltyOff: false,
    images: [],
    preparationTime: false,
    preparationTimeData: {
      day: null,
      hour: null,
      minute: null
    }
}

export const languageIds = {
    '(Рус)': 1,
    '(Eng)': 2,
    '(Uzb)': 3
}

export const languageLabels = {
  1: '(Рус)',
  2: '(Eng)',
  3: '(Uzb)'
}

export const modalsDefaults = {
  subSection: false,
  editSection: false,
  delete: false,
  move: false,
  hide: false
}


export const goodsModalsDefaults = {
  delete: false,
  changeAmount: false,
  hide: false
}

export const SECTIONS_LIMIT = 20
export const SUBSECTIONS_LIMIT = 10


export const GET_SECTIONS = 'getSections'
export const GET_ITEMS = 'getItems'
export const GET_ITEM = 'getItem'

export const editModalType = {
  'section': {
    title: 'editSection',
    label: 'sectionName'
  },
  'subsection': {
    title: 'editSubSection',
    label: 'subSectionName'
  }
}


export const languages = [
  {
    value: 0,
    label: "Русский",
    name: "(Рус)",
  },
  {
    value: 1,
    label: "Английский",
    name: "(Eng)",
  },
  {
    value: 2,
    label: "Узбекский",
    name: "(Uzb)",
  },
];


export const measurements = [
  {
    name: "item",
    value: 1,
    label: "шт",
  },
  {
    name: "m",
    value: 2,
    label: "метр",
  },
];



export const SECTION_DELETE_MODAL_CONTENT = { title: "areYouSureToDeleteSection", info: "После удаления, вложенные разделы и товары нельзя будет восстановить" }
export const ITEM_DELETE_MODAL_CONTENT = { title: "areYouSureToDeleteItem", info: "После удаления, товар нельзя будет восстановить" }
export const SUBSECTION_DELETE_MODAL_CONTENT = { title: "areYouSureToDeleteSubSection", info: 'После удаления, вложенные товары нельзя будет восстановить' }

export const SECTION_HIDE_MODAL_CONTENT = { title: "areYouSureToHideSection", info: "После скрытия, вложенные разделы и товары не будут отображаться в мобильном приложении" }
export const SUBSECTION_HIDE_MODAL_CONTENT = { title: "areYouSureToHideSubSection", info: "После скрытия, вложенные товары не будут отображаться в мобильном приложении" }
export const ITEM_HIDE_MODAL_CONTENT = { title: "areYouSureToHideItem", info: "После скрытия, товар не будет отображаться в мобильном приложении"}

export const CREATE_ITEM_QUIT_MODAL_CONTENT = "servicesPageQuitModalAlertMessage";
export const EDIT_ITEM_QUIT_MODAL_CONTENT = "servicesPageEditModalAlertMessage";