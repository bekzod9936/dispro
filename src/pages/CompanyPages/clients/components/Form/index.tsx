import { VioletCancelIcon, CloseIcon, CoinsIconWhite, MinusCoinsIconWhite, NotAllowedIcon, BlockIcon, BlockWhiteIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import InputFormat from 'components/Custom/InputFormat'
import Input from "components/Custom/Input"
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'services/redux/hooks'
import { numberWith } from 'services/utils'
import { Client, Header, Subtitle, Wrapper, MyForm } from "./style"
import { useState, useEffect } from "react";
import { useHistory } from 'react-router'
import Button from 'components/Custom/Button'

interface IProps {
    isOpen: boolean,
    action: number,
    handleClose: (bool: boolean) => void
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
    }
}
export const Form = ({ isOpen, action, handleClose }: IProps) => {
    const { selectedClients } = useAppSelector(state => state.clients)
    const { t } = useTranslation()
    const client = selectedClients[0]
    const content = contents[action]
    const [top, setTop] = useState(false)
    const { control, watch, handleSubmit, formState: { errors }, } = useForm()
    const history = useHistory()
    const onSubmit = (data: any) => {
        console.log(data);

    }
    useEffect(() => {
    }, [watch()])

    useEffect(() => {
        const res = history.location.pathname.endsWith("/clients")
        setTop(res)

    }, [history.location.pathname])
    return (
        <Wrapper top={top} isOpen={isOpen}>
            <Header>
                <h5>{content.title}</h5>
                <CloseIcon onClick={handleClose} />
            </Header>
            {content.subtitle && <Subtitle>{content.subtitle}</Subtitle>}
            {selectedClients.length > 1 ?
                <Client>
                    <p>Выбрано клиентов: {selectedClients.length}</p>
                </Client> :
                <Client>
                    <h6>{t("client")}:</h6>
                    <p>{client?.firstName + " " + client?.lastName} <span>{t("points")}: {numberWith(client?.addInfo?.pointSum.toString(), " ")}</span></p>
                </Client>}
            <MyForm onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {content.inputLabel &&
                        <Controller
                            control={control}
                            name="amount"
                            rules={{
                                required: true,
                                min: 10
                            }}
                            render={({ field }) => (
                                <InputFormat
                                    margin={{ mobile: "0 0 25px 0" }}
                                    label={content.inputLabel}
                                    field={field}
                                    max="10000"
                                    error={errors.amount}
                                    message={t("requiredField")} />
                            )}
                        />}
                    {content.textAreaLabel &&
                        <Controller
                            control={control}
                            rules={{
                                required: true,
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
                            onClick={handleClose}
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
