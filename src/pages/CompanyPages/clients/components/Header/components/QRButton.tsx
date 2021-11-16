import { QRIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Button from 'components/Custom/Button'
import { useTranslation } from 'react-i18next'
import useWindowWidth from 'services/hooks/useWindowWidth'
import { useAppDispatch } from 'services/redux/hooks'
import { setOpenSideBar } from 'services/redux/Slices/clients'

export const QRButton = () => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const { width } = useWindowWidth()
    return (
        <Button
            margin={{ laptop: "0 20px", mobile: "0 0 0 8px" }}
            onClick={(e) => dispatch(setOpenSideBar(true))}
            buttonStyle={{
                shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
                bgcolor: 'white',
                color: '#223367',
                weight: 500,
                height: {
                    mobile: 36
                }
            }}
            startIcon={<QRIcon style={width <= 600 ? { height: 16, width: 16 } : {}} />}>
            {t("invite")}
        </Button>
    )
}
