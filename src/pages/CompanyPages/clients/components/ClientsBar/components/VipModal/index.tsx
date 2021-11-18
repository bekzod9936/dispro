import { CancelIcon, CloseIcon, DoneIcon, RightArrowIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Button from 'components/Custom/Button'
import Input from "components/Custom/Input"
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from "react"
import { useMutation } from 'react-query'
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
        prevPercent: string | number
    }
}
export const VipModal = ({ handleClose, refetch, state, id, clientInfo }: IProps) => {
    const { t } = useTranslation()
    const [percent, setPercent] = useState("")
    const [error, setError] = useState(false)
    const { selectedClients } = useAppSelector(state => state.clients)
    const mutation = useMutation((data: any) => changeVipPercent(data), {
        onSuccess: () => {
            handleClose()
            refetch()
        }
    })

    const onSubmit = (e: any) => {
        e.preventDefault()
        if (Number(percent) < 1 && state !== 'removing') return
        if (selectedClients.length > 1) {
            selectedClients.forEach(el => {
                mutation.mutate({
                    percent: percent,
                    clientId: el.id,
                    isActive: true
                })
            })

        } else {
            mutation.mutate({
                percent: state !== "removing" ? percent : 0,
                clientId: id,
                isActive: state !== "removing"
            })
        }

    }

    function handleChange(e: any) {
        const percent = e.target.value
        if (!percent) {
            setError(true)
        }
        if (percent.toString().startsWith("0")) {
            setPercent("")
        }
        else if (percent <= 100) {
            setPercent(percent)

        } else if (percent > 100) setPercent("100")
        else {
            setPercent(percent)
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
                    message={Number(percent) < 1 ? t("requiredField") : "Минимальный процент: 1"}
                    error={error && Number(percent) < 1}
                    margin={{ laptop: "0 0 30px 0" }}
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
                        disabled={mutation.isLoading}
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
                    <h3>Настройка индивидуального %</h3>
                    <CloseIcon onClick={handleClose} />
                </div>
                <div className="content">
                    <p className="client">{clientInfo.name}<b>•</b><span>Статус: {clientInfo.status + " " + clientInfo.value}%</span></p>
                </div>
                <Input
                    message={Number(percent) < 1 ? t("requiredField") : "Минимальный процент: 1"}
                    error={Number(percent) < 1}
                    margin={{ laptop: "0 0 30px 0" }}
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
                        disabled={mutation.isLoading}
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
                    <h3>Вы действительно хотите отключить индивидуальный статус?</h3>
                    <CloseIcon onClick={handleClose} />
                </div>
                <div className="content">
                    <p className="info">
                        При отключении индивидуальный статус сменится на стандартный статус согласно программе лояльности
                    </p>
                </div>
                <Status>
                    <div className="old child">
                        <p>Текущий статус</p>
                        <b>{clientInfo.status} {clientInfo.value}%</b>
                    </div>
                    <RightArrowIcon />
                    <div className="new child">
                        <p>Стандартный статус</p>
                        <b>{clientInfo.prevStatus} {clientInfo.prevPercent}%</b>
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
