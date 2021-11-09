import { CloseIcon, CoinsIcon, MinusCoinsIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'services/redux/hooks'
import { numberWith } from 'services/utils'
import { Client, Header, Subtitle, Wrapper } from "./style"
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
        buttonIcon: <CoinsIcon />
    },
    2: {
        title: "Списание баллов",
        subtitle: "Клиент будет проинформирован о списании баллов push-уведомлением",
        inputLabel: "Количество баллов",
        textAreaLabel: "Коментарий",
        buttonLabel: "Списать",
        buttonIcon: <MinusCoinsIcon />
    },
    3: {
        title: "Индивидуальный статус",
        inputLabel: "Введите индивидуальный %",
        additionalBtnLabel: "Отключить VIP статус",
        buttonLabel: "Применить",

    },
    4: {
        title: "Блокировка",
        subtitle: "Клиент не сможет использовать систему лояльности вашей компании",
        textareaLabel: "Причина блокировки",
        buttonLabel: "Заблокировать"
    }
}
export const Form = ({ isOpen, action, handleClose }: IProps) => {
    const { selectedClients } = useAppSelector(state => state.clients)
    const { t } = useTranslation()
    const client = selectedClients[0]
    const content = contents[action]
    const { control, handleSubmit, formState: { errors }, } = useForm()

    const onSubmit = (data: any) => {
        console.log(data);

    }


    return (
        <Wrapper isOpen={isOpen}>
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
            <form onSubmit={handleSubmit(onSubmit)}>

            </form>
        </Wrapper>
    )
}
