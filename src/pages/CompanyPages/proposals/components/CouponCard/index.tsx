import React from 'react'
import styled from 'styled-components'
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad';
import { Container, ImageBlock, Main, Submain } from './style';

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
export const CouponCard = ({isSelected, img, type, description, title, value, count, ageFrom, categoryIds, price, onClick}: IProps) => {
    
    return (
        <Container isSelected={isSelected} onClick={onClick}>
            <ImageBlock>
                <ImageLazyLoad objectFit="contain" src={img} alt=""/>
            </ImageBlock>
            <Main>
                <h6>{type === 1 ? "Coupon" : "Certificate"}</h6>
                <h4>{title}</h4>
                <p>{description}</p>
            </Main>
            <Submain>
                <p>Value: {value}%</p>
                <p>Categories: {categoryIds.map((el: number) => (
                    <span>{el}</span>
                ))}%</p>
                <p>Amount: {count} items</p>
                <p>Cost: {price} sum</p>
                {!!ageFrom && <p>Age limit: +{ageFrom}</p>}
            </Submain>
        </Container>
    )
}