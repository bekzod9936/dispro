import React from 'react'
import styled from 'styled-components'
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad';
import { Container, ImageBlock, Main, Submain } from './style';
import { useTranslation } from 'react-i18next';

interface IProps {
    img: string
    type: number,
    title: string,
    description: string,
    price: number,
    value: number,
    ageFrom: number,
    count: number,
    categoryIds: number[],
    onClick: (arg: any) => void,
    isSelected: boolean
}
export const CouponCard = ({
    isSelected, 
    img, 
    type, 
    description, 
    title, 
    value, 
    count, 
    ageFrom, 
    categoryIds, 
    price, 
    onClick}: IProps) => {
    const isCoupon = type === 1 
    const { t } = useTranslation()
    return (
        <Container isSelected={isSelected} onClick={onClick}>
            <ImageBlock>
                <ImageLazyLoad objectFit="contain" src={img} alt=""/>
            </ImageBlock>
            <Main>
                <h6>{isCoupon ? t("coupon") : t("certificate")}</h6>
                <h4>{title}</h4>
                <p>{description}</p>
            </Main>
            <Submain>
                <p>{isCoupon ? t("coupon_value") : t("certificate_value")}: {value} {isCoupon ? "%" : "Сум"}</p>
                <p>{isCoupon ? t("coupon_amount") : t("certificate_amount")}: {count} шт</p>
                <p>{isCoupon ? t("coupon_price") : t("certificate_price")}: {price} Сум</p>
                <p>{t("categories")}: {categoryIds.map((el: number) => (
                    <span>{el}</span>
                ))}</p>
                {!!ageFrom && <p>{t("age_limit")}: +{ageFrom}</p>}
            </Submain>
        </Container>
    )
}