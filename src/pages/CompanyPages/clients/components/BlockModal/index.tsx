import Modal from 'components/Custom/Modal'
import { useState } from 'react'
import Input from "components/Custom/Input"
import Button from 'components/Custom/Button'
import { BlockWhiteIcon, CancelIcon, CloseIcon, VioletCancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { Wrapper } from "./style"
import { useMutation } from 'react-query'
import { blockClient } from 'services/queries/clientsQuery'
import useWindowWidth from 'services/hooks/useWindowWidth'

interface IProps {
    isOpen: boolean,
    handleClose: (e: boolean) => void
    isBlocking: boolean
    refetch: () => void,
    clientId: number,
}

export const BlockModal = ({ isOpen, handleClose, isBlocking, refetch, clientId }: IProps) => {
    const [reason, setReason] = useState("")
    const mutation = useMutation((data: any) => blockClient(data))
    const { width } = useWindowWidth()
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        mutation.mutate({
            clientId: clientId,
            isPlBlocked: isBlocking,
            blockedReason: reason
        })
        refetch()
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
                            height: { laptop: 125, desktop: 125, planshet: 125 }
                        }}
                        type="textarea"
                        multiline />}
                <div className="buttons">
                    <Button
                        onClick={() => handleClose(false)}
                        margin={{ laptop: "0 25px 0 0" }}
                        buttonStyle={width > 1000 ? { bgcolor: "#ffffff", color: "#223367" } : { bgcolor: "rgba(96, 110, 234, 0.1)", color: "#606EEA" }}
                        startIcon={width > 1000 ? <CancelIcon /> : <VioletCancelIcon />}>
                        Отменить
                    </Button>
                    <Button
                        buttonStyle={{
                            color: "#fff",
                            bgcolor: "#FF5E68"
                        }}
                        type="submit"
                        startIcon={<BlockWhiteIcon />}>
                        {isBlocking ? "Заблокировать" : "Разблокировать"}
                    </Button>
                </div>
            </Wrapper>
        </Modal>
    )
}
