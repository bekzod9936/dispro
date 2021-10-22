import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { PeriodWrapper } from '../style'
import { CustomDatePicker } from "../../../components/CustomDatePicker"
import Button from 'components/Custom/Button'
import { useHistory } from 'react-router'
import { ICoupon } from '..'
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { PublishIcon } from 'assets/icons/proposals/ProposalsIcons'


interface IProps {
    handleClose: any,
    mutation: any,
    setPeriod: (arg: boolean) => void,
    coupon: ICoupon,
    setDate: (arg: string) => void
}

export const SetDate = ({handleClose, mutation, setPeriod, coupon, setDate}: IProps) => {


    const getValidDate = (obj: any) => {
        const day = obj.day < 10 ? `0${obj.day}` : obj.day
        const month = obj.month < 10 ? `0${obj.month}` : obj.month
        const year = obj.year
        return `${year}-${month}-${day}`
    }

    const {handleSubmit, control, watch} = useForm()
    const history = useHistory()
    const onPublish = (data: any) => {
        const startDate = getValidDate(data.startDate)
        const endDate = getValidDate(data.endDate)
        const publishDate = getValidDate(data.publishDate)
        
        setDate(publishDate)
        mutation.mutate({
            ...coupon,
            endDate: endDate,
            startDate: startDate,
        })
        
        setPeriod(false)
        history.goBack()
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
                    render={({field}) => (
                        <CustomDatePicker field={field}/>
                    )}
                />
                <p>Выберите период действия купона</p>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Controller
                        name="startDate"
                        rules={{
                            required: true
                        }}
                        control={control}
                        render={({field}) => (
                            <CustomDatePicker 
                                field={field}
                                minDate={watch("publishDate")?.toDate()} 
                                disabled={!!!watch("publishDate")} 
                                marginRight="20px"/>
                        )}
                    />
                    <Controller
                        rules={{
                            required: true
                        }}
                        control={control}
                        name="endDate"
                        render={({field}) => (
                            <CustomDatePicker 
                                field={field}
                                minDate={watch("startDate")?.toDate()}
                                maxDate={new Date(watch("publishDate")?.toDate()?.getTime() + 2592000000)} 
                                disabled={!!!watch("publishDate")} />
                        )}
                    />
                </div>
                <div 
                    style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button 
                        buttonStyle={{color: "#223367", bgcolor: "#ffffff"}}
                        margin={{laptop: "0 20px 0 0"}}
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
