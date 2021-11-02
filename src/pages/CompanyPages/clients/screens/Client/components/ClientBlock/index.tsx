import { BlockIcon, CoinsIcon, CrownIcon, MinusCoinsIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Button from 'components/Custom/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IClient } from 'services/redux/Slices/clients/types'
import { DefaultImage, DownSide, Icon, UpSide, Wrapper } from './style'

export const ClientBlock = ({ image, firstName, lastName, addInfo, genderTypeId }: IClient) => {
    const { t } = useTranslation()
    return (
        <Wrapper>
            <UpSide>
                {image ? <img src={image} /> : <DefaultImage />}
                <Icon>
                    <CoinsIcon />
                </Icon>
                <Icon>
                    <MinusCoinsIcon />
                </Icon>
                <Icon>
                    <CrownIcon />
                </Icon>
                <Icon>
                    <BlockIcon />
                </Icon>
            </UpSide>
            <DownSide>
                <h5>{firstName} {lastName}</h5>
                <p><span>{genderTypeId === 1 ? t("male") : t("female")}</span><span>{t("status")}: {addInfo?.status}</span></p>
            </DownSide>
        </Wrapper>
    )
}
