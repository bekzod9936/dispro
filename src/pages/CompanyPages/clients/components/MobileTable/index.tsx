import { CancelIconRed } from 'assets/icons/ClientsPageIcons/ClientIcons'
import React, { useState } from 'react'
import Checkbox from "@material-ui/core/Checkbox";
import { useTranslation } from 'react-i18next'
import { DefaultImg, MCheckbox, Table, Tbody, Thead, Trow } from './style';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { selectAll } from 'services/redux/Slices/clients';
import clientDefault from "assets/images/staff_default.png"
interface IProps {
    array: {
        image?: string,
        name: string,
        discountValue: number | string,
        discountStatus: string,
        id: number,
        userId: number,
        isBlocked: boolean
    }[],
    onClick: (e: any, id: number) => void
}

export const MobileTable = ({ array, onClick }: IProps) => {
    const { t } = useTranslation()
    const [isSelecting, setSelecting] = useState(false)
    const dispatch = useAppDispatch()
    const { selectedClients } = useAppSelector(state => state.clients)
    const history = useHistory()

    const handleClose = () => {
        setSelecting(false)
        dispatch(selectAll(false))
    }

    const handleClick = (e: any, id: number, userId: number) => {
        if (!isSelecting) {
            // onClick(e, id)
            history.push(`/clients/${id + "-" + userId}/information`)
        }
        else onClick(e, id)
    }
    return (
        <Table>
            <Thead>
                {isSelecting ? <>
                    <span>Выберите клиентов:</span>
                    <CancelIconRed onClick={handleClose} />
                </> :
                    <button onClick={() => setSelecting(true)}>Выбрать нескольких</button>}
            </Thead>
            <Tbody>
                {array.map(client => (
                    <Trow
                        selected={selectedClients.some(el => client.id === el.id)}
                        onClick={(e) => handleClick(e, client.id, client.userId)}>
                        {isSelecting &&
                            <MCheckbox>
                                <Checkbox checked={selectedClients.some(el => client.id === el.id)} />
                            </MCheckbox>}
                        {client.image ?
                            <img src={client.image} onError={(e: any) => {
                                e.target.onerror = null;
                                e.target.src = clientDefault;
                            }} alt="clientImg" /> : <DefaultImg />}
                        <div className="content">
                            <h5>{client.name}</h5>
                            <p>{client.isBlocked ? <span>{t("blocked")}</span> : <b>{t(client.discountStatus)} {client.discountValue}%</b>}</p>
                        </div>
                    </Trow>
                ))}
            </Tbody>
        </Table>
    )
}
