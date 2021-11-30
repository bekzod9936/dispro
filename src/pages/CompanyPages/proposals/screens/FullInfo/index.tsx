import { IconButton } from '@material-ui/core'
import { GoBackIcon, MobileGoBackIcon } from 'assets/icons/proposals/ProposalsIcons'
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad'
import Title from 'components/Custom/Title'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import useWindowWidth from 'services/hooks/useWindowWidth'
import { useAppSelector } from 'services/redux/hooks'
import { RootState } from 'services/redux/store'
import { useFetchCategories } from '../UpdateCoupon/useFetchCategories'
import { Wrapper, Container, Right, Left, InlineContainer, DownSideInfo } from './style'

const FullInfoPage = () => {
    const { currentCoupon } = useAppSelector((state: RootState) => state.proposals)
    const { t } = useTranslation()
    const { width } = useWindowWidth()
    const isCoupon = currentCoupon.type === 2
    const { goBack } = useHistory()
    const [{ defaults }, setCategories] = React.useState<any>({ defaults: [] })
    const handleBack = () => {
        goBack()
    }
    const _ = useFetchCategories(setCategories, currentCoupon.categoryIds)
    return (
        <Wrapper>
            {width > 1000 &&
                <div
                    style={{ display: "flex", marginBottom: 30, alignItems: "center" }}>
                    <GoBackIcon onClick={handleBack} style={{ marginRight: "25px", cursor: "pointer" }} />
                    <Title>
                        {isCoupon ? t("coupon") : t("certificate")}: {currentCoupon.title}
                    </Title>
                </div>}
            <Container>
                {width <= 1000 && width > 600 &&
                    <div style={{ display: "flex", marginBottom: 30, alignItems: "center" }}>
                        <IconButton onClick={handleBack}>
                            <MobileGoBackIcon />
                        </IconButton>
                        <Title>
                            {isCoupon ? t("coupon") : t("certificate")}: {currentCoupon.title}
                        </Title>
                    </div>}
                <InlineContainer>
                    <Right>
                        <h5>Фотография</h5>
                        <div className="imageBlock" style={{}}>
                            <img src={currentCoupon.image} />
                        </div>
                        {width > 1000 &&
                            <>
                                <h6>Название</h6>
                                <p>{currentCoupon.title}</p>
                                <h6>Описание</h6>
                                <p>{currentCoupon.description}</p>
                            </>}
                    </Right>
                    <Left>
                        <h6>Информация</h6>
                        <p>{isCoupon ? t("coupon_value") : t("certificate_value")}: {currentCoupon.value} {isCoupon ? "%" : "Сум"}</p>
                        <p>{isCoupon ? t("coupon_amount") : t("certificate_amount")}: {currentCoupon.count} шт</p>
                        <p>{isCoupon ? t("coupon_price") : t("certificate_price")}: {currentCoupon.price} Сум</p>
                        <p>{t("categories")}: {defaults?.map((el: any, index: number) => (
                            <span>{el.label}{index < defaults?.length - 1 ? ", " : "."}</span>
                        ))}</p>
                        {!!currentCoupon.ageFrom && <p>{t("age_limit")}: +{currentCoupon.ageFrom}</p>}
                    </Left>
                </InlineContainer>
                {width <= 1000 && width > 600 &&
                    <DownSideInfo>
                        <h6>Название</h6>
                        <p>{currentCoupon.title}</p>
                        <h6>Описание</h6>
                        <p>{currentCoupon.description}</p>
                    </DownSideInfo>}
            </Container>
        </Wrapper>
    )
}

export default FullInfoPage
