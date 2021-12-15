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
    titles: [{ data: "lorem", lang: "(Рус)" }],
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
}