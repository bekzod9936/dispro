import { CancelIconRed } from 'assets/icons/ClientsPageIcons/ClientIcons'
import React, { useState } from 'react'
import Checkbox from "@material-ui/core/Checkbox";
import { useTranslation } from 'react-i18next'
import { MCheckbox, Table, Tbody, Thead } from './style';
interface IProps {
    array: {
        image?: string,
        name: string,
        discountValue: number | string
    }[]
}
export const MobileTable = ({ array }: IProps) => {
    const { t } = useTranslation()
    const [isSelecting, setSelecting] = useState(false)

    const handleSelecting = () => {
        setSelecting(prev => !prev)
    }

    return (
        <Table>
            <Thead>
                {isSelecting ? <>
                    <span>Выберите клиентов:</span>
                    <CancelIconRed onClick={handleSelecting} />
                </> :
                    <button onClick={handleSelecting}>Выбрать нескольких</button>}
            </Thead>
            <Tbody>
                {array.map(client => (
                    <div>
                        {isSelecting &&
                            <MCheckbox>
                                <Checkbox />
                            </MCheckbox>}
                        {client.image ? <img style={{ width: 30 }} src={client.image} alt="clientImg" /> : ""}
                        <div>
                            <h5>{client.name}</h5>
                            <p>{t('discount')}: {client.discountValue}%</p>
                        </div>
                    </div>
                ))}
            </Tbody>
        </Table>
    )
}
