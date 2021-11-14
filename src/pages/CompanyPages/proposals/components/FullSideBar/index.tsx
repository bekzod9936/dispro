import { IconButton } from '@material-ui/core';
import { DeleteIcon, MobileGoBackIcon, PenIcon, PublishIcon, ReUseIcon } from 'assets/icons/proposals/ProposalsIcons'
import Button from 'components/Custom/Button';
import { useState } from "react"
import { useTranslation } from 'react-i18next';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { useAppSelector } from 'services/redux/hooks'
import { useFetchCategories } from '../../screens/UpdateCoupon/useFetchCategories';
import { Footer, Header, Main, Wrapper } from './style'
interface IProps {
    onClose?: (bool: boolean) => void
    edit?: boolean,
    rePublish?: boolean
}
export const FullSideBar = ({ onClose, edit, rePublish }: IProps) => {
    const { currentCoupon } = useAppSelector(state => state.proposals);
    const { t } = useTranslation()
    const { width } = useWindowWidth()
    const [categories, setCategories] = useState<any>({ defaults: [] })
    const _ = useFetchCategories(setCategories, currentCoupon.categoryIds);
    const isCoupon = currentCoupon.type === 2;
    const handleClose = () => {
        onClose && onClose(false)
    }

    return (
        <Wrapper>
            <div>
                <Header>
                    <IconButton onClick={handleClose}>
                        <MobileGoBackIcon />
                    </IconButton>
                    <div className="content">
                        <img src={currentCoupon.image} alt="image" />
                        <div className="subContent">
                            <h4>{currentCoupon.title}</h4>
                            <h5>{currentCoupon.type === 1 ? t("certificate") : t("coupon")}</h5>
                        </div>
                    </div>
                </Header>
                <Main>
                    <h3>{t("description")}</h3>
                    <p className="description">{currentCoupon.description}</p>
                    <h3>{t("info")}</h3>
                    <ul>
                        <li>{isCoupon ? t("coupon_value") : t("certificate_value")}: {currentCoupon.value}{" "}{isCoupon ? "%" : "Сум"}</li>
                        <li>{isCoupon ? t("coupon_amount") : t("certificate_amount")}: {currentCoupon.count} шт</li>
                        <li>{isCoupon ? t("coupon_price") : t("certificate_price")}: {currentCoupon.price} Сум</li>
                        <li>
                            {t("categories")}: {categories.defaults.map((category: any, index: number) => (
                                <span key={category.id}>
                                    {category.label}
                                    {index < categories.defaults.length - 1 ? ", " : "."}
                                </span>
                            ))}
                        </li>
                        <li>{t("ageLimit")}: {currentCoupon.ageFrom !== 0 ? currentCoupon.ageFrom + "+" : t('no')}</li>
                    </ul>
                </Main>
            </div>
            <Footer>
                {edit ? <>
                    <Button
                        buttonStyle={{ color: "#606EEA", bgcolor: "rgba(96, 110, 234, 0.1)" }}
                        margin={{ mobile: "0 0 15px 0" }}
                        endIcon={<PenIcon />}>
                        {t("edit")}
                    </Button>
                    <div>
                        <Button
                            margin={{ mobile: "0 8px 0 0" }}
                            endIcon={width > 325 && <DeleteIcon style={{ height: 15, width: 13.5 }} />}
                            buttonStyle={{ color: "#ffffff", bgcolor: "#FF5E68" }}
                        >
                            {t("delete")}
                        </Button>
                        <Button
                            endIcon={<PublishIcon style={{ width: 18, height: 13.5 }} />}>
                            {t("publish")}
                        </Button>
                    </div>
                </> : rePublish ?
                    <>
                        <Button
                            endIcon={<ReUseIcon />}>
                            {t("restore")}
                        </Button>
                    </> :
                    <Button
                        margin={{ mobile: "0 8px 0 0" }}
                        endIcon={width > 325 && <DeleteIcon style={{ height: 15, width: 13.5 }} />}
                        buttonStyle={{ color: "#ffffff", bgcolor: "#FF5E68" }}
                    >
                        {t("delete")}
                    </Button>}
            </Footer>
        </Wrapper>
    )
}
