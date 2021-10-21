import React from 'react'
import styled from 'styled-components'

interface IProps {
    img: string
    type: number,
    title: string,
    description: string,
    price: number,
    value: number,
    ageFrom: number,
    count: number,
    categoryIds: number[]
}
export const CouponCard = ({img, type, description, title, value, count, ageFrom, categoryIds, price}: IProps) => {
    
    return (
        <Container>
            <ImageBlock>
                <img src={img} alt=""/>
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


const Container = styled.div`
    padding: 18px 20px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 860px;
    width: 100%;
    margin-bottom: 15px;
    cursor: pointer;
`

const ImageBlock = styled.div`
    
    /* margin-right: 35px; */
    width: 32%;
    img {
        border-radius: 14px;
        width: 200px;
        height: 120px;
    }
`

const Main = styled.div`
    /* margin-right: 60pxf; */
    width: 32%;
    h6 {
    font-size : 14px;
    font-weight: 400;
    color: #223367;
    margin-bottom: 25px;
    }
    p {
        font-size: 14px;
        line-height: 16px;
        font-weight: 300;
        color: #223367;
    }
    h4 {
        font-size: 18px;
        line-height: 21px;
        color: #223367;
        margin-bottom: 10px;
    }
`

const Submain = styled.div`
    width: 32%;
    p {
        color: #223367;
        font-size: 14px;
        font-weight: 300;
        line-height: 16.5px;
        &:not(:last-child) {
            margin-bottom: 9px;
        }
    }
`