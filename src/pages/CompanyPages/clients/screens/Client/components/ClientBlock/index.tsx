import { IconButton } from '@material-ui/core'
import { BlockIcon, CoinsIcon, CrownIcon, GoBackIcon, MinusCoinsIcon, UnBlockIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Button from 'components/Custom/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { IClient, IPersonalInfo } from 'services/redux/Slices/clients/types'
import { DefaultImage, DownSide, Icon, UpSide, Wrapper } from './style'
interface IProps {
    client: IClient | any,
    setBlockModal: (e: boolean) => void
}

export const ClientBlock = ({
    client: { image, firstName, lastName, addInfo, genderTypeId, personalLoyaltyInfo, isPlBlocked },
    setBlockModal
}: IProps) => {
    const { t } = useTranslation()
    const history = useHistory()

    const handleClose = () => {
        history.push("/clients")
    }

    const handleBlock = () => {
        setBlockModal(true)
    }
    return (
        <Wrapper>
            <UpSide>
                <GoBackIcon onClick={handleClose} style={{ marginRight: "25px", cursor: "pointer" }} />
                {image ?
                    <div className="imageBlock">
                        <img src={image} />
                        {isPlBlocked && <div className="blocked"><BlockIcon /></div>}
                    </div> :
                    <DefaultImage />}
                <IconButton>
                    <CoinsIcon style={{ width: 35, height: 30 }} />
                </IconButton>
                <IconButton>
                    <MinusCoinsIcon style={{ width: 35, height: 30 }} />
                </IconButton>
                <IconButton onClick={handleBlock} style={{ width: 50, height: 50 }}>
                    {!isPlBlocked ?
                        <BlockIcon style={{ width: 35, height: 30 }} /> :
                        <UnBlockIcon style={{ width: 35, height: 30 }} />}
                </IconButton>
            </UpSide>
            <DownSide>
                <h5>{firstName} {lastName}</h5>
                <p>
                    <span>
                        {genderTypeId === 1 ? t("male") : t("female")}
                    </span>
                    <span>
                        {t("status")}: {addInfo?.status} {personalLoyaltyInfo?.percent}%
                    </span>
                </p>
            </DownSide>
        </Wrapper>
    )
}
