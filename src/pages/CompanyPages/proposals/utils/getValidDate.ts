export const getValidDate = (obj: any) => {
    const day = obj.day < 10 ? `0${obj.day}` : obj.day
    const month = obj.month < 10 ? `0${obj.month}` : obj.month
    const year = obj.year
    return `${year}-${month}-${day}`
}