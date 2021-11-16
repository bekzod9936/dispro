import { CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { useAppDispatch } from 'services/redux/hooks'
import { setOpenSideBar } from 'services/redux/Slices/clients'
import { CancelButton, Container, Content, LinkBtn, QrBlock } from './style'
import { useState, useEffect } from "react"
import { useMutation } from 'react-query'
import { fetchQrCode } from 'services/queries/clientsQuery'
import QrCode from "qrcode.react"

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

    const { mutate } = useMutation(() => fetchQrCode(), {
        retry: 0,
        onSuccess: (data) => {
            const res = data.data.data;
            setLink(res.dynLinkToken);
            setCode(res.token)

        }
    });

    console.log(link);

    useEffect(() => {
        mutate()
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
                    {link && <QrCode size={150} value={link} />}
                    <p>{code}</p>
                    <span>Ссылка на присоединение</span>
                    <LinkBtn onClick={handleCopy}>{link.length > 25 ? link.slice(0, 26) + "..." : link}</LinkBtn>
                    <button onClick={handleCopy}>{copied ? "Скопировано" : "Скопировать ссылку"}</button>
                </QrBlock>
            </Content>
        </Container>
    )
}

