import { IconButton } from '@material-ui/core';
import { DeleteIcon, MobileCancelIcon, MobileGoBackIcon, PenIcon, PublishIcon, ReUseIcon } from 'assets/icons/proposals/ProposalsIcons'
import Button from 'components/Custom/Button';
import Modal from 'components/Custom/Modal';
import FullModal from 'components/Custom/FullModal';
import { useState } from "react"
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { deleteCoupon, putCoupon } from 'services/queries/proposalQuery';
import { useAppSelector } from 'services/redux/hooks'
import { SetDate } from '../../screens/Coupons/components/SetDate';
import { useFetchCategories } from '../../screens/UpdateCoupon/useFetchCategories';
import { Stats } from '../CouponCard/style';
import { DeleteModal } from '../CouponSideBar/style';
import { Footer, Header, Main, Wrapper } from './style'
interface IProps {
    onClose: (bool: boolean) => void
    edit?: boolean,
    rePublish?: boolean,
    refetch: () => void
}
export const FullSideBar = ({ onClose, edit, rePublish, refetch }: IProps) => {
    const { currentCoupon } = useAppSelector(state => state.proposals);
    const { t } = useTranslation()
    const { width } = useWindowWidth()
    const history = useHistory()
    const [deleteModal, setDeleteModal] = useState(false)
    const [period, setPeriod] = useState(false)
    const [categories, setCategories] = useState<any>({ defaults: [] })
    const _ = useFetchCategories(setCategories, currentCoupon.categoryIds);
    const isCoupon = currentCoupon.type === 2;

    const handleClose = () => {
        onClose && onClose(false)
    }

    const { mutate } = useMutation(({ id, data }: any) => putCoupon(id, data));

    const getPercentage = (total: number, value: number) => {
        if (value === 0) return 0;
        const res = (value * 100) / total;
        return res % 1 === 0 ? res : res.toFixed(1);
    };

    const handleDelete = async () => {
        await deleteCoupon(currentCoupon.id);
        refetch && refetch()
        setDeleteModal(false)
        handleClose()
    }

    const handleRestore = () => {
        const path = isCoupon ? "create_republishcoupon" : "create_republishcertificate";
        history.push(`/proposals/${path}`)
    }

    const handleUpdate = () => {
        const path = isCoupon ? "update_coupon" : "update_certificate";
        history.push(`/proposals/${path}`)
    }
    return (
        <Wrapper>
            <Modal open={deleteModal}>
                <DeleteModal>
                    <h5>Вы действительно хотите удалить {isCoupon ? t("coupon") : t("certificate")}?</h5>
                    <b>{currentCoupon.title}</b>
                    <p>При удалении купона, все купленные купоны останутся у клиентов</p>
                    <Button
                        buttonStyle={{ color: "#223367", bgcolor: "rgba(96, 110, 234, 0.1)" }}
                        margin={{ laptop: "0 22px 0 0" }}
                        onClick={() => setDeleteModal(false)}
                        startIcon={<MobileCancelIcon />}>
                        Отмена
                    </Button>
                    <Button
                        buttonStyle={{ bgcolor: "#FF5E68 " }}
                        onClick={handleDelete}
                        startIcon={<DeleteIcon style={{ height: 15, width: 13.5 }} />}>
                        Удалить
                    </Button>
                </DeleteModal>
            </Modal>
            <FullModal open={period}>
                <SetDate
                    handlePost={mutate}
                    coupon={currentCoupon}
                    handleClose={() => setPeriod(false)}
                    shouldPublish />
            </FullModal>
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
                    {currentCoupon.stat &&
                        <>
                            <h3>{t("statistics")}</h3>
                            <Stats>
                                <p className="first">
                                    Купили: {currentCoupon.count - currentCoupon.stat.total} (
                                    {getPercentage(currentCoupon.count, currentCoupon.count - currentCoupon.stat.total)}%)
                                </p>
                                <p className="second">
                                    Использовали: {currentCoupon.stat.used} (
                                    {getPercentage(currentCoupon.count - currentCoupon.stat.total, currentCoupon.stat.used)}%)
                                </p>
                                <p className="third">
                                    Просрочено: {currentCoupon.stat.expired} ({getPercentage(currentCoupon.count, currentCoupon.stat.expired)}%)
                                </p>
                                <p className="fourth">
                                    Не продано: {currentCoupon.stat.total} ({getPercentage(currentCoupon.count, currentCoupon.stat.total)}%)
                                </p>
                            </Stats>
                        </>}
                </Main>
            </div>
            <Footer>
                {edit ? <>
                    <Button
                        onClick={handleUpdate}
                        buttonStyle={{ color: "#606EEA", bgcolor: "rgba(96, 110, 234, 0.1)" }}
                        margin={{ mobile: "0 0 15px 0" }}
                        endIcon={<PenIcon />}>
                        {t("edit")}
                    </Button>
                    <div>
                        <Button
                            onClick={() => setDeleteModal(true)}
                            margin={{ mobile: "0 8px 0 0" }}
                            endIcon={width > 325 && <DeleteIcon style={{ height: 15, width: 13.5 }} />}
                            buttonStyle={{ color: "#ffffff", bgcolor: "#FF5E68" }}
                        >
                            {t("delete")}
                        </Button>
                        <Button
                            onClick={() => setPeriod(true)}
                            endIcon={<PublishIcon style={{ width: 18, height: 13.5 }} />}>
                            {t("publish")}
                        </Button>
                    </div>
                </> : rePublish ?
                    <>
                        <Button
                            onClick={handleRestore}
                            endIcon={<ReUseIcon />}>
                            {t("restore")}
                        </Button>
                    </> :
                    <Button
                        onClick={() => setDeleteModal(true)}
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
