import { SideBar } from 'pages/CompanyPages/clients/components/SideBar'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { RootState } from 'services/redux/store'
import { useDebounce } from 'use-debounce/lib'
import { CouponBar } from '../../components/CouponSideBar'
import { Wrapper } from './style'
import { useOnSale } from './useOnSale'
import Input from "components/Custom/Input"
import { SearchIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Spinner from 'components/Helpers/Spinner'
import { IDeferred } from 'services/redux/Slices/proposals/types'
import { CouponCard } from '../../components/CouponCard'
import { resetCurrentCoupon, setCurrentCoupon } from 'services/redux/Slices/proposals/proposals'
import { EmptyPage } from '../Drafts/components/EmptyPage'
import { Container, SearchBar } from '../Drafts/style'
import useWindowWidth from 'services/hooks/useWindowWidth'
import { CouponList } from '../../components/CouponList'


const OnSale = () => {
    const { onSale, currentCoupon } = useAppSelector((state: RootState) => state.proposals)
    const [query, setQuery] = React.useState<string>("")
    const [open, setOpen] = React.useState<boolean>(false)
    const [debounced] = useDebounce(query, 300)
    const dispatch = useAppDispatch()
    const { width } = useWindowWidth()
    const { isFetching, refetch } = useOnSale({ dispatch, query: debounced })

    const handleOpen = (id: number) => {
        dispatch(setCurrentCoupon({ id, location: "onSale" }))
        setOpen(true)
    }

    const handleResetCoupon = () => {
        dispatch(resetCurrentCoupon())
    }

    React.useEffect(() => {
        dispatch(resetCurrentCoupon())
    }, [])
    const coupons = () => {
        if (width > 600) {
            return (
                onSale.map((el: IDeferred) => (
                    <CouponCard
                        startDate={el.startDate}
                        endDate={el.endDate}
                        isSelected={currentCoupon.id === el.id}
                        onClick={() => handleOpen(el.id)}
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
                ))
            )
        } else {
            return (
                <CouponList
                    onClick={setOpen}
                    location="onSale"
                    coupons={onSale} />
            )
        }
    }
    return (
        <Wrapper>
            <SideBar maxWidth="370px" isOpen={open}>
                <CouponBar
                    refetch={refetch}
                    resetCoupon={handleResetCoupon}
                    disableUpdate={true}
                    currentCoupon={currentCoupon}
                    onClose={setOpen} />
            </SideBar>
            <SearchBar>
                <Input
                    error={onSale.length === 0 && !isFetching && !!query}
                    message={"По запросу ничего не найдено"}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    IconStart={<SearchIcon style={{ marginLeft: "35px" }} />}
                    placeholder="Поиск..."
                    margin={{ laptop: "0 0 20px 0" }}
                    inputStyle={{ border: "none" }}
                    width={{ maxwidth: 500, width: "100%" }} />
            </SearchBar>
            <Container>
                {isFetching ? <Spinner /> : (onSale.length !== 0 && coupons())}
                {!onSale.length && <EmptyPage />}
            </Container>
        </Wrapper>
    )
}


export default OnSale