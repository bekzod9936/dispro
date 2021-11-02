import { CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { useAppDispatch } from 'services/redux/hooks'
import { setOpenSideBar } from 'services/redux/Slices/clients'
import { CancelButton, Container, Content, LinkBtn, QrBlock, QrCode } from './style'



export const QrCodeBar = () => {
    const dispatch = useAppDispatch()
    return (

        <Container>
            <CancelButton onClick={(e) => dispatch(setOpenSideBar(false))}>
                <CloseIcon />
            </CancelButton>
            <Content>
                <h4>
                    Код приглашения
                </h4>
                <p>
                    При сканировании кода клиент
                    попадет в вашу базу.
                </p>
                <QrBlock>
                    <QrCode>

                    </QrCode>
                    <p>qrcode id</p>
                    <span>Ссылка на присоединение</span>
                    <LinkBtn>https/:discount_the_best</LinkBtn>
                    <button>Скопировать ссылку</button>
                </QrBlock>
            </Content>
        </Container>
    )
}

