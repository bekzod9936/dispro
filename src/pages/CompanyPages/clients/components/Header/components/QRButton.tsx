import { QRIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Button from 'components/Custom/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'
interface IProps {
    setOpenBar: any
}
export const QRButton = ({setOpenBar}: IProps) => {
    const { t } = useTranslation()
    return (
        <Button
            margin={{planshet: "0 0 20px 0", laptop: "0 20px", mobile: "0 0 20px 0"}}
            onClick={(e) => setOpenBar((prev: any) => ({...prev, qrBar: true}))}
            buttonStyle={{
                shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
                bgcolor: 'white',
                color: '#223367',
                weight: 500,
            }}
            startIcon={<QRIcon />}>
            {t("invite")}
        </Button>
    )
}
