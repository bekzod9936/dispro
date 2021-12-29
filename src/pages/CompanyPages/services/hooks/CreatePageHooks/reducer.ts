export interface IState {
    loyaltyType: number,
    loyaltyOff: boolean
}

export enum ActionTypes {
    CHANGE_LOYALTY_TYPE = 'CHANGE_LOYALTY_TYPE',
    CHANGE_LOYALTY_OFF = 'CHANGE_LOYALTY_OFF'
}

export type loyaltyTypeAction = {
    type: ActionTypes.CHANGE_LOYALTY_TYPE,
    payload: number
}

export type loyaltyOffAction = {
    type: ActionTypes.CHANGE_LOYALTY_OFF,
    payload: boolean
}

export type ActionType = loyaltyOffAction | loyaltyTypeAction


export const initialState = {
    loyaltyType: 0,
    loyaltyOff: false
}



export const reducer = (state: IState, action: ActionType): IState => {
    const { type, payload } = action

    switch (type) {
        case ActionTypes.CHANGE_LOYALTY_TYPE: {
            if (typeof payload === 'number') {
                if (payload === 2) {
                    return {
                        ...state,
                        loyaltyType: payload,
                        loyaltyOff: false
                    }
                }
    
                return {
                    ...state,
                    loyaltyType: payload
                }
            }

            return state
        }
        case ActionTypes.CHANGE_LOYALTY_OFF: {

            if (payload && typeof payload === 'boolean') {
                return {
                    ...state,
                    loyaltyType: state.loyaltyType === 1 ? 1 : 0,
                    loyaltyOff: payload
                }
            }


            return {
                ...state,
                loyaltyOff: false
            }
        }

        default: {
            return state
        }
    }
}