import Modal from 'components/Custom/Modal'
import { useState } from 'react'
import Input from "components/Custom/Input"
import Button from 'components/Custom/Button'
import { BlockWhiteIcon, CancelIcon, CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { Wrapper } from "./style"
import { useMutation } from 'react-query'

interface IProps {
    isOpen: boolean,
    handleClose: (e: boolean) => void
}

export const BlockModal = ({ isOpen, handleClose }: IProps) => {
    const [reason, setReason] = useState("")

    // const mutation = useMutation(() => )

    const handleSubmit = (e: any) => {
        e.preventDefault();

    }
    return (
        <Modal open={isOpen}>
            <Wrapper onSubmit={handleSubmit}>
                <header>
                    <h3>
                        Блокировка
                    </h3>
                    <CloseIcon onClick={() => handleClose(false)} />
                </header>
                <p className="infoText">Клиент не сможет использовать систему лояльности вашей компании</p>
                <Input
                    maxLength={100}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    label="Причина блокировки"
                    margin={{
                        laptop: "0 0 35px 0"
                    }}
                    inputStyle={{
                        height: { laptop: 125, desktop: 125 }
                    }}
                    type="textarea"
                    multiline />
                <div className="buttons">
                    <Button
                        onClick={() => handleClose(false)}
                        margin={{ laptop: "0 25px 0 0" }}
                        buttonStyle={{ bgcolor: "#ffffff", color: "#223367" }}
                        startIcon={<CancelIcon />}>
                        Отменить
                    </Button>
                    <Button
                        type="submit"
                        startIcon={<BlockWhiteIcon />}>
                        Заблокировать
                    </Button>
                </div>
            </Wrapper>
        </Modal>
    )
}
