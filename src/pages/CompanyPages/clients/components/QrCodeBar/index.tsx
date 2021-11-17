import { CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { CancelButton, Container, Content, LinkBtn, QrBlock } from './style'
import { useState } from "react"
import QrCode from "qrcode.react"
interface IProps {
    link: string,
    code: string,
    onClose: (arg: any) => void
}

export const QrCodeBar = ({ link, code, onClose }: IProps) => {
    const [copied, setCopied] = useState(false)


    const handleCopy = () => {
        const el = document.createElement("input");
        el.value = link;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true)
    }


    return (
        <Container>
            <CancelButton onClick={onClose}>
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

