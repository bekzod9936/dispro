import { CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { useAppDispatch } from 'services/redux/hooks'
import { setOpenSideBar } from 'services/redux/Slices/clients'
import { CancelButton, Container, Content, LinkBtn, QrBlock, QrCode } from './style'
import { useState, useEffect } from "react"
import { useMutation } from 'react-query'
import { fetchQrCode } from 'services/queries/clientsQuery'


export const QrCodeBar = () => {
    const dispatch = useAppDispatch()
    const [copied, setCopied] = useState(false)
    const [code, setCode] = useState<any>(null)
    const [link, setLink] = useState("")
    const handleCopy = () => {
        const el = document.createElement("input");
        el.value = link;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true)
    }

    useEffect(() => {
        const res: any = fetchQrCode()
        setLink(res.dynLinkToken)
        setCode(res)
    }, [])
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
                    <LinkBtn onClick={handleCopy}>https/:discount_the_best</LinkBtn>
                    <button onClick={handleCopy}>{copied ? "Скопировано" : "Скопировать ссылку"}</button>
                </QrBlock>
            </Content>
        </Container>
    )
}

