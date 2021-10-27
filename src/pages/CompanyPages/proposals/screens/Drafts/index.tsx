import React from 'react'
import { SearchIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { AddIcon } from 'assets/icons/InfoPageIcons/InfoPageIcons'
import Button from 'components/Custom/Button'
import Input from 'components/Custom/Input'
import NotifySnack from 'components/Custom/Snackbar'
import Spinner from 'components/Helpers/Spinner'
import { SideBar } from 'pages/CompanyPages/clients/components/SideBar'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { resetCurrentCoupon, setCurrentCoupon, setSaving } from 'services/redux/Slices/proposals/proposals'
import { IDeferred } from 'services/redux/Slices/proposals/types'
import { RootState } from 'services/redux/store'
import { useDebounce } from 'use-debounce/lib'
import { CouponCard } from '../../components/CouponCard'
import { CouponBar } from '../../components/CouponSideBar'
import { EmptyPage } from './components/EmptyPage'
import { MModal } from './components/Modal'
import { Container, Wrapper } from './style'
import { useDrafts } from './useDrafts'

const Drafts = () => {
    const { t } = useTranslation()
    const [isOpen, setOpen] = React.useState<boolean>(false)
    const [query, setQuery] = React.useState<string>("")
    const [debounced] = useDebounce(query, 300)
    const dispatch = useAppDispatch()
    const { refetch, isFetching } = useDrafts({ dispatch, query: debounced })
    const [isSideBarOpen, setSideBarOpen] = React.useState<boolean>(false)
    const { currentCoupon, drafts, isSaving } = useAppSelector((state: RootState) => state.proposals)
    const handleOpen = () => {
        setOpen(true)
    }

    const handleSideBarOpen = (id: number) => {
        dispatch(setCurrentCoupon({ id, location: "drafts" }))
        setSideBarOpen(true)
    }

    React.useEffect(() => {
        dispatch(resetCurrentCoupon())
    }, [])

    const handleReset = () => {
        dispatch(resetCurrentCoupon())
    }
    return (
        <Wrapper>
            <NotifySnack message="Сохранено" open={isSaving} handleClose={() => dispatch(setSaving(false))} vertical="top" horizontal="right" />
            <SideBar maxWidth="370px" isOpen={isSideBarOpen}>
                <CouponBar
                    refetch={refetch}
                    resetCoupon={handleReset}
                    currentCoupon={currentCoupon}
                    onClose={setSideBarOpen} />
            </SideBar>
            <div style={{ display: "flex", margin: "0 0 20px 0" }}>
                <Button
                    onClick={handleOpen}
                    buttonStyle={{ bgcolor: "#FFFFFF", color: "#223367", weight: 500, height: { desktop: 60 } }}
                    margin={{ desktop: "0 25px 0 0", laptop: "0 25px 0 0", planshet: "0 0 20px 0" }}
                    startIcon={<AddIcon />}>
                    {t("create")}
                </Button>
                <Input
                    placeholder="Поиск..."
                    onChange={(e) => setQuery(e.target.value)}
                    inputStyle={{ border: "none", height: { laptop: 45, planshet: 40 } }}
                    width={{ maxwidth: 500, width: "100%" }}
                    IconStart={<SearchIcon style={{ marginLeft: 30 }} />}
                />
            </div>
            <Container>
                {isFetching ? <Spinner /> : drafts.map((el: IDeferred) => (
                    <CouponCard
                        isSelected={currentCoupon.id === el.id}
                        onClick={() => handleSideBarOpen(el.id)}
                        key={el.id}
                        img={el.image}
                        title={el.title}
                        ageFrom={el.ageFrom}
                        type={el.type}
                        categoryIds={el.categoryIds}
                        description={el.description}
                        price={el.price}
                        value={el.value}
                        count={el.count}
                    />
                ))}
                {!drafts.length && <EmptyPage />}
            </Container>
            <MModal setOpen={setOpen} open={isOpen} />
        </Wrapper>
    )
}


export default Drafts





