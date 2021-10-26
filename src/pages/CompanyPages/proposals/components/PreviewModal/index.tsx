import { CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Modal from 'components/Custom/Modal'
import React from 'react'
import { Header, ImageIphone, ImagePreview, MoreInfo, Preview, PreviewContent, Wrapper } from './style'
import iphone from "assets/images/iphone.png"
import { useAppSelector } from 'services/redux/hooks'
import { RootState } from 'services/redux/store'
import { useTranslation } from 'react-i18next'

interface IProps {
    open: boolean,
    image: string,
    isCoupon: boolean,
    value: string | number,
    description?: string,
    ageFrom: string | number,
    price: string | number,
    handleClose: (arg: boolean) => void
}

export const PreviewModal = ({ open, image, isCoupon, value, description, ageFrom, price, handleClose }: IProps) => {
    const { t } = useTranslation()
    const { logo, name } = useAppSelector((state: RootState) => state.partner.companyInfo)
    return (
        <Modal open={open}>
            <Wrapper>
                <Header>
                    <h5>Превью купона в приложении</h5>
                    <CloseIcon onClick={handleClose} />
                </Header>
                <Preview>
                    <ImageIphone src={iphone} alt="" />
                    <ImagePreview src={image} alt="" />
                    <PreviewContent>
                        <img src={logo} alt="logo" />
                        <span>{name}</span>
                        <b>{isCoupon ? t("coupon") : t("certificate")}</b>
                        {isCoupon ?
                            <h4><span>{value} % </span> {t("sale")}</h4> :
                            <h4><span>{value} Сум</span></h4>}
                        {/* <p>{description}</p> */}
                        <MoreInfo>
                            <div><span>{t("price")}:</span><b>{price} сум</b></div>
                            {ageFrom && <div><span>{t("age_limit")}:</span><b>C {ageFrom} лет</b></div>}
                        </MoreInfo>
                    </PreviewContent>
                </Preview>
            </Wrapper>
        </Modal>
    )
}
