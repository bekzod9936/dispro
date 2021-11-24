import { CloseIcon, CopyLinkIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { CancelButton, Container, Content, LinkBtn, QrBlock } from './style'
import { useState } from "react"
import QrCode from "qrcode.react"
import useWindowWidth from 'services/hooks/useWindowWidth'
import Button from 'components/Custom/Button'
interface IProps {
    link: string,
    code: string,
    onClose: (arg: any) => void
}

export const QrCodeBar = ({ link, code, onClose }: IProps) => {
    const [copied, setCopied] = useState(false)
    const { width } = useWindowWidth()

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
                {width > 1000 &&
                    <p>
                        При сканировании кода клиент
                        попадет в вашу базу.
                    </p>}
                <QrBlock>
                    {link && <QrCode size={150} value={link} />}
                    <p>{code}</p>
                    <span className="span">Ссылка на присоединение</span>
                    <LinkBtn onClick={handleCopy}>{link.length > 25 ? link.slice(0, 26) + "..." : link}</LinkBtn>
                    {width > 1000 ?
                        <button className="button" onClick={handleCopy}>{copied ? "Скопировано" : "Скопировать ссылку"}</button> :
                        <Button
                            endIcon={<CopyLinkIcon />}
                            buttonStyle={{
                                color: "#606EEA",
                                bgcolor: "rgba(96, 110, 234, 0.1)",
                            }} onClick={handleCopy}>
                            {copied ? "Скопировано" : "Скопировать ссылку"}
                        </Button>}
                </QrBlock>
            </Content>
        </Container>
    )
}

