import { IconButton } from '@material-ui/core'
import { CancelIcon, CloseIcon, DoneIcon, NotAllowedIcon, VioletCancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import FullModal from 'components/Custom/FullModal'
import { useTranslation } from 'react-i18next'
import { Wrapper, Header, Inputs, UpSide, ClientInfo, Buttons } from "./style"
import Input from "components/Custom/Input"
import { useAppSelector, } from 'services/redux/hooks'
import { useState } from "react"
import Button from 'components/Custom/Button'
interface IProps {
    open: boolean,
    action: 1 | 2 | 3,
    onClose: () => void,
    client: {
        name: string,
        points: number,
        percent: number,
        id: number,
        currentStatus: string,
        prevStatus: string,
        prevPercent: number
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
    }

}
export const MobileForm = ({ open, action, onClose, client }: IProps) => {
    const { selectedClients } = useAppSelector(state => state.clients)
    const defaultPercent = selectedClients.length > 1 ? "" : client.percent
    const [percent, setPercent] = useState(0);

    const { t } = useTranslation()
    const content = formContents[action]
    const handleSubmit = (e: any) => {
        e.preventDefault();

    }

    const handleChange = (e: any) => {
        console.log(e);

    }


    return (
        <FullModal open={open}>
            <Wrapper onSubmit={handleSubmit}>
                <UpSide>
                    <Header>
                        <h2>{t(content.title)}</h2>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Header>
                    {content.subtitle && <p className="subtitle">{t(content.subtitle)}</p>}
                    <ClientInfo>
                        {selectedClients.length > 1 ? t("selectedClients") + ": " + selectedClients.length :
                            <>
                                <p className="label">{t("client")}</p>
                                <span>{client.name}</span><b>{action <= 2 ? t("points") + ": " + client.points : t('status') + ": " + client.currentStatus + " " + client.percent + "%"}</b>
                            </>
                        }
                    </ClientInfo>
                    <Inputs>
                        <Input
                            label={t(content.inputLabel)}
                            max="100"
                            margin={{
                                mobile: "0 0 25px 0"
                            }}
                            defaultValue={defaultPercent}
                            value={percent}
                            onChange={handleChange}
                        />
                    </Inputs>
                </UpSide>
                <Buttons>
                    {content.additionalButton &&
                        <Button
                            margin={{
                                mobile: "0 0 15px 0"
                            }}
                            buttonStyle={{ color: "#606EEA", bgcolor: "rgba(96, 110, 234, 0.1)" }}
                            endIcon={<NotAllowedIcon />}>
                            {t(content.additionalButton)}
                        </Button>}
                    <div>
                        <Button
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
                        <Button
                            endIcon={<DoneIcon />}>
                            {t(content.secondButtonLabel)}
                        </Button>
                    </div>
                </Buttons>
            </Wrapper>
        </FullModal>
    )
}
