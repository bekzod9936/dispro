import { CloseIcon, CoinsIcon, MiniCloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Button from 'components/Custom/Button'
import CustomToggle from 'components/Custom/CustomToggleSwitch'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { selectAll, setClient } from 'services/redux/Slices/clients'
import styled from 'styled-components'
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
interface IStyleProps {
    isOpen: "hide" | "show" | "fullShow"
    border?: boolean
}
export const Wrapper = styled.div`
    border-radius: ${({ border }: IStyleProps) => border ? "0" : "12px 12px 0 0"};
    background-color: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 500ms all;
    transform: ${({ isOpen }: IStyleProps) => isOpen === "show" ? "translateY(94%)" : isOpen === "fullShow" ? "translateY(0)" : "translateY(100%)"};
    `
export const Header = styled.div`
    padding: 15px;
    height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100%;
`

export const Content = styled.div`
    margin-top: 10px;
    padding: 0 15px 15px 15px;
    display: flex;
    flex-wrap: wrap;
    div.client {
        padding: 8px;
        border: 1px solid #C4C4C4;
        box-sizing: border-box;
        border-radius: 46px;
        height: max-content;
        margin: 4px;
        display: flex;
        align-items: center;
        p {
            font-size: 12px;
            line-height: 14px;
            font-weight: 300;
            color: #223367;
            margin-right: 8px;
        }
    }
`;
export const Footer = styled.div`
    flex: 0 0 auto;
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    div.vipProcent {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        h6 {
            font-size: 16px;
            line-height: 18.75px;
            color: #223367;
            font-weight: 300;
            margin-right: 15px;
        }
    }
    button.customButton {
        outline: 0;
        border: 0;
        background: transparent;
        color: #3492FF;
        font-size: 16px;
        line-height: 18.75px;
        margin-bottom: 25px;
    }
`