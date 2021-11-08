import React, { useEffect, useRef, useState } from 'react'
import { Modal } from './style'
interface IProps {
    handleClose: () => void,
    array?: string[],
    modalContent: "points" | "other"
}

const modals: any = {
    points: ["Начислить баллы", "Списать баллы"],
    other: ["Индивидуальный статус", "Заблокировать"]
}
export const DownModal = ({ handleClose, modalContent }: IProps) => {
    const modalRef = useRef<null | HTMLDivElement>(null)

    function handleClick(e: any) {
        if (!(e.path.includes(modalRef.current))) {
            handleClose()
        }

    }
    useEffect(() => {
        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [])
    return (
        <Modal ref={modalRef}>
            {modals[modalContent]?.map((el: any) => <p>{el}</p>)}
        </Modal>
    )
}
