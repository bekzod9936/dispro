import { CloseIcon, CoinsIcon, MiniCloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Button from "components/Custom/Button";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import FullModal from 'components/Custom/FullModal';
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { selectAll, setClient } from "services/redux/Slices/clients";
import { Content, Footer, Header, Main, Wrapper } from "./style";
interface IProps {
    setForm: any;
}
export const DownBar = ({ setForm }: IProps) => {
    const { selectedClients } = useAppSelector(state => state.clients)
    const client = selectedClients[0]

    const [open, setOpen] = useState<"hide" | "show" | "fullShow">("hide")
    const dispatch = useAppDispatch()

    const checked = selectedClients.length > 1 ? false : client?.personalLoyaltyInfo?.isActive

    const handleRemoveClient = (id: number) => {
        dispatch(setClient(id))
    }




    const handleClick = (e: any) => {
        dispatch(selectAll(e.target.value === "true"));
    };

    // const handleChange = (e: any) => {
    //     const checked = e.target.checked;
    //     if (checked) {
    //         setForm({
    //             action: 3,
    //             isOpen: checked,
    //         });

    //     } else setForm({
    //         action: 5,
    //         isOpen: true
    //     })
    // };

    useEffect(() => {
        if (selectedClients.length === 0) setOpen("hide")
    }, [selectedClients.length])
    return (
        <>
            <Header>
                {open !== "fullShow" ? (
                    <>
                        <p>Выбрано: {selectedClients.length}</p>
                        <Button
                            onClick={() => setOpen("fullShow")}
                            buttonStyle={{
                                color: "#3492FF",
                                bgcolor: "rgba(96, 110, 234, 0.1)",
                            }}
                        >
                            Посмотреть
                        </Button>
                    </>
                ) : (
                    <>
                        <h5>Выбранно клиентов: {selectedClients.length}</h5>
                        <CloseIcon onClick={() => setOpen("show")} />
                    </>
                )}
            </Header>
            <FullModal
                direction="down"
                open={open === "fullShow"}>
                <Header>
                    <>
                        <h5>Выбранно клиентов: {selectedClients.length}</h5>
                        <CloseIcon onClick={() => setOpen("show")} />
                    </>
                </Header>
                <Main>
                    <Content>
                        {selectedClients.map((client) => (
                            <div
                                onClick={() => handleRemoveClient(client.id)}
                                className="client"
                            >
                                <p>{client.firstName + " " + client.lastName}</p>
                                <MiniCloseIcon />
                            </div>
                        ))}
                    </Content>
                    <Footer>
                        <div className="vipProcent">
                            <h6>Индивидуальный статус</h6>
                            <CustomToggle checked={checked} />
                        </div>
                        <Button
                            onClick={() =>
                                setForm({
                                    isOpen: true,
                                    action: 1,
                                })
                            }
                            endIcon={<CoinsIcon />}
                            margin={{ mobile: "0 0 20px 0" }}
                            buttonStyle={{
                                color: "#606EEA",
                                bgcolor: "rgba(96, 110, 234, 0.1)",
                            }}
                        >
                            Начислить баллы
                        </Button>
                        <Button
                            onClick={() =>
                                setForm({
                                    isOpen: true,
                                    action: 2,
                                })
                            }
                            endIcon={<CoinsIcon />}
                            margin={{ mobile: "0 0 20px 0" }}
                            buttonStyle={{
                                color: "#606EEA",
                                bgcolor: "rgba(96, 110, 234, 0.1)",
                            }}
                        >
                            Списать баллы
                        </Button>
                        <button value="true" onClick={handleClick} className="customButton">
                            Выбрать всех клиентов
                        </button>
                        <button value="false" onClick={handleClick} className="customButton">
                            Снять выделение
                        </button>
                    </Footer>
                </Main>
            </FullModal>
        </>
    );
};
