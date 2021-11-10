import { useTranslation } from "react-i18next"
import { IFilters } from "services/redux/Slices/clients/types"
import { RemoveFilterBtn } from "../components/Header/components/RemoveFilterBtn"
import { SelectedFilter } from "../components/Header/style"

export const getSelected = (obj: any): any => {
    return Object.keys(obj).reduce((object: any, el: any) => {
        if (typeof obj[el] === "string" || typeof obj[el] === "number") {
            if (obj[el]) {
                if (el === "gender") {
                    object = {
                        ...object,
                        [el]: obj[el] === "1" ? "male" : "female"
                    }
                } else if (el === "trafficProvider") {
                    object = {
                        ...object,
                        [el]: obj[el] === "1" ? "App" : obj[el] === "2" ? "Mobile" : "Cashier"
                    }
                } else {
                    object = {
                        ...object,
                        [el]: obj[el]
                    }
                }
            }
        } else {
            let res = {};
            for (let key in obj[el]) {
                if (obj[el][key]) {
                    if (key.includes("From")) {
                        res = {
                            ...res,
                            "from": obj[el][key]
                        }
                    } else if (key.includes("To")) {
                        res = {
                            ...res,
                            "to": obj[el][key]
                        }
                    } else {
                        res = {
                            ...res,
                            [key]: obj[el][key]
                        }
                    }
                }
            }
            object = {
                ...object,
                [el]: res
            }
        }
        return object
    }, {})
}


interface IProps {
    filters: IFilters,
    handleRemove: (arg: string) => void
}
export const useHandleGetFilters = ({ filters, handleRemove }: IProps) => {
    const { t } = useTranslation()
    let result = [];
    const { gender, notless, regDate, purchaseAmount, trafficProvider, } = filters
    if (gender) {
        result.push(
            <SelectedFilter>
                <p>
                    {t("gender")}: {Number(gender) === 1 ? t("male") : t("female")}
                </p>
                <RemoveFilterBtn onClick={() => handleRemove("gender")} />
            </SelectedFilter>)
    }
    if (notless) {
        result.push(
            <SelectedFilter>
                <p>
                    {t("notless")}: {notless} сум
                </p>
                <RemoveFilterBtn onClick={() => handleRemove("notless")} />
            </SelectedFilter>)
    }
    if (regDate) {
        result.push(
            <SelectedFilter>
                <p>
                    {t("from")}: {regDate?.regDateFrom}
                </p>
                <p>
                    {t("to")}: {regDate?.regDateTo}
                </p>
                <RemoveFilterBtn onClick={() => handleRemove("regDate")} />
            </SelectedFilter>)
    }
    if (purchaseAmount) {
        result.push(
            <SelectedFilter>
                <p>
                    {t("from")}: {purchaseAmount?.purchaseCountFrom + " сум"}
                </p>
                <p>
                    {t("to")}: {purchaseAmount?.purchaseCountTo + " сум"}
                </p>
                <RemoveFilterBtn onClick={() => handleRemove("purchaseAmount")} />
            </SelectedFilter>
        )
    }
    if (trafficProvider) {
        result.push(
            <SelectedFilter>
                <p>
                    {t("trafficProvider")}: {trafficProvider?.label}
                </p>
                <RemoveFilterBtn onClick={() => handleRemove("trafficProvider")} />
            </SelectedFilter>
        )
    }
    return result
}


export const getFiltersForQuery = (filters: any) => {
    let res: any = Object.keys(filters).reduce((obj, el) => {
        if (typeof filters[el] === "string" || typeof filters[el] === "number") {
            if (el === "gender") {
                obj = {
                    ...obj,
                    genderTypeId: filters[el]
                }
            } else if (el === "notless") {
                obj = {
                    ...obj,
                    allPurchaseSum: filters[el]
                }
            }
        }
        else {
            if (el === "regDate") {
                obj = {
                    ...obj,
                    regDateFrom: filters[el].regDateFrom,
                    regDateTo: filters[el].regDateTo
                }
            } else if (el === "purchaseAmount") {
                obj = {
                    ...obj,
                    purchaseCountFrom: filters[el].purchaseCountFrom,
                    purchaseCountTo: filters[el].purchaseCountTo
                }
            } else if (el === "trafficProvider") {
                if (filters[el]) {
                    obj = {
                        ...obj,
                        reflds: `[${filters[el].value}]`
                    }

                }
            }
        }
        return obj
    }, {})

    return Object.keys(res).map((el, index) => {
        if (index > 0) {
            return `&${el}=${res[el]}`
        } else return `${el}=${res[el]}`
    }).join("")
}