import Modal from 'components/Custom/Modal'
import { useState } from 'react'
import Input from "components/Custom/Input"
import Button from 'components/Custom/Button'
import { BlockWhiteIcon, CancelIcon, CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { Wrapper } from "./style"
import { useMutation } from 'react-query'
import { blockClient } from 'services/queries/clientsQuery'
import { useAppSelector } from 'services/redux/hooks'

interface IProps {
    isOpen: boolean,
    handleClose: (e: boolean) => void
    isBlocking: boolean
}

export const BlockModal = ({ isOpen, handleClose, isBlocking }: IProps) => {
    const [reason, setReason] = useState("")
    const { selectedClients } = useAppSelector(state => state.clients)
    const client = selectedClients[0]
    const mutation = useMutation((data: any) => blockClient(data))

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        mutation.mutate({
            clientId: client.id,
            isPlBlocked: true,
            blockedReason: reason
        })
        handleClose(false)
    }
    return (
        <Modal open={isOpen}>
            <Wrapper onSubmit={handleSubmit}>
                <header>
                    <h3>
                        {isBlocking ? "Блокировка" : "Разблокировка"}
                    </h3>
                    <CloseIcon onClick={() => handleClose(false)} />
                </header>
                {isBlocking && <p className="infoText">Клиент не сможет использовать систему лояльности вашей компании</p>}
                {isBlocking &&
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
                        multiline />}
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
                        {isBlocking ? "Заблокировать" : "Разблокировать"}
                    </Button>
                </div>
            </Wrapper>
        </Modal>
    )
}
