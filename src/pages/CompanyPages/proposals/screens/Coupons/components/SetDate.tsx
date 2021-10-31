import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { PeriodWrapper } from '../style'
import { CustomDatePicker } from "../../../components/CustomDatePicker"
import Button from 'components/Custom/Button'
import { useHistory } from 'react-router'
import { ICoupon } from '..'
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { PublishIcon } from 'assets/icons/proposals/ProposalsIcons'
import { useMutation } from 'react-query'
import { postCoupon, putCoupon } from 'services/queries/ProposalsQueries'
import moment from 'moment'
import Input from "components/Custom/Input"
import { useTranslation } from 'react-i18next'

interface IProps {
    handleClose: any,
    mutation?: any,
    handlePost?: any,
    setPeriod?: (arg: boolean) => void,
    coupon: ICoupon | any,
    shouldPublish?: boolean,
    shouldUpdate?: boolean,
    handleUpdate?: any
}

export const SetDate = ({
    handleUpdate,
    shouldUpdate,
    handleClose,
    coupon,
    handlePost,
    shouldPublish }: IProps) => {
    const [{ startDate, endDate, publishDate }, setValidDate] = React.useState({
        startDate: "",
        endDate: "",
        publishDate: ""
    })
    const { t } = useTranslation()
    const { mutate } = useMutation((data: ICoupon) => postCoupon(data), {
        onSuccess: (data) => {
            putCoupon(data.data.data.id, {
                startDate,
                endDate,
                publishDate
            })
        }
    })
    const { handleSubmit, control, watch, formState: { errors } } = useForm()
    const history = useHistory()

    const onPublish = async (data: any) => {
        setValidDate({
            startDate: data.startDate,
            endDate: data.endDate,
            publishDate: data.publishDate
        })

        if (shouldPublish) {
            handlePost({
                id: coupon.id,
                data: {
                    startDate: data.startDate,
                    endDate: data.endDate,
                    publishDate: data.publishDate
                }
            })
        } else if (shouldUpdate) {
            await handleUpdate({
                id: coupon.id,
                data: {
                    ...coupon
                }
            })
            putCoupon(coupon.id, {
                startDate: data.startDate,
                endDate: data.endDate,
                publishDate: data.publishDate
            })
        } else {
            mutate(coupon)
        }
        handleClose()
        setTimeout(() => history.goBack(), 1000)
    }

    const handleFn = (str: string) => {
        const res = new Date(new Date(str?.split("-")?.join(","))?.getTime() + 2592000000)
        let day = res.getDate() < 10 ? `0${res.getDate()}` : res.getDate()
        let month = (res.getMonth() + 1) < 10 ? `0${res.getMonth() + 1}` : res.getMonth() + 1;
        return [res.getFullYear(), month, day].join("-")
    }



    return (
        <form onSubmit={handleSubmit(onPublish)}>
            <PeriodWrapper>
                <h5>Выберите дату публикации</h5>
                <p>Выберите дату публикации</p>
                <Controller
                    control={control}
                    name="publishDate"
                    rules={{
                        required: true
                    }}
                    render={({ field }) => (
                        <Input
                            field={field}
                            error={!!errors.publishDate}
                            message={t("requiredField")}
                            min={moment(Date.now()).format("YYYY-MM-DD")}
                            type="date"
                            margin={{ laptop: "0 0 20px 0" }}
                        />
                    )}
                />
                <p>Выберите период действия купона</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Controller
                        name="startDate"
                        rules={{
                            required: true
                        }}
                        control={control}
                        render={({ field }) => (
                            <Input
                                field={field}
                                type="date"
                                error={!!errors.startDate}
                                min={watch("publishDate")}
                                // message={t("requiredField")}
                                max={handleFn(watch("publishDate"))}
                                margin={{ laptop: "0 20px 20px 0" }}
                            />
                        )}
                    />
                    <Controller
                        rules={{
                            required: true
                        }}
                        control={control}
                        name="endDate"
                        render={({ field }) => (
                            <Input
                                field={field}
                                error={!!errors.endDate}
                                // message={t("requiredField")}
                                min={watch("startDate")}
                                type="date"
                                max={handleFn(watch("publishDate"))}
                            />
                        )}
                    />
                </div>
                <div
                    style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}
                        margin={{ laptop: "0 20px 0 0" }}
                        startIcon={<CancelIcon />}
                        onClick={handleClose}>
                        Отменить
                    </Button>
                    <Button
                        startIcon={<PublishIcon />}
                        type="submit">Опубликовать</Button>
                </div>
            </PeriodWrapper>
        </form>
    )
}
