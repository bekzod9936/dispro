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
      days: null,
      hours: null,
      minutes: null
    }
}

export const languageIds = {
    '(Рус)': 1,
    '(Eng)': 2,
    '(Uzb)': 3
  }


export const SECTIONS_LIMIT = 20


export const GET_SECTIONS = 'getSections'