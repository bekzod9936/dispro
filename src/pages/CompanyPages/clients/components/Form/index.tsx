import { VioletCancelIcon, CloseIcon, CoinsIconWhite, MinusCoinsIconWhite, NotAllowedIcon, BlockIcon, BlockWhiteIcon, RightArrowIcon, DoneIcon, CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import InputFormat from 'components/Custom/InputFormat'
import Input from "components/Custom/Input"
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { numberWith } from 'services/utils'
import { Client, Header, Subtitle, Wrapper, MyForm } from "./style"
import { useState, useEffect } from "react";
import { useHistory } from 'react-router'
import Button from 'components/Custom/Button'
import { SuccessModal } from '../SuccessModal'
import { selectAll } from 'services/redux/Slices/clients'
import { useMutation } from 'react-query'
import { changeVipPercent } from 'services/queries/clientsQuery'
import Modal from 'components/Custom/Modal'

interface IProps {
    isOpen: boolean,
    action: number,
    handleClose: (bool: any) => void,
    refetch: () => void,
    clientInfo: {
        name: string,
        points: string,
        percent: string | number,
        status: string,
        id: number
    }
}

const contents: any = {
    1: {
        title: "Начисление баллов",
        inputLabel: "Количество баллов",
        textAreaLabel: "Коментарий",
        buttonLabel: "Начислить",
        subButtonIcon: <VioletCancelIcon />,
        mainButtonIcon: <CoinsIconWhite />
    },
    2: {
        title: "Списание баллов",
        subtitle: "Клиент будет проинформирован о списании баллов push-уведомлением",
        inputLabel: "Количество баллов",
        textAreaLabel: "Коментарий",
        buttonLabel: "Списать",
        subButtonIcon: <VioletCancelIcon />,
        mainButtonIcon: <MinusCoinsIconWhite />
    },
    3: {
        title: "Индивидуальный статус",
        inputLabel: "Введите индивидуальный %",
        additionalBtnLabel: "Отключить VIP статус",
        buttonLabel: "Применить",
        subButtonIcon: <VioletCancelIcon />

    },
    4: {
        title: "Блокировка",
        subtitle: "Клиент не сможет использовать систему лояльности вашей компании",
        textAreaLabel: "Причина блокировки",
        buttonLabel: "Заблокировать",
        mainButtonIcon: <BlockWhiteIcon />,
        subButtonIcon: <VioletCancelIcon />
    },

}
export const Form = ({ isOpen, action, handleClose, refetch, clientInfo }: IProps) => {
    const { currentClient, selectedClients } = useAppSelector(state => state.clients)
    const { t } = useTranslation()
    const name = clientInfo.name
    const points = clientInfo.points;
    const percent = clientInfo.percent
    const content = contents[action]
    const [top, setTop] = useState(false)
    const { control, setValue, watch, handleSubmit, formState: { errors }, clearErrors } = useForm()
    const history = useHistory()
    const [successModal, setSuccessModal] = useState(false)
    const dispatch = useAppDispatch()
    const mutation = useMutation((data: any) => changeVipPercent(data))
    const onSubmit = (data: any) => {
        if (action === 3) {
            onClose()
            if (selectedClients.length === 1) {
                mutation.mutate({
                    clientId: currentClient?.clientInfo.id,
                    percent: data.amount,
                    isActive: true
                })
            } else {
                selectedClients.forEach(client => {
                    mutation.mutate({
                        clientId: client.id,
                        percent: data.amount,
                        isActive: true
                    })
                })
                dispatch(selectAll(false))
            }
            refetch()

        }
        if (action !== 3) {
            setSuccessModal(true)
        }
    }

    const handleRemoveStatus = () => {
        if (selectedClients.length === 1) {
            mutation.mutate({
                clientId: clientInfo.id
            })
        }
    }
    const onClose = () => {
        handleClose((prev: any) => ({ ...prev, isOpen: false }))
        setValue("amount", "")
        setValue("comment", "")
        clearErrors()
    }

    const handleDone = () => {
        setSuccessModal(false)
        onClose()
        if (top) dispatch(selectAll(false))
    }

    useEffect(() => {
        const res = history.location.pathname.endsWith("/clients")
        setTop(res)
    }, [history.location.pathname])
    return (
        <Wrapper top={top} isOpen={isOpen}>
            <SuccessModal
                action={action} handleClose={handleDone} isOpen={successModal} />
            <Header>
                <h5>{content.title}</h5>
                <CloseIcon onClick={onClose} />
            </Header>
            {content.subtitle && <Subtitle>{content.subtitle}</Subtitle>}
            {selectedClients.length > 1 ?
                <Client>
                    <p>Выбрано клиентов: {selectedClients.length}</p>
                </Client> :
                <Client>
                    <h6>{t("client")}:</h6>
                    <p>{name} <span>{action !== 3 ? t("points") : t("status")}: {action !== 3 ? numberWith(points, " ") : percent + "%"}</span></p>
                </Client>}
            <MyForm onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {content.inputLabel &&
                        <Controller
                            control={control}
                            name="amount"
                            rules={{
                                required: true,
                                min: action != 3 ? 10 : 1
                            }}
                            render={({ field }) => (
                                <InputFormat
                                    value={watch("amount")}
                                    field={field}
                                    margin={{ mobile: "0 0 25px 0" }}
                                    label={content.inputLabel}
                                    type="string"
                                    max={action !== 3 ? "10000" : "100"}
                                    error={errors.amount}
                                    message={t("requiredField")} />
                            )}
                        />}
                    {content.textAreaLabel &&
                        <Controller
                            control={control}
                            rules={{
                                required: false,
                                // maxLength: 200
                            }}
                            name="comment"
                            render={({ field }) =>
                                <Input
                                    field={field}
                                    type="textarea"
                                    inputStyle={{
                                        height: {
                                            mobile: 140
                                        }
                                    }}
                                    maxLength={200}
                                    multiline={true}
                                    label={content.textAreaLabel}
                                    error={errors.comment}
                                    message={t("requiredField")} />}
                        />}
                </div>
                <div className="downSide">
                    {content.additionalBtnLabel &&
                        <Button
                            margin={{ mobile: "0 0 15px 0" }}
                            buttonStyle={{ bgcolor: "rgba(96, 110, 234, 0.1)", color: "#606EEA", weight: 500 }}
                            endIcon={<NotAllowedIcon />}>
                            {content.additionalBtnLabel}
                        </Button>}
                    <div>
                        <Button
                            onClick={onClose}
                            margin={{ mobile: "0 10px 0 0" }}
                            buttonStyle={{ bgcolor: "rgba(96, 110, 234, 0.1)", color: "#606EEA", weight: 500 }}
                            endIcon={content.subButtonIcon}>
                            {t("cancel")}
                        </Button>
                        {action !== 4 ?
                            <Button
                                type="submit"
                                endIcon={content.mainButtonIcon}>
                                {content.buttonLabel}
                            </Button> :
                            <Button
                                buttonStyle={{ bgcolor: "#FF5E68" }}
                                endIcon={content.mainButtonIcon}>
                                {content.buttonLabel}
                            </Button>}
                    </div>
                </div>
            </MyForm>
        </Wrapper>
    )
}
