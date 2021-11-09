import React, { useEffect, useRef, useState } from 'react'
import { Modal } from './style'
interface IProps {
    handleClose: () => void,
    array?: string[],
    modalContent: "points" | "other",
    onClick: (e: number) => void
}

const modals: any = {
    points: [{ label: "Начислить баллы", action: 1 }, { label: "Списать баллы", action: 2 }],
    other: [{ label: "Индивидуальный статус", action: 3 }, { label: "Заблокировать", action: 4 }]
}
export const DownModal = ({ handleClose, modalContent, onClick }: IProps) => {
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
            {modals[modalContent]?.map((el: any) => <p key={el.action} onClick={() => onClick(el.action)}>{el.label}</p>)}
        </Modal>
    )
}
