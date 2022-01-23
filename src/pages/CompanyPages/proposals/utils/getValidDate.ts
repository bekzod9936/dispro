import { days } from "../screens/Coupons/constants"

export const getValidDate = (obj: any) => {
    const day = obj.day < 10 ? `0${obj.day}` : obj.day
    const month = obj.month < 10 ? `0${obj.month}` : obj.month
    const year = obj.year
    return `${year}-${month}-${day}`
}
interface ICategories {
    value: string,
    label: string,
    id: number
}

export const getDefaultCategories = (initialArray: ICategories[], defaultArray: number[]) => {
    return initialArray.filter(el => defaultArray?.includes(el.id))
}

export const getWeekDays = (arr: number[]) => {
    return days.filter(el => arr?.includes(el.id))

}