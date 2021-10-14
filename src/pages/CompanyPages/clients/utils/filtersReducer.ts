
export const resetFilters = () => {

}

export const initialFilters = {
    startDate: '',
    endDate: '',
    regDateFrom: '',
    regDateTo: '',
    genderTypeId: '',
    purchaseCountFrom: '',
    purchaseCountTo: '',
    allPurchaseSum: '',
    usedLevelNumber: '',
  }


export const filtersReducer = (state = initialFilters, action: any) => {
    switch (action.type) {
        case 'regDateFrom': {
            return {
                ...state,
                regDateFrom: action.payload
            }
        }
        case 'regDateTo': {
            return {
                ...state,
                regDateTo: action.payload
            }
        }
        case "gender": {
            return {
                ...state, 
                genderTypeId: action.payload
            }
        }
        case 'resetAll': {
            return initialFilters
        }
        case 'purchaseCountFrom': {
            return {
                ...state,
                purchaseCountFrom: action.payload
            }
        }
        case "purchaseCountTo": {
            return {
                ...state,
                purchaseCountTo: action.payload
            }
        }
        case "allPurchaseSum": {
            return {
                ...state,
                allPurchaseSum: action.payload
            }
        }
        case "usedLevelNumber": {
            return {
                ...state,
                usedLevelNumber: action.payload
            }
        }
        default: {
            return state
        }
    }
}