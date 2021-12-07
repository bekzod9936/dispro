import { CancelIcon, CloseIcon, DoneIcon, RightArrowIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Button from 'components/Custom/Button'
import Input from "components/Custom/Input"
import { useTranslation } from 'react-i18next'
import { useState } from "react"
import { useMutation, useQueryClient } from 'react-query'
import { changeVipPercent } from 'services/queries/clientsQuery'
import { useAppSelector } from 'services/redux/hooks'
import { Status, Wrapper } from './style'
interface IProps {
    handleClose: () => void,
    refetch?: any,
    state: "selecting" | "updating" | "removing",
    id: number,
    clientInfo: {
        value: number | string,
        name: string,
        status: string,
        prevStatus: string,
        prevPercent: string | number,
        isBlocked: boolean
    }
}
export const VipModal = ({ handleClose, refetch, state, id, clientInfo }: IProps) => {
    const { t } = useTranslation()
    const [percent, setPercent] = useState("")
    const [error, setError] = useState(false)
    const { selectedClients } = useAppSelector(state => state.clients)
    const client = selectedClients[0]
    const queryClient = useQueryClient()


    const mutation = useMutation((data: any) => changeVipPercent(data), {
        onSuccess: () => {
            if (selectedClients.length > 5) {
                queryClient.invalidateQueries("fetchAllClients")
            }
            handleClose()
            refetch()
        }
    })

    const onSubmit = (e: any) => {
        e.preventDefault()
        if (Number(percent) < 1 && state !== 'removing') return
        if (state === "removing" && selectedClients.length > 1) {
            let ids = selectedClients.map(el => el.id)
            mutation.mutate({
                percent: 0,
                isActive: false,
                clientIds: ids
            })
        }
        else if (selectedClients.length > 1) {
            let ids = selectedClients.map(el => el.id)
            mutation.mutate({
                percent: percent,
                clientIds: ids,
                isActive: true
            })

        } else {
            mutation.mutate({
                percent: state !== "removing" ? percent : 0,
                clientIds: [id],
                isActive: state !== "removing"
            })
        }

    }

    function handleChange(e: any) {
        const currPercent = e.target.value;
        if (!currPercent) {
            setError(true);
        }
        if (currPercent.toString().startsWith("0")) {
            setPercent("");
        }
        else if (currPercent <= 100) {
            setPercent(currPercent.trim());

        } else if (currPercent > 100) setPercent("100")
        else {
            setPercent(percent.trim());
        }

    }

    // useEffect(() => {
    //     setPercent(value.toString())
    // }, [value])



    if (state === "selecting") {
        return (
            <Wrapper onSubmit={onSubmit}>
                <div className="header">
                    <h3>Индивидуальный %</h3>
                    <CloseIcon onClick={handleClose} />
                </div>
                {selectedClients.length > 1 ?
                    <div className="content">
                        <h5>Выбрано клиентов: {selectedClients.length}</h5>
                    </div> :
                    <div className="content">
                        <p className="client">
                            {clientInfo.name}
                            <b>•</b>
                            <span>Статус: {clientInfo.status + " " + clientInfo.value}%</span>
                        </p>
                    </div>}
                <Input
                    type='tel'
                    message={(clientInfo.isBlocked || selectedClients.some(el => el.isPlBlocked)) ? 'Один или несколько клиентов заблокированы. Начислить спец статус можно только незаблокированным клиентам' : Number(percent) < 1 ? t("requiredField") : "Минимальный процент: 1"}
                    error={error && Number(percent) < 1 || clientInfo.isBlocked || selectedClients.some(el => el.isPlBlocked)}
                    margin={{ laptop: "0 0 55px 0" }}
                    value={percent}
                    onChange={handleChange} />
                <div className="buttons">
                    <Button
                        onClick={handleClose}
                        buttonStyle={{ bgcolor: "#ffffff", color: "#223367" }}
                        margin={{ laptop: "0 25px 0 0" }}
                        startIcon={<CancelIcon />}>
                        Отменить
                    </Button>
                    <Button
                        disabled={mutation.isLoading || client.isPlBlocked || selectedClients.some(el => el.isPlBlocked) || clientInfo.isBlocked}
                        type="submit"
                        startIcon={<DoneIcon />}>
                        Готово
                    </Button>
                </div>
            </Wrapper>
        )
    } else if (state === "updating") {
        return (
            <Wrapper onSubmit={onSubmit}>
                <div className="header">
                    <h3>Настройка специального %</h3>
                    <CloseIcon onClick={handleClose} />
                </div>
                <div className="content">
                    {selectedClients.length > 1 ? <p className="client">{"Выбрано клиентов: " + selectedClients.length}</p> : <p className="client">{clientInfo.name}<b>•</b><span>Статус: {"Спец" + " " + clientInfo.value}%</span></p>}
                </div>
                <Input
                    type='tel'
                    message={(clientInfo.isBlocked || selectedClients.some(el => el.isPlBlocked)) ? 'Один или несколько клиентов заблокированы. Начислить спец статус можно только незаблокированным клиентам' : Number(percent) < 1 ? t("requiredField") : "Минимальный процент: 1"}
                    error={Number(percent) < 1 || clientInfo.isBlocked || selectedClients.some(el => el.isPlBlocked)}
                    margin={{ laptop: "0 0 50px 0" }}
                    value={percent}
                    defaultValue={clientInfo.value?.toString()}
                    onChange={handleChange} />
                <div className="buttons">
                    <Button
                        onClick={handleClose}
                        buttonStyle={{ bgcolor: "#ffffff", color: "#223367" }}
                        margin={{ laptop: "0 25px 0 0" }}
                        startIcon={<CancelIcon />}>
                        Отменить
                    </Button>
                    <Button
                        disabled={mutation.isLoading || client.isPlBlocked || selectedClients.some(el => el.isPlBlocked) || clientInfo.isBlocked}
                        type="submit"
                        startIcon={<DoneIcon />}>
                        Готово
                    </Button>
                </div>
            </Wrapper>
        )
    } else {
        return (
            <Wrapper onSubmit={onSubmit}>
                <div className="header">
                    <h3>Вы действительно хотите отключить специальный статус?</h3>
                    <CloseIcon onClick={handleClose} />
                </div>
                <div className="content">
                    {selectedClients.length > 1 && <p className="info amount">Выбрано клиентов: {selectedClients.length}</p>}
                    <p className="info">
                        При отключении специальный статус сменится на стандартный статус согласно программе лояльности
                    </p>
                </div>
                <Status>
                    <div className="old child">
                        <p>Текущий статус</p>
                        <b>{selectedClients.length > 1 ? "Специальный" : "Спец"} {!(selectedClients.length > 1) && clientInfo.value + "%"}</b>
                    </div>
                    <RightArrowIcon />
                    <div className="new child">
                        <p>Стандартный статус</p>
                        <b>{selectedClients.length > 1 ? "Стандартный" : clientInfo.prevStatus} {!(selectedClients.length > 1) && clientInfo.prevPercent + "%"}</b>
                    </div>
                </Status>
                <div className="buttons">
                    <Button
                        onClick={handleClose}
                        buttonStyle={{ bgcolor: "#ffffff", color: "#223367" }}
                        margin={{ laptop: "0 25px 0 0" }}
                        startIcon={<CancelIcon />}>
                        Отменить
                    </Button>
                    <Button
                        disabled={mutation.isLoading}
                        type="submit"
                        startIcon={<DoneIcon />}>
                        Применить
                    </Button>
                </div>
            </Wrapper>
        )
    }
}
