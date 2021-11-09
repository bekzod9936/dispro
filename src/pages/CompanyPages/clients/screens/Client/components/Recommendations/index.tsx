import { PersonsIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { DownSide, Level, UpSide, Wrapper } from './style'
export interface IProps {
    maxWidth?: string
}
export const Recommendation = ({ maxWidth }: IProps) => {
    const { t } = useTranslation()
    return (
        <Wrapper maxWidth={maxWidth}>
            <UpSide>
                <PersonsIcon />
                <h5>{t("recommendationLevels")}</h5>
            </UpSide>
            <DownSide>
                {Array(10).fill(0).map((el, index) => (
                    <Level>
                        {index + 1}.
                        <span>{el}</span>
                    </Level>
                ))}
            </DownSide>
        </Wrapper>
    )
}
