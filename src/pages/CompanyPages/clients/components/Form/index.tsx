import { IconButton } from '@material-ui/core'
import { BlockIcon, BlockWhiteIcon, CancelIcon, CloseIcon, DoneIcon, NotAllowedIcon, UnBlockIcon, VioletCancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import FullModal from 'components/Custom/FullModal'
import { useTranslation } from 'react-i18next'
import { Wrapper, Header, Inputs, UpSide, ClientInfo, Buttons } from "./style"
import Input from "components/Custom/Input"
import { useAppSelector, } from 'services/redux/hooks'
import { useState } from "react"
import Button from 'components/Custom/Button'
import { useMutation, useQueryClient } from 'react-query'
import { blockClient, changeVipPercent } from 'services/queries/clientsQuery'
import { ResetModal } from '../ResetModal'
interface IProps {
    open: boolean,
    action: 1 | 2 | 3 | 4,
    onClose: () => void,
    refetch: () => void
    client: {
        name: string,
        points: number,
        percent: number,
        id: number,
        currentStatus: string,
        prevStatus: string,
        prevPercent: number,
        isBlocked: boolean
    }
}
const formContents = {
    1: {
        title: "accuringPoints",
        subtitle: null,
        inputLabel: "pointsQuantity",
        textAreaLabel: "Коментарий",
        firstButtonLabel: "cancellation",
        secondButtonLabel: "accure",
        additionalButton: null
    },
    2: {
        title: "substractingPoints",
        subtitle: "warningBeforeSubstractionPoints",
        inputLabel: "pointsQuantity",
        textAreaLabel: "Коментарий",
        firstButtonLabel: "cancellation",
        secondButtonLabel: "substract",
        additionalButton: null
    },
    3: {
        title: "individualStatus",
        subtitle: null,
        inputLabel: "enterVip",
        textAreaLabel: null,
        firstButtonLabel: "cancellation",
        additionalButton: "turnOffVipStatus",
        secondButtonLabel: "apply"
    },
    4: {
        title: "blocking",
        subtitle: "alertBeforeBlockingClient",
        inputLabel: null,
        textAreaLabel: "blockLabel",
        firstButtonLabel: "cancellation",
        secondButtonLabel: "block",
        additionalButton: null

    }

}
export const MobileForm = ({ open, action, onClose, client, refetch }: IProps) => {
    const { selectedClients } = useAppSelector(state => state.clients)
    const defaultPercent = selectedClients.length > 1 ? "" : client.percent
    const [percent, setPercent] = useState("");
    const [textAreaValue, setTextAreaValue] = useState("")
    const [resetModal, setResetModal] = useState(false)
    const { t } = useTranslation()
    const content = formContents[action]
    const queryClient = useQueryClient()
    const disabled = selectedClients.some(el => el.isPlBlocked)

    const { mutate, isLoading } = useMutation((data: any) => changeVipPercent(data), {
        onSuccess: () => {
            if (selectedClients.length > 5) {
                queryClient.invalidateQueries("fetchAllClients")
            }
        }
    })

    const { mutate: blockMutate } = useMutation((data: any) => blockClient(data))

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (action === 3) {
            let ids = selectedClients.map(el => el.id)
            if (selectedClients.length > 1) {
                mutate({
                    clientIds: ids,
                    isActive: true,
                    percent: percent
                })
            } else {
                mutate({
                    clientIds: [client.id],
                    isActive: true,
                    percent: percent,
                })
            }
        }
        else if (action === 4) {
            blockMutate({
                clientId: client.id,
                isPlBlocked: !(client.isBlocked),
                blockedReason: textAreaValue
            })
        }
        if (!isLoading) {
            onClose()
            refetch()
        }
    }




    const handleChange = (e: any) => {
        const value = e.target.value
        if (value.endsWith(' ')) return

        if (value.length > 1 && value.startsWith("0")) return
        if (Number(value) >= 100) {
            setPercent("100")
            return
        }
        if (isNaN(value)) {
            return
        }
        setPercent(value)

    }

    return (
        <FullModal open={open}>
            <ResetModal
                client={{
                    status: client.currentStatus,
                    id: client.id,
                    percent: client.percent,
                    prevPercent: client.prevPercent,
                    prevStatus: client.prevStatus
                }}
                refetch={refetch}
                open={resetModal}
                onClose={() => {
                    setResetModal(false)
                    onClose()
                }} />
            <Wrapper onSubmit={handleSubmit}>
                <UpSide>
                    <Header>
                        {action <= 3 ? <h2>{t(content.title)}</h2> : <h2>{client.isBlocked ? t("unBlock") : t(content.title)}</h2>}
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Header>
                    {(content.subtitle && action <= 3) ? <p className="subtitle">{t(content.subtitle)}</p> : (content.subtitle && !client.isBlocked) ? <p className="subtitle">{t(content.subtitle)}</p> : null}
                    <ClientInfo>
                        {selectedClients.length > 1 ? t("selectedClients") + ": " + selectedClients.length :
                            <>
                                <p className="label">{t("client")}</p>
                                <span>{client.name}</span>
                                {client.isBlocked ? <b>{t("blocked")}</b> : <b>{action <= 2 ? t("points") + ": " + client.points : t('status') + ": " + (client.currentStatus === client.prevStatus ? client.currentStatus : "Спец") + " " + client.percent + "%"}</b>}
                            </>
                        }
                    </ClientInfo>
                    <Inputs>
                        {content.inputLabel &&
                            <Input
                                label={t(content.inputLabel)}
                                max="100"
                                type='tel'
                                error={percent === "0" || client.isBlocked || disabled}
                                message={(client.isBlocked || disabled) ? 'Один или несколько клиентов заблокированы. Начислить спец статус можно только незаблокированным клиентам' : percent === "0" ? "Минимальный процент: 1%" : t("requiredField")}
                                margin={{
                                    mobile: "0 0 25px 0"
                                }}
                                defaultValue={defaultPercent}
                                value={percent}
                                onChange={handleChange}
                            />}
                        {(action <= 3 && content.textAreaLabel) ?
                            <Input
                                label={t(content.textAreaLabel)}
                                inputStyle={{
                                    height: {
                                        mobile: 177
                                    }
                                }}
                                maxLength={250}
                                value={textAreaValue}
                                onChange={(e) => setTextAreaValue(e.target.value)}
                                type="textarea"
                                multiline
                            /> : (content.textAreaLabel && !client.isBlocked) ?
                                <Input
                                    label={t(content.textAreaLabel)}
                                    inputStyle={{
                                        height: {
                                            mobile: 177
                                        }
                                    }}
                                    maxLength={250}
                                    value={textAreaValue}
                                    onChange={(e) => setTextAreaValue(e.target.value)}
                                    type="textarea"
                                    multiline
                                /> : null}
                    </Inputs>
                </UpSide>
                <Buttons>
                    {(content.additionalButton && client.prevStatus !== client.currentStatus && selectedClients.length <= 1) &&
                        <Button
                            onClick={() => setResetModal(true)}
                            margin={{
                                mobile: "0 0 15px 0"
                            }}
                            buttonStyle={{ color: "#606EEA", bgcolor: "rgba(96, 110, 234, 0.1)" }}
                            endIcon={<NotAllowedIcon />}>
                            {t(content.additionalButton)}
                        </Button>}
                    <div>
                        <Button
                            onClick={onClose}
                            buttonStyle={{
                                color: "#606EEA",
                                bgcolor: "rgba(96, 110, 234, 0.1)"
                            }}
                            margin={{
                                mobile: "0 8px 0 0"
                            }}
                            endIcon={<VioletCancelIcon />}>
                            {t(content.firstButtonLabel)}
                        </Button>
                        {action !== 4 ?
                            <Button
                                type="submit"
                                disabled={percent === "0" || percent === "" || isLoading || client.isBlocked || disabled}
                                endIcon={<DoneIcon />}>
                                {t(content.secondButtonLabel)}
                            </Button> :
                            <Button
                                type="submit"
                                endIcon={client.isBlocked ? <UnBlockIcon /> : <BlockWhiteIcon />}
                                buttonStyle={{
                                    color: "#ffffff",
                                    bgcolor: !client.isBlocked ? "#FF5E68" : "#0FCF0B"
                                }}>
                                {client.isBlocked ? t("unBlocking") : t(content.secondButtonLabel)}
                            </Button>}
                    </div>
                </Buttons>
            </Wrapper>
        </FullModal>
    )
}
