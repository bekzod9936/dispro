import { CancelIcon, CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { DeleteIcon, PenIcon } from 'assets/icons/proposals/ProposalsIcons'
import Button from 'components/Custom/Button'
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad'
import Modal from 'components/Custom/Modal'
import React from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router'
import { deleteCoupon, putCoupon } from 'services/queries/ProposalsQueries'
import { IDeferred } from 'services/redux/Slices/proposals/types'
import { SetDate } from '../../screens/Coupons/components/SetDate'
import { categories } from '../../screens/Coupons/constants'
import { Wrapper, Header, DeleteModal, Content } from './style'

interface IProps {
    onClose: (arg: boolean) => void,
    currentCoupon: IDeferred,
    disableUpdate?: boolean,
    resetCoupon: any,
    refetch: () => void
}

export const CouponBar = ({
    onClose, 
    currentCoupon, 
    disableUpdate,
    resetCoupon,
    refetch}: IProps) => {
    
    const isCoupon = currentCoupon.type === 1
    const history = useHistory()
    const [isDeleteOpen, setDeleteOpen] = React.useState<boolean>(false)
    const [isPublishOpen, setPublisOpen] = React.useState<boolean>(false)
    const handleClose = () => {
        onClose(false)
        resetCoupon()
    }
    const { mutate } = useMutation(({id, data}: any) => putCoupon(id, data))
    
    const handleUpdate = () => {
        if (isCoupon) {
            history.push("/proposals/update_coupon")
        } else {
            history.push("/proposals/update_certificate")
        }
    }

    const onDelete = async() => {
        await deleteCoupon(currentCoupon.id)
        refetch()
        resetCoupon()
        setDeleteOpen(false)
        onClose(false)
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
                    onClick={() => setPublisOpen(true)}
                    margin={{ laptop: "25px 0" }}>
                    Опубликовать
                </Button></>}
                <Button 
                    onClick={() => setDeleteOpen(true)}
                    buttonStyle={{color: "#ffffff", bgcolor: "#FF5E68"}} 
                    startIcon={<DeleteIcon />}>
                    Удалить купон
                </Button>
            </div>
            <Modal open={isDeleteOpen}>
                <DeleteModal>
                    <h5>
                        Вы действительно хотите удалить Купон?
                    </h5>
                    <p>Бесконечность не предел</p>
                    <Button
                        buttonStyle={{color: "#223367", bgcolor: "#ffffff"}}
                        margin={{laptop: "0 22px 0 0"}}
                        onClick={() => setDeleteOpen(false)} 
                        startIcon={<CancelIcon />}>
                        Отмена
                    </Button>
                    <Button 
                        buttonStyle={{bgcolor: "#FF5E68 "}}
                        onClick={onDelete} 
                        startIcon={<DeleteIcon />}>
                        Удалить
                    </Button>
                </DeleteModal>
            </Modal>
            <Modal open={isPublishOpen}>
                <SetDate
                    handleClose={() => setPublisOpen(false)}
                    coupon={currentCoupon}
                    mutation={mutate}
                />
            </Modal>
        </Wrapper>
    )
}

