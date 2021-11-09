import { CloseIcon, CopyLinkIcon, ShareIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Button from 'components/Custom/Button'
import Input from "components/Custom/Input"
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { setOpenSideBar } from 'services/redux/Slices/clients'
import { Buttons, FakeQrCode, Header, Main, Wrapper } from './style'

export const MobileQrBar = () => {
    const { qrCodeBar } = useAppSelector(state => state.clients)
    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(setOpenSideBar(false))
    }

    return (
        <Wrapper isOpen={qrCodeBar}>
            <Header>
                <h6>Код приглашения</h6>
                <CloseIcon onClick={handleClose} />
            </Header>
            <Main>
                <FakeQrCode />
                <p>aslkd9281</p>
                <Input
                    label="Ссылка на присоединение"
                    inputStyle={{ color: "#A5A5A5" }}
                    value="https/:discount_the_best" />
            </Main>
            <Buttons>
                <Button
                    margin={{ mobile: "0 0 15px 0" }}
                    buttonStyle={{ color: "#606EEA", bgcolor: "rgba(96, 110, 234, 0.1)" }}
                    endIcon={<CopyLinkIcon />}>
                    Скопировать ссылку
                </Button>
                <Button
                    endIcon={<ShareIcon />}>
                    Поделиться
                </Button>
            </Buttons>
        </Wrapper>
    )
}
