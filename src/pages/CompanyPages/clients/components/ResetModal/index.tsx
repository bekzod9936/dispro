import { DoneIcon, RightArrowIcon, VioletCancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons"
import Button from "components/Custom/Button"
import Modal from "components/Custom/Modal"
import { useTranslation } from "react-i18next"
import { useMutation, useQueryClient } from "react-query"
import { changeVipPercent } from "services/queries/clientsQuery"
import { useAppSelector } from "services/redux/hooks"
import { ResetModalWrapper } from "./style"

interface IProps {
    open: boolean,
    client: {
        status: string,
        percent: string | number,
        prevStatus: string,
        prevPercent: number | string,
        id: number
    },
    onClose: () => void,
    refetch: () => void
}



export const ResetModal = ({ open, client, onClose, refetch }: IProps) => {
    const { t } = useTranslation()
    const { selectedClients } = useAppSelector(state => state.clients)
    const queryClient = useQueryClient()

    const { mutate } = useMutation((data: any) => changeVipPercent(data), {
        onSuccess: () => {
            if (selectedClients.length > 5) {
                queryClient.invalidateQueries("fetchAllClients")
            }
        }
    })

    const handleRemoveStatus = async () => {
        if (selectedClients.length > 1) {
            let ids = selectedClients.map(el => el.id)
            mutate({
                clientIds: ids,
                isActive: false,
                percent: 0
            })
        } else {
            await mutate({
                clientIds: [client.id],
                isActive: false,
                percent: 0
            })
        }
        onClose()
        refetch()
    }


    return (
        <Modal open={open}>
            <ResetModalWrapper>
                <div className="header">
                    <h4>{t("areYouSureAboutTurnOffIndividualPercent")}</h4>
                    <p>{t("infoAboutTurnOffingIndividualStatus")}</p>
                </div>
                <div className="main">
                    <p>{t("currentStatus")}</p>
                    <span>{selectedClients.length > 1 ? "Специальный" : "Спец"}{" "}{!(selectedClients.length > 1) && client.percent + "%"}</span>
                    <RightArrowIcon />
                    <p>{t("standartStatus")}</p>
                    <span>{selectedClients.length > 1 ? "Стандартный" : client.prevStatus}{" "}{!(selectedClients.length > 1) && client.prevPercent + "%"}</span>
                </div>
                <div className="footer">
                    <Button
                        onClick={onClose}
                        margin={{
                            mobile: "0 8px 0 0"
                        }}
                        buttonStyle={{
                            color: "#606EEA",
                            bgcolor: "rgba(96, 110, 234, 0.1)"
                        }}
                        endIcon={<VioletCancelIcon />}>
                        {t("cancellation")}
                    </Button>
                    <Button
                        onClick={handleRemoveStatus}
                        endIcon={<DoneIcon />}>
                        {t("apply")}
                    </Button>
                </div>
            </ResetModalWrapper>
        </Modal>
    )
}
