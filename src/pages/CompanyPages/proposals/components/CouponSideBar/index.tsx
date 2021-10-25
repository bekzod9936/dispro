import { CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { DeleteIcon, PenIcon } from 'assets/icons/proposals/ProposalsIcons'
import Button from 'components/Custom/Button'
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad'
import React from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { resetCurrentCoupon } from 'services/redux/Slices/proposals/proposals'
import { IDeferred } from 'services/redux/Slices/proposals/types'
import { RootState } from 'services/redux/store'
import styled from 'styled-components'
import { categories } from '../../screens/Coupons/constants'

interface IProps {
    onClose: (arg: boolean) => void,
    currentCoupon: IDeferred,
    disableUpdate?: boolean,
    resetCoupon: any
}

export const CouponBar = ({
    onClose, 
    currentCoupon, 
    disableUpdate, 
    resetCoupon}: IProps) => {
    
    const isCoupon = currentCoupon.type === 1
    const history = useHistory()
    const handleClose = () => {
        onClose(false)
        resetCoupon()
    }

    const handleUpdate = () => {
        if (isCoupon) {
            history.push("/proposals/update_coupon")
        } else {
            history.push("/proposals/update_certificate")
        }
    }


    return (
        <Wrapper>
            <Header>
                <h6>{isCoupon ? "Купон" : "Сертификат"}</h6>
                <CloseIcon onClick={handleClose} style={{cursor: "pointer"}}/>
            </Header>
            <ImageLazyLoad objectFit="contain" src={currentCoupon.image} alt="previewImg"/>
            <Content>
                <h5>Информация</h5>
                <p>{isCoupon ? "Скидка Купона" : "Сумма Сертификата"}: {currentCoupon.value} {isCoupon ? "%" : "Сум"}</p>
                <p>Количество {isCoupon ? "купонов" : "сертификатов"}: {currentCoupon.count} шт</p>
                <p>Стоимость {isCoupon ? "купона" : "сертификата"}: {currentCoupon.price} Сум</p>
                {currentCoupon?.categoryIds?.length !== 0 && <p>Категория: {currentCoupon?.categoryIds?.map((el: number) => {
                    return (
                        <span>{categories[el].label}</span>
                    )
                })}</p>}
                <p>Возрастное ограничение: {currentCoupon.ageUnlimited ? "Нет" : currentCoupon.ageFrom + "+"}</p>
            </Content>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                {!disableUpdate && <>
                <Button
                    onClick={handleUpdate}
                    startIcon={<PenIcon />}
                    buttonStyle={{ color: "#606EEA", bgcolor: "rgba(96, 110, 234, 0.1)" }}>
                    Редактировать Купон
                </Button>
                <Button
                    margin={{ laptop: "25px 0" }}>
                    Опубликовать
                </Button></>}
                <Button 
                    buttonStyle={{color: "#ffffff", bgcolor: "#FF5E68"}} 
                    startIcon={<DeleteIcon />}>
                    Удалить купон
                </Button>
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    padding: 15px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Header = styled.div`
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    h6 {
        font-size: 18px;
        color: #223367;
        line-height: 21px;
    }
`

const Content = styled.div`
    margin: 40px 0 35px 0;

    h5 {
        font-size: 16px;
        color: #C7C7C7;
        line-height: 19px;
        margin-bottom: 10px;
    }
    p {
        font-size: 14px;
        line-height: 16px;
        font-weight: 300;
        color: #223367;
        &:not(:last-child) {
            margin-bottom: 9px;
        }
    }
`