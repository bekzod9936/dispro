import { useMutation } from 'react-query'
import { getPermissionByStaffId } from 'services/queries/partnerQuery'
import { useAppDispatch } from 'services/redux/hooks'
import { setPermissions } from 'services/redux/Slices/permissions'

//permissions query



export const useGetPermissions = () => {
    const dispatch = useAppDispatch()
    return useMutation((id: number) => getPermissionByStaffId(id), {
        onSuccess: (data) => {
            dispatch(setPermissions(data.permissions))
        }
    })
}