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