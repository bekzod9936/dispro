import { Pagination } from '@material-ui/lab'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { setPage } from 'services/redux/Slices/clientSlice'
import styled from 'styled-components'

export const Footer = () => {
    const dispatch = useAppDispatch()
    const { totalPages, page } = useAppSelector(state => state.clients)
    return (
        <FooterWrapper>
            <p>
                Показано 1-9 клиентов
            </p>
            <Pagination 
                count={totalPages}
                defaultPage={1}
                onChange={(e: any) => {
                dispatch(setPage(e))
            }}
        />
        </FooterWrapper>
    )
}

const FooterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
