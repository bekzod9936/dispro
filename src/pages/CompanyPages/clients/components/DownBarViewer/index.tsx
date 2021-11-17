import Button from "components/Custom/Button"
import { useAppSelector } from "services/redux/hooks"
import { Wrapper } from "./style"

interface IProps {
    setModals: (arg: any) => void
}

export const DownBarViewer = ({ setModals }: IProps) => {
    const { selectedClients } = useAppSelector(state => state.clients)
    const open = selectedClients.length >= 1
    return (
        <Wrapper open={open}>
            <p>Выбрано: {selectedClients.length}</p>
            <Button
                onClick={() => setModals((prev: any) => ({ ...prev, downBar: true }))}
                buttonStyle={{
                    color: "#3492FF",
                    bgcolor: "rgba(96, 110, 234, 0.1)",
                }}
            >
                Посмотреть
            </Button>
        </Wrapper>
    )
}
