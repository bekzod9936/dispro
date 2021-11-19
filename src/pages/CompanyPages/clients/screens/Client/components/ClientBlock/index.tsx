import { IconButton } from '@material-ui/core'
import { BlockIcon, CoinsIcon, CrownIcon, GoBackIcon, MinusCoinsIcon, UnBlockIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { IClient, IPersonalInfo } from 'services/redux/Slices/clients/types'
import { DefaultImage, DownSide, Icon, UpSide, Wrapper } from './style'
import clientDefaultImg from "assets/images/staff_default.png"
import { blockClient } from "services/queries/clientsQuery"
import { useMutation } from "react-query"
interface IProps {
    client: IClient | any,
    setBlockModal: (e: boolean) => void,
    refetch: () => void
}

export const ClientBlock = ({
    client: { image, firstName, lastName, addInfo, genderTypeId, personalLoyaltyInfo, isPlBlocked, obtainProgramLoyalty, id },
    setBlockModal,
    refetch
}: IProps) => {
    const { t } = useTranslation()
    const history = useHistory()

    const handleClose = () => {
        history.push("/clients")
    }

    const { mutate } = useMutation((data: any) => blockClient(data))
    const handleBlock = () => {
        if (!isPlBlocked) {
            setBlockModal(true)
        }
        else {
            mutate({
                isPlBlocked: false,
                clientId: id,
                reason: ""
            })
            refetch()
        }
    }
    return (
        <Wrapper>
            <UpSide>
                <GoBackIcon onClick={handleClose} style={{ marginRight: "25px", cursor: "pointer" }} />
                {image ?
                    <div className="imageBlock">
                        <img src={image} onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = clientDefaultImg
                        }} />
                        {isPlBlocked && <div className="blocked"><BlockIcon /></div>}
                    </div> :
                    <DefaultImage>
                        {isPlBlocked && <div className="blocked"><BlockIcon /></div>}
                    </DefaultImage>
                }
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
                        {genderTypeId === 1 ? t("man") : t("woman")}
                    </span>
                    <span>
                        {t("status")}: {personalLoyaltyInfo.isActive ? addInfo?.status : obtainProgramLoyalty.levelName} {personalLoyaltyInfo.isActive ? personalLoyaltyInfo?.percent : obtainProgramLoyalty.percent}%
                    </span>
                </p>
            </DownSide>
        </Wrapper>
    )
}
