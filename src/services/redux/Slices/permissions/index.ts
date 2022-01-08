import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export type permissionsType = {
    clients: number[],
    feedback: number[],
    finances: number[],
    info: number[],
    news: number[],
    notifications: number[],
    orders: number[],
    proposals: number[],
    services: number[],
    settings: number[],
    staff: number[],
    statistics: number[],
} 

const initialState = {
    permissions: {
        clients: [1],
        feedback: [1],
        finances: [1],
        info: [1],
        news: [1],
        notifications: [1],
        orders: [1],
        proposals: [1],
        services: [1],
        settings: [1],
        staff: [1],
        statistics: [1],
    }
}

export const permissionsSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        setPermissions: (state: typeof initialState, action: PayloadAction<typeof initialState.permissions>) => {
            state.permissions = action.payload
        }
    }
})

export const permissionsSelector = (state: RootState) => state.permissions.permissions

export const { setPermissions } = permissionsSlice.actions
