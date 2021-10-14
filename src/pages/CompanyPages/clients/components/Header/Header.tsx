import React from 'react'
import { ButtonsWrapper, Flex, SubTitle } from '../../style/style'
import Title from 'components/Custom/Title'
import Input from 'components/Custom/Input'
import Filter from 'components/Custom/Filter/index'
import { QRButton } from './QRButton'
import { CalendarButton } from './CalendarButton'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'services/redux/hooks'


export const Header = () => {
    const { t } = useTranslation()
    const { totalClients } = useAppSelector(state => state.clients)
    return (
        <div>
            <Flex>
                <Title>{t("clients")}</Title>
                <SubTitle>{`${t("totalClients")}: ${totalClients}`}</SubTitle>
            </Flex>
            <Input width={{maxwidth: 700}}/>
            <ButtonsWrapper
                marginBottom={20}
                marginTop={20}
                >
                <Filter />
                <CalendarButton />
                <QRButton />
            </ButtonsWrapper>
        </div>
    )
}
