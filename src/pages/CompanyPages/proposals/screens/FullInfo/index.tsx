import { GoBackIcon } from 'assets/icons/proposals/ProposalsIcons'
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad'
import Title from 'components/Custom/Title'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { RootState } from 'services/redux/store'
import { Wrapper, Container, Right, Left } from './style'

const FullInfoPage = () => {
    const { currentCoupon } = useAppSelector((state: RootState) => state.proposals)
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const isCoupon = currentCoupon.type === 1
    const { goBack } = useHistory()

    const handleBack = () => {
        goBack()
    }
    
    return (
        <Wrapper>
            <div
                style={{ display: "flex", marginBottom: 30, alignItems: "center" }}>
                <GoBackIcon onClick={handleBack} style={{ marginRight: "25px", cursor: "pointer" }} />
                <Title>
                    {isCoupon ? t("coupon") : t("certificate")}: {currentCoupon.title}
                </Title>
            </div>
            <Container>
                <Right>
                    <h5>Фотография</h5>
                    <div style={{ width: 270, margin: "0 0 25px 0" }}>
                        <ImageLazyLoad objectFit="contain" alt="" src={currentCoupon.image} />
                    </div>
                    <h6>Название</h6>
                    <p>{currentCoupon.title}</p>
                    <h6>Описание</h6>
                    <p>{currentCoupon.description}</p>
                </Right>
                <Left>
                    <h6>Информация</h6>
                    <p>{isCoupon ? t("coupon_value") : t("certificate_value")}: {currentCoupon.value} {isCoupon ? "%" : "Сум"}</p>
                    <p>{isCoupon ? t("coupon_amount") : t("certificate_amount")}: {currentCoupon.count} шт</p>
                    <p>{isCoupon ? t("coupon_price") : t("certificate_price")}: {currentCoupon.price} Сум</p>
                    <p>{t("categories")}: {currentCoupon.categoryIds.map((el: number) => (
                        <span>{el}</span>
                    ))}</p>
                    {!!currentCoupon.ageFrom && <p>{t("age_limit")}: +{currentCoupon.ageFrom}</p>}
                </Left>
            </Container>
        </Wrapper>
    )
}

export default FullInfoPage
