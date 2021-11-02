import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IClient } from 'services/redux/Slices/clients/types'
import { DownSide, UpSide, Wrapper } from './style'

export const InfoBlock = ({ addInfo }: IClient) => {

    const { t } = useTranslation()
    return (
        <Wrapper>
            <UpSide>
                <h4>
                    {t("info")}
                </h4>
                <button>
                    {t("addNote")} +
                </button>
            </UpSide>
            <DownSide>
                <p>
                    {t("byRecommendation")}
                    : <span>Натальи Ни</span>({t("client")})
                </p>
                <p>
                    {t('lastPurchase')}: {addInfo?.lastPurchaseDate ? moment(addInfo?.lastPurchaseDate).format("DD.MM.YYYY") : "-"}
                </p>
            </DownSide>
        </Wrapper>
    )
}
