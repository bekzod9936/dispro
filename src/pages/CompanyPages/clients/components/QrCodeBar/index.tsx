import { CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { CancelButton, Container, Content, LinkBtn, QrBlock, QrCode } from './style'

interface IProps {
    setOpenBar: any,
}


export const QrCodeBar = ({ setOpenBar }: IProps) => {

    return (
        
            <Container>
                <CancelButton onClick={(e) => setOpenBar((prev: any) => ({...prev, qrBar: false}))}>
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

