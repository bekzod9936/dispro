import { CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import React from 'react'
import { CancelButton, Container, Content, LinkBtn, QrBlock, QrCode, Wrapper } from './style'

interface IProps {
    isOpen: boolean,
    setOpenBar: any
}


export const QrCodeBar = ({isOpen, setOpenBar}: IProps) => {
    const qrRef = React.useRef()

    const handleCheck = (e: any) => {
        console.log(e);
        if(!e.path.includes(qrRef.current) && isOpen) {
            setOpenBar((prev: any) => ({...prev, qrBar: false}))
        }
    }
    React.useEffect(() => {
        window.addEventListener("click", handleCheck)
        return () => {
            window.removeEventListener("click", handleCheck)
        }
    }, [])

    return (
        <Wrapper isOpen={isOpen}>
            <Container ref={qrRef}>
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
        </Wrapper>
    )
}

