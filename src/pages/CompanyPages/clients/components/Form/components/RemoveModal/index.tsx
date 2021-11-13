import { DoneIcon, RightArrowIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Button from 'components/Custom/Button'
import Modal from 'components/Custom/Modal'
import React from 'react'
import { RemoveWrapper } from './style'
interface IProps {
    isOpen: boolean,
    clientInfo: {
        status: string,
        percent: string,
    }
    onClose: () => void,
    onClick: () => void
}
export const Remove = ({ isOpen, clientInfo, onClick, onClose }: IProps) => {
    return (
        <Modal open={isOpen}>
            <RemoveWrapper>
                <h4>Вы действительно хотите отключить индивидуальный статус?</h4>
                <p>При отключении, индивидуального статус сменится на стандартный статус, согласно программе лояльности</p>
                <div className="status">
                    <b>Текущий статус</b>
                    <span>{clientInfo.status} {clientInfo.percent}%</span>
                    <RightArrowIcon />
                    <b>Стандартный статус</b>
                    <span>{clientInfo.status} {clientInfo.percent}%</span>
                </div>
                <div className="buttons">
                    <Button
                        onClick={onClose}
                        margin={{ mobile: "0 8px 0 0" }}
                        buttonStyle={{ bgcolor: "rgba(96, 110, 234, 0.1)", color: "#606EEA" }}>
                        Отмена
                    </Button>
                    <Button
                        onClick={onClick}
                        endIcon={<DoneIcon />}>
                        Применить
                    </Button>
                </div>
            </RemoveWrapper>
        </Modal>
    )
}
