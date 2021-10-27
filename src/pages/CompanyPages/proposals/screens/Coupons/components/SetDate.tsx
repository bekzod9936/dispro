import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { PeriodWrapper } from '../style'
import { CustomDatePicker } from "../../../components/CustomDatePicker"
import Button from 'components/Custom/Button'
import { useHistory } from 'react-router'
import { ICoupon } from '..'
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { PublishIcon } from 'assets/icons/proposals/ProposalsIcons'
import { getValidDate } from 'pages/CompanyPages/proposals/utils/getValidDate'
import { useMutation } from 'react-query'
import { postCoupon, putCoupon } from 'services/queries/ProposalsQueries'


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

    const { mutate } = useMutation((data: ICoupon) => postCoupon(data), {
        onSuccess: (data) => {
            putCoupon(data.data.data.id, {
                startDate,
                endDate,
                publishDate
            })
        }
    })
    const { handleSubmit, control, watch } = useForm()
    const history = useHistory()

    const onPublish = async (data: any) => {
        let startDate = getValidDate(data.startDate)
        let endDate = getValidDate(data.endDate)
        let publishDate = getValidDate(data.publishDate)

        setValidDate({
            startDate,
            endDate,
            publishDate
        })

        if (shouldPublish) {
            handlePost({
                id: coupon.id,
                data: {
                    startDate,
                    endDate,
                    publishDate
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
                startDate,
                endDate,
                publishDate
            })
        } else {
            mutate(coupon)
        }
        handleClose()
        setTimeout(() => history.goBack(), 1000)
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
                        <CustomDatePicker minDate={Date.now()} field={field} />
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
                            <CustomDatePicker
                                field={field}
                                minDate={watch("publishDate")?.toDate()}
                                disabled={!!!watch("publishDate")}
                                marginRight="20px" />
                        )}
                    />
                    <Controller
                        rules={{
                            required: true
                        }}
                        control={control}
                        name="endDate"
                        render={({ field }) => (
                            <CustomDatePicker
                                field={field}
                                minDate={watch("startDate")?.toDate()}
                                maxDate={new Date(watch("publishDate")?.toDate()?.getTime() + 2592000000)}
                                disabled={!!!watch("publishDate")} />
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
