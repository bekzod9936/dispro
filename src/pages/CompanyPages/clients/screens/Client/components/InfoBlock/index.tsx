import Button from 'components/Custom/Button'
import CustomToggle from 'components/Custom/CustomToggleSwitch'
import moment from 'moment'
import { MToggle } from 'pages/CompanyPages/clients/components/ClientsBar/style'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IClient } from 'services/redux/Slices/clients/types'
import { DownSide, UpSide, Wrapper } from './style'
interface IProps {
    client: IClient,
    setVipModal: (arg: boolean) => void
    setVipModalState: (arg: "selecting" | "updating" | "removing") => void
}
export const InfoBlock = ({ client: { addInfo, personalLoyaltyInfo }, setVipModal, setVipModalState }: IProps) => {

    const handleChangePercent = (e: any) => {
        let checked = e.target.checked;
        setVipModal(true)
        if (checked) {
            setVipModalState("selecting")
        } else {
            setVipModalState("removing")
        }

    }
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
                <div className="changeStatus">
                    <MToggle>
                        <p>Индивидуальный статус</p>
                        <CustomToggle
                            checked={personalLoyaltyInfo?.isActive}
                            onChange={handleChangePercent} />
                    </MToggle>
                    {personalLoyaltyInfo?.isActive &&
                        <Button
                            onClick={() => {
                                setVipModalState("updating")
                                setVipModal(true)
                            }}
                            buttonStyle={{ color: "#3492FF", bgcolor: "#ffffff", weight: "300" }}
                            margin={{ laptop: "0 0 0 20px" }}>
                            Настроить
                        </Button>}
                </div>
            </DownSide>
        </Wrapper>
    )
}
