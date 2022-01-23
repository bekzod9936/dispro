import defaultImage from 'assets/images/staff_default.png'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'services/redux/hooks'
import { setCurrentCoupon } from 'services/redux/Slices/proposals/proposals'
import { IDeferred } from 'services/redux/Slices/proposals/types'
import { ICoupon } from '../../screens/Coupons'
import { Content, LeftSide, RightSide, Wrapper } from './style'
interface IProps {
    coupons: ICoupon[] | IDeferred[];
    onClick: (bool: boolean) => void;
    location: "deferred" | "onSale" | "drafts" | "archive" | "canceled"
}
export const CouponList = ({ coupons, onClick, location }: IProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const handleClick = (id: number) => {
        dispatch(setCurrentCoupon({ id, location }))
        onClick(true)
    }
    return (
        <Wrapper>
            {coupons.map(coupon => (
                <Content
                    onClick={() => handleClick(coupon.id)}
                    key={coupon.id}>
                    <LeftSide>
                        <img onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = defaultImage
                        }} src={coupon.image} alt="image" />
                    </LeftSide>
                    <RightSide>
                        <h5>{coupon.title}</h5>
                        <p>{Number(coupon.type) === 1 ? t("certificate") : t("coupon")}</p>
                    </RightSide>
                </Content>
            ))}
        </Wrapper>
    )
}
