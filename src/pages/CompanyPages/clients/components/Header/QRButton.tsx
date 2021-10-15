import { QRIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Button from 'components/Custom/Button'
import React from 'react'
interface IProps {
    setOpenBar: any
}
export const QRButton = ({setOpenBar}: IProps) => {
    return (
        <Button
            onClick={(e) => setOpenBar((prev: any) => ({...prev, qrBar: true}))}
            buttonStyle={{
                shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
                bgcolor: 'white',
                color: '#223367',
                weight: 500,
            }}
            startIcon={<QRIcon />}>
            Пригласить
        </Button>
    )
}
