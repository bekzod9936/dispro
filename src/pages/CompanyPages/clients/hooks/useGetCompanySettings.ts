import { useEffect, useState } from "react"
import { useQueries, useQuery } from "react-query"
import { BonusResponseType, CashbackResponseType, GetPartnerSettings } from "services/queries/clientsQuery"
import { useAppDispatch } from "services/redux/hooks"
import { setDisableSpecStatus } from "services/redux/Slices/clients"

export const useGetCompanySettings = () => {
    const [state, setState] = useState<any[]>([])
    const dispatch = useAppDispatch()

    const _ = useQueries([
        {
            queryKey: 'bonuses',
            queryFn: GetPartnerSettings.getBonuses,
            onSuccess: (data) => {
                let response = (data as BonusResponseType)
                setState(prev => ([...prev, response.data]))
            }
        },
        {
            queryKey: 'cashback',
            queryFn: GetPartnerSettings.getCashback,
            onSuccess: (data) => {
                let response = (data as CashbackResponseType)
                setState(prev => ([...prev, response.data]))
            }
        },
        {
            queryKey: 'discount',
            queryFn: GetPartnerSettings.getDiscount,
            onSuccess: (data) => {
                let response = (data as BonusResponseType)
                setState(prev => ([...prev, response.data]))
            }
        }
    ])

    useEffect(() => {
        if (state.length === 3) {
            let isSpecStatusDisabled = state.every(item => !(item?.isActive))
            
            dispatch(setDisableSpecStatus(isSpecStatusDisabled))
        }
    }, [state, dispatch])
}