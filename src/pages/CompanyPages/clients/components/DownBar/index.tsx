import { CloseIcon, CoinsIcon, MiniCloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Button from 'components/Custom/Button'
import CustomToggle from 'components/Custom/CustomToggleSwitch'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { selectAll, setClient } from 'services/redux/Slices/clients'
import styled from 'styled-components'
import { Content, Footer, Header, Main, Wrapper } from './style'
interface IProps {
    isOpen: "hide" | "show"
}
export const DownBar = ({ isOpen }: IProps) => {
    const { selectedClients } = useAppSelector(state => state.clients)
    const [open, setOpen] = useState<"hide" | "show" | "fullShow">("hide")
    const dispatch = useAppDispatch()
    const handleRemoveClient = (id: number) => {
        dispatch(setClient(id))
    }

    useEffect(() => {
        if (selectedClients.length === 0) {
            setOpen("hide")
        }
        else if (open === "hide") setOpen("show")

    }, [selectedClients])

    const handleClick = (e: any) => {
        dispatch(selectAll(e.target.value === "true"))
    }


    return (
        <Wrapper border={open === "fullShow"} isOpen={open}>
            <Header>
                {open !== "fullShow" ?
                    <>
                        <p>Выбрано: {selectedClients.length}</p>
                        <Button
                            onClick={() => setOpen("fullShow")}
                            buttonStyle={{ color: "#3492FF", bgcolor: "rgba(96, 110, 234, 0.1)" }}>
                            Посмотреть
                        </Button>
                    </> :
                    <>
                        <h5>Выбранно клиентов: {selectedClients.length}</h5>
                        <CloseIcon onClick={() => setOpen("show")} />
                    </>}
            </Header>
            <Main>
                <Content>
                    {selectedClients.map(client => (
                        <div onClick={() => handleRemoveClient(client.id)} className="client">
                            <p>{client.firstName + " " + client.lastName}</p>
                            <MiniCloseIcon />
                        </div>
                    ))}
                </Content>
                <Footer>
                    <div className="vipProcent">
                        <h6>Индивидуальный статус</h6>
                        <CustomToggle />
                    </div>
                    <Button
                        endIcon={<CoinsIcon />}
                        margin={{ mobile: "0 0 20px 0" }}
                        buttonStyle={{ color: "#606EEA", bgcolor: "rgba(96, 110, 234, 0.1)" }}>
                        Начислить баллы
                    </Button>
                    <Button
                        endIcon={<CoinsIcon />}
                        margin={{ mobile: "0 0 20px 0" }}
                        buttonStyle={{ color: "#606EEA", bgcolor: "rgba(96, 110, 234, 0.1)" }}>
                        Списать баллы
                    </Button>
                    <button value="true" onClick={handleClick} className="customButton">Выбрать всех клиентов</button>
                    <button value="false" onClick={handleClick} className="customButton">Снять выделение</button>
                </Footer>
            </Main>
        </Wrapper>
    )
}
