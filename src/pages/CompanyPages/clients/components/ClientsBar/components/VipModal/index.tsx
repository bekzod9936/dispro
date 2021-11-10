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
    name: string,
    status: string,
    value: number | string,
    handleClose: () => void,
    refetch: any,
    state: "selecting" | "submitting",
    setState: (arg: "selecting" | "submitting") => void
}
export const VipModal = ({ name, status, value, handleClose, refetch, state, setState }: IProps) => {
    const { t } = useTranslation()
    const [percent, setPercent] = useState("")
    const { selectedClients } = useAppSelector(state => state.clients)
    const client = selectedClients[0]

    const mutation = useMutation(() => changeVipPercent({
        percent,
        clientId: client.id,
        isActive: true
    }), {
        onSuccess: () => {
            handleClose()
            refetch()
        }
    })

    const onSubmit = (e: any) => {
        e.preventDefault()
        if (state === "submitting") {
            mutation.mutate()
        }
    }

    function handleChange(e: any) {
        const percent = e.target.value

        if (percent.toString().startsWith("0")) {
            setPercent("")
        }
        else if (percent <= 100) {
            setPercent(percent)

        } else if (percent > 100) setPercent("100")
        else setPercent(value.toString())

    }

    useEffect(() => {
        setPercent(value.toString())
    }, [value])




    return (
        <Wrapper onSubmit={onSubmit}>
            <div className="header">
                <h3>Настройка индивидуального %</h3>
                <CloseIcon onClick={handleClose} />
            </div>
            <div className="content">
                <p className="client">{name}<b>•</b><span>Статус: {status + " " + value}%</span></p>
            </div>
            <Input
                message={Number(percent) < 1 ? t("requiredField") : "Минимальный процент: 1"}
                error={Number(percent) < 1}
                margin={{ laptop: "0 0 30px 0" }}
                value={percent}
                defaultValue={value.toString()}
                onChange={handleChange} />
            <div className="buttons">
                <Button
                    onClick={handleClose}
                    buttonStyle={{ bgcolor: "#ffffff", color: "#223367" }}
                    margin={{ laptop: "0 25px 0 0" }}
                    startIcon={<CancelIcon />}>
                    Отменить
                </Button>
                <Button onClick={() => setState("submitting")} startIcon={<DoneIcon />}>
                    Готово
                </Button>
            </div>
            <div className="header">
                <h3>Вы действительно хотите изменить индивидуальный статус?</h3>
                <CloseIcon onClick={() => setState("selecting")} />
            </div>
            <div className="content">
                <p className="info">
                    При отключении индивидуальный статус сменится на стандартный статус согласно программе лояльности
                </p>
            </div>
            <Status>
                <div className="old child">
                    <p>Текущий статус</p>
                    <b>{status} {value}%</b>
                </div>
                <RightArrowIcon />
                <div className="new child">
                    <p>Новый статус</p>
                    <b>{status} {percent}%</b>
                </div>
            </Status>
            <div className="buttons">
                <Button
                    onClick={() => setState("selecting")}
                    buttonStyle={{ bgcolor: "#ffffff", color: "#223367" }}
                    margin={{ laptop: "0 25px 0 0" }}
                    startIcon={<CancelIcon />}>
                    Отменить
                </Button>
                <Button type="submit" startIcon={<DoneIcon />}>
                    Применить
                </Button>
            </div>
        </Wrapper>
    )
}
